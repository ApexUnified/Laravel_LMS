<?php

namespace App\Repositories\Checkouts\Repository;

use App\Models\Course;
use App\Models\Currency;
use App\Models\StripeCredential;
use App\Models\Transaction;
use App\Models\User;
use App\Notifications\NotifyAdminAboutPurchaseNotification;
use App\Notifications\NotifyUserAboutHisCoursePurchaseNotification;
use App\Repositories\Checkouts\Interface\CheckoutRepositoryInterface;
use App\Repositories\Enrollments\Interface\EnrollmentRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;

class CheckoutRepository implements CheckoutRepositoryInterface
{
    public function __construct(
        private StripeCredential $stripe_credentials,
        private Course $course,
        private Currency $currency,
        private User $user,
        private EnrollmentRepositoryInterface $enrollment
    ) {}

    public function initCheckout($request)
    {
        $course_id = $request->integer('course_id');

        if (empty($course_id)) {
            return ['status' => false, 'message' => 'Something went wrong! Course is ID Missing'];
        }

        try {

            $course = $this->course->find($course_id);

            if (empty($course)) {
                return ['status' => false, 'message' => 'Something went wrong! Course not found'];
            }

            $currency = $this->currency->where('is_active', true)->first();

            if (empty($currency)) {
                return ['status' => false, 'message' => 'Something went wrong! Currency not found'];
            }

            $secret_key = optional($this->stripe_credentials->first())->stripe_secret_key;

            if (empty($secret_key)) {
                return ['status' => false, 'message' => 'Something went wrong! Stripe Secret Key is Missing'];
            }

            Stripe::setApiKey($secret_key);

            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => strtolower($currency->currency_code),
                        'unit_amount' => $course->price * 100,
                        'product_data' => [
                            'name' => $course->title,
                            'description' => $course->short_description,
                        ],
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => route('purchase.success').'?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('purchase.cancel'),
                'metadata' => [
                    'course_id' => $course->id,
                    'user_id' => $request->input('user_id'),
                ],

            ]);

            return $session;
        } catch (Exception $e) {
            return ['status' => false, 'message' => $e->getMessage()];
        }

    }

    public function paymentSuccess(Request $request)
    {

        $secret_key = optional($this->stripe_credentials->first())->stripe_secret_key;

        if (empty($secret_key)) {
            return ['status' => false, 'message' => 'Something went wrong! Stripe Secret Key is Missing'];
        }

        Stripe::setApiKey($secret_key);

        $session_id = $request->get('session_id');

        $response = Session::retrieve($session_id);

        if ($response['payment_status'] === 'paid') {
            $data = [
                'user_id' => $response['metadata']['user_id'],
                'course_id' => $response['metadata']['course_id'],
            ];

            $course = $this->course->find($data['course_id']);

            if (empty($course)) {
                return ['status' => false, 'message' => 'Something went wrong! The Course You Selected Was not found Please Contact Us If You are facing Any issue'];
            }

            $converted_request = new Request($data);

            $enroll = $this->enrollment->storeEnrollment($converted_request);

            $amount = number_format($response['amount_total'] / 100, 2);
            $currency = $response['currency'];
            $mode = $response['mode'];
            $gateway = 'Stripe';
            $status = $response['status'];
            $payment_status = $response['payment_status'];
            $payment_method = $response['payment_method_types'][0] ?? 'Unknown';
            $customer_details = collect($response['customer_details'])->toArray();
            $user_name = $customer_details['name'];
            $user_email = $customer_details['email'];
            $transaction_id = $response['payment_intent'];
            $course_id = $response['metadata']['course_id'];
            $user_id = $response['metadata']['user_id'];

            Transaction::create([
                'user_id' => $user_id,
                'course_id' => $course_id,
                'course_title' => $course->title,
                'transaction_id' => $transaction_id,
                'amount' => $amount,
                'currency' => $currency,
                'mode' => $mode,
                'gateway' => $gateway,
                'status' => $status,
                'payment_status' => $payment_status,
                'payment_method' => $payment_method,
                'user_name' => $user_name,
                'user_email' => $user_email,
            ]);

            $user = $this->user->find($user_id);
            if (! empty($user)) {
                $about_transaction = (object) [
                    'course' => $course,
                    'transaction_id' => $transaction_id,
                    'amount' => $amount,
                    'currency' => $currency,
                    'gateway' => $gateway,
                    'payment_status' => $payment_status,
                ];

                $user->notify(new NotifyUserAboutHisCoursePurchaseNotification($about_transaction));
            }

            $admins = $this->user->whereHas('roles', fn ($query) => $query->where('name', 'Admin'))->get();
            if ($admins->isNotEmpty()) {
                foreach ($admins as $admin) {
                    $admin->notify(new NotifyAdminAboutPurchaseNotification($about_transaction, $user));
                }
            }

            if ($enroll['status']) {
                return ['status' => true, 'enrollment' => true, 'message' => "Congragulations You Have Successfully Enrolled In {$course->title}"];
            } else {
                return ['status' => false, 'message' => $enroll['message']];
            }

        } else {
            return ['status' => false, 'message' => 'Payment was not successful!'];
        }
    }
}

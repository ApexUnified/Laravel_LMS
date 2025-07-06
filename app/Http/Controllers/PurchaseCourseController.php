<?php

namespace App\Http\Controllers;

use App\Repositories\Checkouts\Interface\CheckoutRepositoryInterface;
use App\Repositories\Courses\Interface\CoursesRepositoryInterface;
use App\Repositories\Enrollments\Interface\EnrollmentRepositoryInterface;
use Illuminate\Http\Request;

class PurchaseCourseController extends Controller
{
    public function __construct(
        private EnrollmentRepositoryInterface $enrollment,
        private CoursesRepositoryInterface $course,
        private CheckoutRepositoryInterface $checkout
    ) {}

    public function __invoke(Request $request)
    {

        if (empty($request->integer('course_id'))) {
            return response()->json(['status' => false, 'message' => 'Something went wrong! Course is ID Missing']);
        }

        $course = $this->course->getCourseById($request->integer('course_id'));

        if (isset($course['status']) && $course['status'] == false) {
            return response()->json(['status' => false, 'message' => $course['message']]);
        }

        if ((float) $course->price == 0) {
            $enroll = $this->enrollment->storeEnrollment($request);

            if ($enroll['status']) {
                return response()->json(['status' => true, 'enrollment' => true, 'message' => "Congragulations You Have Successfully Enrolled In {$course->title}"], 200);
            } else {
                return response()->json(['status' => false, 'message' => $enroll['message']]);
            }
        } else {
            $response = $this->checkout->initCheckout($request);

            if (isset($response['status']) && $response['status'] == false) {
                return response()->json(['status' => false, 'message' => $response['message']]);
            }

            return response()->json(['status' => true, 'url' => $response['url']], 200);
        }

    }

    public function success(Request $request)
    {
        $response = $this->checkout->paymentSuccess($request);

        if ($response['status']) {
            return to_route('my.courses')->with('success', $response['message']);
        } else {
            return to_route('all.courses')->with('error', $response['message']);
        }
    }

    public function cancel(Request $request)
    {
        return to_route('all.courses')->with('error', 'Payment Cancelled');
    }
}

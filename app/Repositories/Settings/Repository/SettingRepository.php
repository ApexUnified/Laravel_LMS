<?php

namespace App\Repositories\Settings\Repository;

use App\Models\CloudinaryCredential;
use App\Models\Currency;
use App\Models\GeneralSetting;
use App\Models\SmtpSetting;
use App\Models\StripeCredential;
use App\Repositories\Settings\Interface\SettingRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Spatie\Permission\Models\Role;

class SettingRepository implements SettingRepositoryInterface
{
    public function __construct(
        private GeneralSetting $generalSetting,
        private SmtpSetting $smtpSetting,
        private Role $role,
        private Currency $currency,
        private StripeCredential $stripe_credential,
        private CloudinaryCredential $cloudinary_credential
    ) {}

    public function generalSetting()
    {
        return $this->generalSetting->first();
    }

    public function updateGeneralSetting(Request $request)
    {

        $validated_req = $request->validate([
            'app_name' => 'required|min:4|string|max:100',
            'contact_email' => 'required|email',
            'contact_number' => 'required|numeric',
            ...($request->hasFile('app_main_logo_dark') ? ['app_main_logo_dark' => 'nullable|mimes:png|max:2048'] : []),
            ...($request->hasFile('app_main_logo_light') ? ['app_main_logo_light' => 'nullable|mimes:png|max:2048'] : []),
            ...($request->hasFile('app_favicon') ? ['app_favicon' => 'nullable|mimes:jpg,jpeg,png|max:2048'] : []),
        ]);

        $generalSetting = $this->generalSetting->first();

        $directory = public_path('assets/images/Logo/');

        if (! file_exists($directory)) {
            File::makeDirectory($directory, 0755, true, true);
        }

        if ($request->boolean('is_removed_app_main_logo_dark') && ! $request->hasFile('app_main_logo_dark')) {
            if (! empty($generalSetting->app_main_logo_dark)) {
                if (file_exists($directory.$generalSetting->app_main_logo_dark)) {
                    File::delete($directory.$generalSetting->app_main_logo_dark);
                    $validated_req['app_main_logo_dark'] = null;
                }
            }
        }

        if ($request->boolean('is_removed_app_main_logo_light') && ! $request->hasFile('app_main_logo_light')) {

            if (! empty($generalSetting->app_main_logo_light)) {
                if (file_exists($directory.$generalSetting->app_main_logo_light)) {
                    File::delete($directory.$generalSetting->app_main_logo_light);
                    $validated_req['app_main_logo_light'] = null;
                }
            }
        }

        if ($request->boolean('is_removed_app_favicon') && ! $request->hasFile('app_favicon')) {
            if (! empty($generalSetting->app_favicon)) {
                if (file_exists($directory.$generalSetting->app_favicon)) {
                    File::delete($directory.$generalSetting->app_favicon);
                    $validated_req['app_favicon'] = null;
                }
            }
        }

        if ($request->hasFile('app_favicon')) {

            if (! empty($generalSetting->app_favicon)) {
                if (file_exists($directory.$generalSetting->app_favicon)) {
                    File::delete($directory.$generalSetting->app_favicon);
                }
            }

            $favicon = $request->file('app_favicon');
            $new_favicon_name = time().uniqid().'.'.$favicon->getClientOriginalExtension();
            $validated_req['app_favicon'] = $new_favicon_name;
            $favicon->move($directory, $new_favicon_name);

        }
        if ($request->hasFile('app_main_logo_dark')) {

            if (! empty($generalSetting->app_main_logo_dark)) {
                if (file_exists($directory.$generalSetting->app_main_logo_dark)) {
                    File::delete($directory.$generalSetting->app_main_logo_dark);
                }
            }

            $app_main_logo_dark = $request->file('app_main_logo_dark');
            $new_app_main_logo_dark_name = time().uniqid().'.'.$app_main_logo_dark->getClientOriginalExtension();
            $validated_req['app_main_logo_dark'] = $new_app_main_logo_dark_name;
            $app_main_logo_dark->move($directory, $new_app_main_logo_dark_name);

        }

        if ($request->hasFile('app_main_logo_light')) {

            if (! empty($generalSetting->app_main_logo_light)) {
                if (file_exists($directory.$generalSetting->app_main_logo_light)) {
                    File::delete($directory.$generalSetting->app_main_logo_light);
                }
            }

            $app_main_logo_light = $request->file('app_main_logo_light');
            $new_app_main_logo_light_name = time().uniqid().'.'.$app_main_logo_light->getClientOriginalExtension();
            $validated_req['app_main_logo_light'] = $new_app_main_logo_light_name;
            $app_main_logo_light->move($directory, $new_app_main_logo_light_name);

        }
        if (! empty($generalSetting)) {
            $generalSetting->update($validated_req);

            return ['status' => true, 'message' => 'General Setting Has Been Saved Successfully'];
        } else {
            GeneralSetting::create($validated_req);

            return ['status' => true, 'message' => 'General Setting Has Been Saved Successfully'];
        }

        return ['status' => false, 'message' => 'Something went wrong While Saving General Setting'];
    }

    public function smtpSetting()
    {
        return $this->smtpSetting->first();
    }

    public function updateSmtpSetting(Request $request)
    {
        $validated_req = $request->validate([
            'smtp_mailer' => 'required|min:4',
            'smtp_scheme' => 'required|min:4',
            'smtp_host' => 'required',
            'smtp_port' => 'required|numeric',
            'smtp_username' => 'required|email',
            'smtp_password' => 'required',
            'smtp_mail_from_address' => 'required|email',
        ]);

        $smtpSetting = $this->smtpSetting->first();

        if (empty($smtpSetting)) {
            $this->smtpSetting->create($validated_req);

            return ['status' => true, 'message' => 'SMTP Setting Has Been Saved Successfully'];
        } else {
            $smtpSetting->update($validated_req);

            return ['status' => true, 'message' => 'SMTP Setting Has Been Saved Successfully'];
        }

        return ['status' => false, 'message' => 'Something went wrong While Saving SMTP Setting'];

    }

    public function getRoles(Request $request)
    {
        $roles = $this->role->query()->latest();

        $search = ! empty($request->search) ? $request->search : null;
        if ($request->filled('search')) {
            $roles = $roles->where('name', 'LIKE', '%'.$search.'%');
        }

        $roles = $roles->paginate(10);
        $roles->getCollection()->transform(function ($role) {
            $role->added_at = $role->created_at->format('Y-m-d');

            return $role;
        });

        return ['roles' => $roles, 'search' => $search];
    }

    public function roleStore(Request $request)
    {
        $validated_req = $request->validate([
            'name' => 'required|min:4|unique:roles,name',
        ], [
            'name.required' => 'Role Name is Required',
            'name.min' => 'Role Name Must be Valid And at least 4 characters',
            'name.unique' => 'Role Name Already Exists Please Try Another One',
        ]);

        return $this->role->create($validated_req) ? ['status' => true, 'message' => 'Role Created Successfully'] : ['status' => false, 'message' => 'Something went wrong While Creating Role'];
    }

    public function getRole(string $id)
    {
        $role = $this->role->find($id);

        if (empty($role)) {
            return ['status' => false, 'message' => 'Role Not Found'];
        }

        return $role;
    }

    public function roleUpdate(Request $request, string $id)
    {
        $validated_req = $request->validate([
            'name' => 'required|min:4|unique:roles,name,'.$id,
        ], [
            'name.required' => 'Role Name is Required',
            'name.min' => 'Role Name Must be Valid And at least 4 characters',
            'name.unique' => 'Role Name Already Exists Please Try Another One',
        ]);

        $role = $this->getRole($id);

        return $role->update($validated_req) ?
        ['status' => true, 'message' => 'Role Updated Successfully']
        :
        ['status' => false, 'message' => 'Something went wrong While Updating Role'];
    }

    public function roleDestroy(string $id)
    {
        $role = $this->getRole($id);

        return $role->delete() ?
        ['status' => true, 'message' => 'Role Deleted Successfully']
        :
        ['status' => false, 'message' => 'Something went wrong While Deleting Role'];
    }

    public function roleDestroyBySelection(Request $request)
    {
        $ids = $request->array('ids');

        if (blank($ids)) {
            return ['status' => false, 'message' => 'Please Select Atleast One Role'];
        }

        return $this->role->whereIn('id', $ids)->delete() > 0 ?
        ['status' => true, 'message' => 'Role Deleted Successfully']
        :
        ['status' => false, 'message' => 'Something went wrong While Deleting Role'];

    }

    public function getCurrencies(Request $request)
    {
        $currencies = $this->currency->query()->latest();

        $search = ! empty($request->search) ? $request->search : null;
        if ($request->filled('search')) {
            $currencies = $currencies->where('currency_name', 'LIKE', '%'.$search.'%')
                ->orWhere('currency_code', 'LIKE', '%'.$search.'%')
                ->orWhere('currency_symbol', 'LIKE', '%'.$search.'%');
        }

        $currencies = $currencies->paginate(10);

        $currencies->getCollection()->transform(function ($currency) {
            $currency->added_at = $currency->created_at->format('Y-m-d');

            return $currency;
        });

        return $currencies;
    }

    public function currencyStore(Request $request)
    {
        $validated_req = $request->validate([
            'currency_name' => 'required|min:4|string|max:100|unique:currencies,currency_name',
            'currency_code' => 'required|string|unique:currencies,currency_code',
            'currency_symbol' => 'required|string|unique:currencies,currency_symbol',
        ],
            [
                'currency_name.required' => 'Currency Name is Required',
                'currency_name.min' => 'Currency Name Must be Valid And at least 4 characters',
                'currency_name.string' => 'Currency Name Must be Valid And at least 4 characters',
                'currency_name.max' => 'Currency Name Must be Valid And at least 4 characters',
                'currency_name.unique' => 'Currency Name Already Exists Please Try Another One',
                'currency_code.required' => 'Currency Code is Required',
                'currency_code.string' => 'Currency Code Must be Valid And at least 4 characters',
                'currency_code.unique' => 'Currency Code Already Exists Please Try Another One',
                'currency_symbol.required' => 'Currency Symbol is Required',
                'currency_symbol.string' => 'Currency Symbol Must be Valid And at least 4 characters',
                'currency_symbol.unique' => 'Currency Symbol Already Exists Please Try Another One',
            ]
        );

        if (! $this->currency->exists()) {
            $validated_req['is_active'] = true;
        }

        return $this->currency->create($validated_req) ?
        ['status' => true, 'message' => 'Currency Created Successfully']
        :
        ['status' => false, 'message' => 'Something went wrong While Creating Currency'];
    }

    public function getCurrency(string $id)
    {
        return $this->currency->find($id);

    }

    public function currencyUpdate(Request $request, string $id)
    {
        $validated_req = $request->validate([
            'currency_name' => 'required|min:4|string|max:100|unique:currencies,currency_name,'.$id,
            'currency_code' => 'required|string|unique:currencies,currency_code,'.$id,
            'currency_symbol' => 'required|string|unique:currencies,currency_symbol,'.$id,
        ],
            [
                'currency_name.required' => 'Currency Name is Required',
                'currency_name.min' => 'Currency Name Must be Valid And at least 4 characters',
                'currency_name.string' => 'Currency Name Must be Valid And at least 4 characters',
                'currency_name.max' => 'Currency Name Must be Valid And at least 4 characters',
                'currency_name.unique' => 'Currency Name Already Exists Please Try Another One',
                'currency_code.required' => 'Currency Code is Required',
                'currency_code.string' => 'Currency Code Must be Valid And at least 4 characters',
                'currency_code.unique' => 'Currency Code Already Exists Please Try Another One',
                'currency_symbol.required' => 'Currency Symbol is Required',
                'currency_symbol.string' => 'Currency Symbol Must be Valid And at least 4 characters',
                'currency_symbol.unique' => 'Currency Symbol Already Exists Please Try Another One',
            ]
        );

        $currency = $this->getCurrency($id);

        if (empty($currency)) {
            return ['status' => false, 'message' => 'Currency Not Found'];
        }

        if ($currency->update($validated_req)) {
            return ['status' => true, 'message' => 'Currency Updated Successfully'];
        } else {
            return ['status' => false, 'message' => 'Something went wrong While Updating Currency'];
        }
    }

    public function currencyDestroy(string $id)
    {
        $currency = $this->getCurrency($id);

        return $currency->delete() ?
        ['status' => true, 'message' => 'Currency Deleted Successfully']
        :
        ['status' => false, 'message' => 'Something went wrong While Deleting Currency'];
    }

    public function currencyDestroyBySelection(Request $request)
    {
        $ids = $request->array('ids');

        return $this->currency->whereIn('id', $ids)->delete() > 0 ?
        ['status' => true, 'message' => 'Currency Deleted Successfully']
        :
        ['status' => false, 'message' => 'Something went wrong While Deleting Currency'];
    }

    public function ToggleCurrencyStatus(Request $request, string $id)
    {
        $currency = $this->getCurrency($id);

        if (empty($currency)) {
            return ['status' => false, 'message' => 'Currency Not Found'];
        }

        $alreadyActiveCurrency = $this->currency->where('is_active', 1)->first();

        if (! empty($alreadyActiveCurrency) && $currency->id === $alreadyActiveCurrency->id) {
            return ['status' => false, 'message' => 'Atleast One Currency Should Be Active'];

        } elseif (! empty($alreadyActiveCurrency) && $currency->id !== $alreadyActiveCurrency->id) {
            $alreadyActiveCurrency->update(['is_active' => 0]);
        }
        $currency->update(['is_active' => 1]);

        return ['status' => true, 'message' => 'Currency Status Updated Successfully'];
    }

    public function stripeCredentialsSave(Request $request)
    {
        $validated_req = $request->validate([

            'stripe_publishable_key' => 'required|starts_with:pk_,',
            'stripe_secret_key' => 'required|starts_with:sk_',
        ], [
            'stripe_publishable_key.required' => 'Stripe Publishable Key is Required',
            'stripe_publishable_key.starts_with' => 'Invalid Stripe Publishable Key',
            'stripe_secret_key.required' => 'Stripe Secret Key is Required',
            'stripe_secret_key.starts_with' => 'Invalid Stripe Secret Key',
        ]);

        if ($this->stripe_credential->exists()) {
            $this->stripe_credential->first()->update($validated_req);
        } else {
            $this->stripe_credential->create($validated_req);
        }

        return ['status' => true, 'message' => 'Stripe Credentials Saved Successfully'];

    }

    public function cloudinaryCredentialsSave(Request $request)
    {
        $validated_req = $request->validate([
            'cloudinary_url' => 'required|starts_with:cloudinary://',
        ], [
            'cloudinary_url.required' => 'Cloudinary URL is Required',
            'cloudinary_url.starts_with' => 'Invalid Cloudinary URL',
        ]);

        if ($this->cloudinary_credential->exists()) {
            $this->cloudinary_credential->first()->update($validated_req);
        } else {
            $this->cloudinary_credential->create($validated_req);
        }

        return ['status' => true, 'message' => 'Cloudinary Credentials Saved Successfully'];
    }

    public function getStripeCredentials()
    {
        return $this->stripe_credential->first();
    }

    public function getCloudinaryCredentials()
    {
        return $this->cloudinary_credential->first();
    }
}

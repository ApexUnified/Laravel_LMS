<?php

namespace App\Http\Controllers;

use App\Repositories\Settings\Interface\SettingRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function __construct(
        private SettingRepositoryInterface $setting
    ) {}

    public function index()
    {

        $cloudinary_credentials = $this->setting->getCloudinaryCredentials();
        $stripe_credentials = $this->setting->getStripeCredentials();

        return Inertia::render('Settings/index', compact('cloudinary_credentials', 'stripe_credentials'));
    }

    // General Setting methods
    public function generalSetting()
    {
        $generalSetting = $this->setting->generalSetting();

        return Inertia::render('Settings/GeneralSetting/index', compact('generalSetting'));
    }

    public function updateGeneralSetting(Request $request)
    {
        $updated = $this->setting->updateGeneralSetting($request);
        if ($updated['status']) {
            return back()->with('success', $updated['message']);
        } else {
            return back()->with('error', $updated['message']);
        }
    }

    // SMTP Methods
    public function smtpSetting()
    {
        $smtpSetting = $this->setting->smtpSetting();

        return Inertia::render('Settings/SMTPSetting/index', compact('smtpSetting'));
    }

    public function updateSmtpSetting(Request $request)
    {
        $updated = $this->setting->updateSmtpSetting($request);

        if ($updated['status']) {
            return back()->with('success', $updated['message']);
        } else {
            return back()->with('error', $updated['message']);
        }

    }

    // Role Methods
    public function rolesIndex(Request $request)
    {
        $data = $this->setting->getRoles($request);
        $roles = $data['roles'];
        $search = $data['search'];

        return Inertia::render('Settings/Roles/index', compact('roles', 'search'));
    }

    public function roleCreate()
    {
        return Inertia::render('Settings/Roles/create');
    }

    public function roleStore(Request $request)
    {
        $created = $this->setting->roleStore($request);
        if ($created['status']) {
            return to_route('settings.roles.index')->with('success', $created['message']);
        } else {
            return back()->with('error', $created['message']);
        }

    }

    public function roleEdit(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Role Not Found');
        }

        $role = $this->setting->getRole($id);

        if (isset($role['status']) && $role['status'] == false) {
            return back()->with('error', $role['message']);
        }

        return Inertia::render('Settings/Roles/edit', compact('role'));
    }

    public function roleUpdate(Request $request, string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Role Not Found');
        }

        $updated = $this->setting->roleUpdate($request, $id);
        if ($updated['status']) {
            return to_route('settings.roles.index')->with('success', $updated['message']);
        } else {
            return back()->with('error', $updated['message']);
        }
    }

    public function roleDestroy(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Role Not Found');
        }

        $deleted = $this->setting->roleDestroy($id);

        if ($deleted['status']) {
            return back()->with('success', $deleted['message']);
        } else {
            return back()->with('error', $deleted['message']);
        }
    }

    public function roleDestroyBySelection(Request $request)
    {
        $deleted = $this->setting->roleDestroyBySelection($request);

        if ($deleted['status']) {
            return back()->with('success', $deleted['message']);
        } else {
            return back()->with('error', $deleted['message']);
        }
    }

    // Currency Methods
    public function currencyIndex(Request $request)
    {
        $currencies = $this->setting->getCurrencies($request);

        return Inertia::render('Settings/Currencies/index', compact('currencies'));
    }

    public function currencyCreate()
    {
        return Inertia::render('Settings/Currencies/create');
    }

    public function currencyStore(Request $request)
    {
        $created = $this->setting->currencyStore($request);
        if ($created['status']) {
            return to_route('settings.currencies.index')->with('success', $created['message']);
        } else {
            return back()->with('error', $created['message']);
        }
    }

    public function currencyEdit(string $id)
    {
        $currency = $this->setting->getCurrency($id);

        if (isset($currency['status']) && $currency['status'] == false) {
            return back()->with('error', $currency['message']);
        }

        return Inertia::render('Settings/Currencies/edit', compact('currency'));
    }

    public function currencyUpdate(Request $request, string $id)
    {
        $updated = $this->setting->currencyUpdate($request, $id);
        if ($updated['status']) {
            return to_route('settings.currencies.index')->with('success', $updated['message']);
        } else {
            return back()->with('error', $updated['message']);
        }
    }

    public function currencyDestroy(string $id)
    {
        $deleted = $this->setting->currencyDestroy($id);
        if ($deleted['status']) {
            return back()->with('success', $deleted['message']);
        } else {
            return back()->with('error', $deleted['message']);
        }
    }

    public function currencyDestroyBySelection(Request $request)
    {
        $deleted = $this->setting->currencyDestroyBySelection($request);
        if ($deleted['status']) {
            return back()->with('success', $deleted['message']);
        } else {
            return back()->with('error', $deleted['message']);
        }
    }

    public function toggleCurrencyStatus(Request $request, string $id)
    {
        $updated = $this->setting->ToggleCurrencyStatus($request, $id);

        if ($updated['status']) {
            return ['status' => true, 'message' => $updated['message']];
        } else {
            return ['status' => false, 'message' => $updated['message']];

        }
    }

    // Cloudinary Method
    public function cloudinaryCredentialsSave(Request $request)
    {
        $saved = $this->setting->cloudinaryCredentialsSave($request);
        if ($saved['status']) {
            return back()->with('success', $saved['message']);
        } else {
            return back()->with('error', $saved['message']);
        }
    }

    // Stripe Method
    public function stripeCredentialsSave(Request $request)
    {
        $saved = $this->setting->stripeCredentialsSave($request);

        if ($saved['status']) {
            return back()->with('success', $saved['message']);
        } else {
            return back()->with('error', $saved['message']);
        }
    }
}

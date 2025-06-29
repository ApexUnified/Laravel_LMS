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
        return Inertia::render('Settings/index');
    }

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
}

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
        if ($updated) {
            return back()->with('success', 'General Setting Updated Successfully');
        } else {
            return back()->with('error', 'Something went wrong While Updating General Setting');
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

        if ($updated) {
            return back()->with('success', 'Smtp Setting Updated Successfully');
        } else {
            return back()->with('error', 'Something went wrong While Updating Smtp Setting');
        }

        return back()->with('success', 'Smtp Setting Updated Successfully');

    }

    public function rolesIndex(Request $request)
    {
        $data = $this->setting->roleIndex($request);
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
        if ($created) {
            return to_route('settings.roles.index')->with('success', 'Role Created Successfully');
        } else {
            return back()->with('error', 'Something went wrong While Creating Role');
        }

    }

    public function roleEdit(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Role Not Found');
        }

        $role = $this->setting->roleEdit($id);

        if (empty($role)) {
            return back()->with('error', 'Role Not Found');
        }

        return Inertia::render('Settings/Roles/edit', compact('role'));
    }

    public function roleUpdate(Request $request, string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Role Not Found');
        }

        $updated = $this->setting->roleUpdate($request, $id);
        if ($updated) {
            return to_route('settings.roles.index')->with('success', 'Role Updated Successfully');
        } else {
            return back()->with('error', 'Something went wrong While Updating Role');
        }
    }

    public function roleDestroy(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Role Not Found');
        }

        $deleted = $this->setting->roleDestroy($id);

        if ($deleted) {
            return back()->with('success', 'Role Deleted Successfully');
        } else {
            return back()->with('error', 'Something went wrong While Deleting Role');
        }
    }

    public function roleDestroyBySelection(Request $request)
    {
        $deleted = $this->setting->roleDestroyBySelection($request);

        if ($deleted) {
            return back()->with('success', 'Role Deleted Successfully');
        } else {
            return back()->with('error', 'Something went wrong While Deleting Role')->withErrors($request->all());
        }
    }
}

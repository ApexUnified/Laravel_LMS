<?php

namespace App\Http\Controllers;

use App\Models\GeneralSetting;
use App\Models\SmtpSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Settings/index');
    }

    public function generalSetting()
    {
        $generalSetting = GeneralSetting::first();

        return Inertia::render('Settings/GeneralSetting/index', compact('generalSetting'));
    }

    public function updateGeneralSetting(Request $request)
    {
        $validated_req = $request->validate([
            'app_name' => 'required|min:4|string|max:100',
            'contact_email' => 'required|email',
            'contact_number' => 'required|numeric',
            'app_main_logo_dark' => 'nullable|mimes:png|max:2048',
            'app_main_logo_light' => 'nullable|mimes:png|max:2048',
            'app_favicon' => 'nullable|mimes:jpg,jpeg,png|max:2048',
        ]);

        $generalSetting = GeneralSetting::first();

        $directory = public_path('assets/images/Logo/');

        if (! file_exists($directory)) {
            File::makeDirectory($directory, 0755, true, true);
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

        } else {
            $validated_req['app_favicon'] = $generalSetting?->app_favicon ?? null;
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

        } else {
            $validated_req['app_main_logo_dark'] = $generalSetting?->app_main_logo_dark ?? null;
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

        } else {
            $validated_req['app_main_logo_light'] = $generalSetting?->app_main_logo_light ?? null;

        }

        if (! empty($generalSetting)) {
            $generalSetting->update($validated_req);
        } else {
            GeneralSetting::create($validated_req);
        }

        return back()->with('success', 'General Setting Updated Successfully');
    }

    public function smtpSetting()
    {
        $smtpSetting = SmtpSetting::first();

        return Inertia::render('Settings/SMTPSetting/index', compact('smtpSetting'));
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

        $smtpSetting = SmtpSetting::first();

        if (empty($smtpSetting)) {
            SmtpSetting::create($validated_req);
        } else {
            $smtpSetting->update($validated_req);
        }

        return back()->with('success', 'Smtp Setting Updated Successfully');

    }

    public function rolesIndex(Request $request)
    {
        $roles = Role::query()->latest();

        $search = ! empty($request->search) ? $request->search : null;
        if ($request->filled('search')) {
            $roles = $roles->where('name', 'LIKE', '%'.$search.'%');
        }

        $roles = $roles->paginate(10);
        $roles->getCollection()->transform(function ($role) {
            $role->added_at = $role->created_at->format('Y-m-d');

            return $role;
        });

        return Inertia::render('Settings/Roles/index', compact('roles', 'search'));
    }

    public function roleCreate()
    {
        return Inertia::render('Settings/Roles/create');
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

        if (Role::create($validated_req)) {
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

        $role = Role::find($id);

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

        $validated_req = $request->validate([
            'name' => 'required|min:4|unique:roles,name',
        ], [
            'name.required' => 'Role Name is Required',
            'name.min' => 'Role Name Must be Valid And at least 4 characters',
            'name.unique' => 'Role Name Already Exists Please Try Another One',
        ]);

        $role = Role::find($id);

        if ($role->update($validated_req)) {
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

        $role = Role::find($id);

        if (empty($role)) {
            return back()->with('error', 'Role Not Found');
        }

        if ($role->delete()) {
            return back()->with('success', 'Role Deleted Successfully');
        } else {
            return back()->with('error', 'Something went wrong While Deleting Role');
        }
    }

    public function roleDestroyBySelection(Request $request)
    {
        $ids = $request->array('ids');

        if (blank($ids)) {
            return back()->with('error', 'No Role Selected')->withErrors($request->all());
        }

        if (Role::destroy($ids)) {
            return back()->with('success', 'Role Deleted Successfully');
        } else {
            return back()->with('error', 'Something went wrong While Deleting Role');
        }
    }
}

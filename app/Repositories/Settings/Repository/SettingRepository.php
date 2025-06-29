<?php

namespace App\Repositories\Settings\Repository;

use App\Models\GeneralSetting;
use App\Models\SmtpSetting;
use App\Repositories\Settings\Interface\SettingRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Spatie\Permission\Models\Role;

class SettingRepository implements SettingRepositoryInterface
{
    public function __construct(
        private GeneralSetting $generalSetting,
        private SmtpSetting $smtpSetting,
        private Role $role
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
            'app_main_logo_dark' => 'nullable|mimes:png|max:2048',
            'app_main_logo_light' => 'nullable|mimes:png|max:2048',
            'app_favicon' => 'nullable|mimes:jpg,jpeg,png|max:2048',
        ]);

        $generalSetting = $this->generalSetting->first();

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
}

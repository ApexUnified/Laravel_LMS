<?php

namespace App\Repositories\Users\Repository;

use App\Models\User;
use App\Repositories\Users\Interface\UserRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Spatie\Permission\Models\Role;

class UserRepository implements UserRepositoryInterface
{
    private string $directory;

    public function __construct(
        private User $user,
        private Role $role
    ) {
        $this->directory = public_path('assets/images/user/');
    }

    public function getUsers(Request $request)
    {
        $users = $this->user->query()->latest()->with('roles');

        if ($request->filled('search')) {
            $users = $users->where('name', 'LIKE', '%'.$request->input('search').'%')
                ->orWhere('email', 'LIKE', '%'.$request->input('search').'%');
        }

        $users = $users->paginate(10);

        $users->getCollection()->transform(function ($user) {
            $user->profile = ! empty($user->profile) ? asset('assets/images/user/'.$user->profile) : null;
            $user->added_at = (string) $user->created_at->format('Y-m-d');
            $user->role_name = $user->roles->pluck('name')->implode('');

            return $user;
        });

        $search = $request->filled('search') ? $request->input('search') : null;

        return ['users' => $users, 'search' => $search];
    }

    public function getRoles()
    {
        return $this->role->all();
    }

    public function storeUser(Request $request)
    {
        $validated_req = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|min:8',
            'profile' => 'nullable|mimes:jpg,jpeg,png|max:2048',
            'role_id' => 'required|exists:roles,id|exclude',
        ], [
            'role_id.exists' => 'Role not found',
            'role_id.required' => 'Role is required',
        ]);

        if ($request->hasFile('profile')) {
            $profile = $request->file('profile');
            $newProfile = time().uniqid().'.'.$profile->getClientOriginalExtension();

            if (! File::exists($this->directory)) {
                File::makeDirectory($this->directory, true, 0777, true);
            }

            $profile->move($this->directory, $newProfile);
            $validated_req['profile'] = $newProfile;
        }

        $user = $this->user->create($validated_req);

        if (! empty($user)) {
            $role = $this->role->find($request->integer('role_id'));
            $user->assignRole($role);
        }

        return $user;
    }

    public function getUser(string $id)
    {

        $user = $this->user->find($id);

        if (empty($user)) {
            return false;
        }

        $roles = $this->role->all();

        return ['user' => $user, 'roles' => $roles];
    }

    public function updateUser(Request $request, string $id)
    {

        $validated_req = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$id,
            ...($request->filled('password') ? ['password' => 'nullable|confirmed|min:8'] : []),
            ...($request->filled('profile') ? ['profile' => 'nullable|mimes:jpg,jpeg,png|max:2048'] : []),
            'role_id' => 'required|exists:roles,id|exclude',
        ], [
            'role_id.exists' => 'Role not found',
            'role_id.required' => 'Role is required',
        ]);

        $user = $this->user->find($id);

        if (empty($user)) {
            return false;
        }

        if ($request->hasFile('profile')) {

            if (! empty($user->profile)) {
                if (File::exists($this->directory.$user->profile)) {
                    File::delete($this->directory.$user->profile);
                }
            }

            $profile = $request->file('profile');
            $newProfile = time().uniqid().'.'.$profile->getClientOriginalExtension();

            if (! File::exists($this->directory)) {
                File::makeDirectory($this->directory, true, 0777, true);
            }

            $profile->move($this->directory, $newProfile);
            $validated_req['profile'] = $newProfile;
        }

        if ($user->update($validated_req)) {
            $role = $this->role->find($request->integer('role_id'));
            $user->syncRoles($role);

            return true;
        }

        return false;
    }

    public function destroyUser(string $id)
    {

        $user = $this->user->find($id);
        if (empty($user)) {
            return false;
        }

        if (! empty($user->profile)) {
            if (File::exists($this->directory.$user->profile)) {
                File::delete($this->directory.$user->profile);
            }
        }

        return $user->delete();
    }

    public function destroyUsersBySelection(Request $request)
    {
        $deletedCount = 0;

        $users = $this->user->whereIn('id', $request->array('ids'))->get();

        if ($users->isEmpty()) {
            return false;
        }

        foreach ($users as $user) {
            if (! empty($user->profile)) {
                if (File::exists($this->directory.$user->profile)) {
                    File::delete($this->directory.$user->profile);
                }
            }

            $user->delete();
            $deletedCount++;
        }

        return $deletedCount === count($request->array('ids'));
    }
}

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

        return ! empty($user) ? ['status' => true, 'message' => 'User created successfully'] : ['status' => false, 'message' => 'User creation failed Something Went Wrong'];
    }

    public function getUser(string $id)
    {
        $user = $this->user->find($id);

        if (empty($user)) {
            return ['status' => false, 'message' => 'No User Found'];
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
            return ['status' => false, 'message' => 'No User Found'];
        }

        if ($request->boolean('is_profile_removed')) {
            $validated_req['profile'] = null;

            if (! empty($user->profile)) {
                if (File::exists($this->directory.$user->profile)) {
                    File::delete($this->directory.$user->profile);
                }
            }
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

            return ['status' => true, 'message' => 'User updated successfully'];
        }

        return ['status' => false, 'message' => 'User update failed Something Went Wrong'];
    }

    public function destroyUser(string $id)
    {

        $user = $this->user->find($id);

        if (empty($user)) {
            return ['status' => false, 'message' => 'No User Found'];
        }

        if (! empty($user->profile)) {
            if (File::exists($this->directory.$user->profile)) {
                File::delete($this->directory.$user->profile);
            }
        }

        return $user->delete() ? ['status' => true, 'message' => 'User deleted successfully'] : ['status' => false, 'message' => 'User deletion failed Something Went Wrong'];
    }

    public function destroyUsersBySelection(Request $request)
    {

        $ids = $request->array('ids');
        if (blank($ids)) {
            return ['status' => false, 'message' => 'Please select at least one user'];
        }

        $deletedCount = 0;

        $users = $this->user->whereIn('id', $request->array('ids'))->get();

        if ($users->isEmpty()) {
            return ['status' => false, 'message' => 'No User Found With The Given IDs'];
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

        return $deletedCount === count($request->array('ids')) ? ['status' => true, 'message' => 'Users deleted successfully'] : ['status' => false, 'message' => 'Users Deletion Failed Something Went Wrong'];
    }
}

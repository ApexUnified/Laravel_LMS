<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public string $directory;

    public function __construct()
    {
        $this->directory = public_path('assets/images/user/');
    }

    public function index(Request $request)
    {

        $users = User::query()->latest()->with('roles');
        $search = ! empty($request->search) ? $request->search : null;
        if ($request->filled('search')) {
            $users = $users->where('name', 'LIKE', '%'.$search.'%')
                ->orWhere('email', 'LIKE', '%'.$search.'%');
        }

        $users = $users->paginate(10);

        $users->getCollection()->transform(function ($user) {
            $user->profile = ! empty($user->profile) ? asset('assets/images/user/'.$user->profile) : null;
            $user->added_at = (string) $user->created_at->format('Y-m-d');
            $user->role_name = $user->roles->pluck('name')->implode('');

            return $user;
        });

        return Inertia::render('Users/index', compact('users', 'search'));
    }

    public function create()
    {
        $roles = Role::all();

        return Inertia::render('Users/create', compact('roles'));
    }

    public function store(Request $request)
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

        $user = User::create($validated_req);
        if (! empty($user)) {
            $role = Role::find($request->integer('role_id'));
            $user->assignRole($role);

            return to_route('users.index')->with('success', 'User created successfully');
        } else {
            return back()->with('error', 'Something went wrong While Creating User');
        }

    }

    public function show(string $id)
    {

        if (empty($id)) {
            return back()->with('info', 'User not found');
        }

        $user = User::find($id);

        if (empty($user)) {
            return back()->with('info', 'User not found');
        }

        $roles = Role::all();

        return Inertia::render('Users/view', compact('user'));
    }

    public function edit(string $id)
    {
        if (empty($id)) {
            return back()->with('info', 'User not found');
        }

        $user = User::find($id);

        if (empty($user)) {
            return back()->with('info', 'User not found');
        }

        $roles = Role::all();

        return Inertia::render('Users/edit', compact('user', 'roles'));
    }

    public function update(Request $request, string $id)
    {
        if (empty($id)) {
            return back()->with('info', 'User not found');
        }

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

        $user = User::find($id);

        if (empty($user)) {
            return back()->with('info', 'User not found');
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
            $role = Role::find($request->integer('role_id'));
            $user->syncRoles($role);

            return to_route('users.index')->with('success', 'User updated successfully');
        } else {
            return back()->with('error', 'Something went wrong While Updating User');
        }

    }

    public function destroy(string $id)
    {
        if (empty($id)) {
            return back()->with('info', 'User not found');
        }

        $user = User::find($id);
        if (empty($user)) {
            return back()->with('info', 'User not found');
        }

        if (! empty($user->profile)) {
            if (File::exists($this->directory.$user->profile)) {
                File::delete($this->directory.$user->profile);
            }
        }

        if ($user->delete()) {
            return to_route('users.index')->with('success', 'User deleted successfully');
        } else {
            return back()->with('error', 'Something went wrong While Deleting User');
        }
    }

    public function destroyBySelection(Request $request)
    {
        $ids = $request->array('ids');

        if (blank($ids)) {
            return back()->with('error', 'No User Found With The Given IDs')->withErrors($request->all());
        }

        $users = User::whereIn('id', $ids)->get();

        if ($users->isEmpty()) {
            return back()->with('error', 'No User Found With The Given IDs')->withErrors($request->all());
        }

        foreach ($users as $user) {
            if (! empty($user->profile)) {
                if (File::exists($this->directory.$user->profile)) {
                    File::delete($this->directory.$user->profile);
                }
            }

            $user->delete();
        }

        return to_route('users.index')->with('success', 'Users deleted successfully');

    }
}

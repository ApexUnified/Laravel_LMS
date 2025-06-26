<?php

namespace App\Http\Controllers;

use App\Repositories\Users\Interface\UserRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(private UserRepositoryInterface $user) {}

    public function index(Request $request)
    {
        $data = $this->user->getAllUsers($request);

        $users = $data['users'];
        $search = $data['search'];

        return Inertia::render('Users/index', compact('users', 'search'));
    }

    public function create()
    {
        $roles = $this->user->create();

        return Inertia::render('Users/create', compact('roles'));
    }

    public function store(Request $request)
    {
        $user = $this->user->store($request);
        if (! empty($user)) {
            return to_route('users.index')->with('success', 'User created successfully');
        } else {
            return back()->with('error', 'Something went wrong While Creating User');
        }

    }

    public function show(string $id)
    {

        if (empty($id)) {
            return back()->with('error', 'User not found');
        }

        $user = $this->user->show($id);

        if (empty($user)) {
            return back()->with('error', 'User not found');
        }

        return Inertia::render('Users/view', compact('user'));
    }

    public function edit(string $id)
    {

        if (empty($id)) {
            return back()->with('info', 'User not found');
        }

        $data = $this->user->edit($id);

        if (empty($data)) {
            return back()->with('info', 'User not found');
        }

        $user = $data['user'];
        $roles = $data['roles'];

        return Inertia::render('Users/edit', compact('user', 'roles'));
    }

    public function update(Request $request, string $id)
    {
        if (empty($id)) {
            return back()->with('info', 'User not found');
        }

        $updated = $this->user->update($request, $id);
        if ($updated) {
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

        $deleted = $this->user->destroy($id);

        if ($deleted) {
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

        $deleted = $this->user->destroyBySelection($request);

        if ($deleted) {
            return to_route('users.index')->with('success', 'Users deleted successfully');
        } else {
            return back()->with('error', 'Something went wrong While Deleting Users')->withErrors($request->all());
        }

    }
}

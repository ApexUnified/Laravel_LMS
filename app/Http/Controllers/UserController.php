<?php

namespace App\Http\Controllers;

use App\Repositories\Users\Interface\UserRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class UserController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:User View', ['only' => 'index']),
            new Middleware('permission:User View', ['only' => 'show']),
            new Middleware('permission:User Create', ['only' => 'create']),
            new Middleware('permission:User Create', ['only' => 'store']),
            new Middleware('permission:User Edit', ['only' => 'edit']),
            new Middleware('permission:User Edit', ['only' => 'update']),
            new Middleware('permission:User Delete', ['only' => 'destroy']),
            new Middleware('permission:User Delete', ['only' => 'destroyBySelection']),
        ];
    }

    public function __construct(private UserRepositoryInterface $user) {}

    public function index(Request $request)
    {
        $data = $this->user->getUsers($request);

        $users = $data['users'];
        $search = $data['search'];

        return Inertia::render('Users/index', compact('users', 'search'));
    }

    public function create()
    {
        $roles = $this->user->getRoles();

        return Inertia::render('Users/create', compact('roles'));
    }

    public function store(Request $request)
    {
        $created = $this->user->storeUser($request);

        if ($created['status']) {
            return to_route('users.index')->with('success', $created['message']);
        } else {
            return back()->with('error', $created['message']);
        }

    }

    public function show(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'User not found');
        }

        $data = $this->user->getUser($id);

        if (isset($data['status']) && $data['status'] == false) {
            return to_route('users.index')->with('error', $data['message']);
        }

        $user = $data['user'];

        return Inertia::render('Users/view', compact('user'));
    }

    public function edit(string $id)
    {

        if (empty($id)) {
            return back()->with('info', 'User not found');
        }

        $data = $this->user->getUser($id);

        if (isset($data['status']) && $data['status'] == false) {
            return to_route('users.index')->with('error', $data['message']);
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

        $updated = $this->user->updateUser($request, $id);
        if ($updated['status']) {
            return to_route('users.index')->with('success', $updated['message']);
        } else {
            return back()->with('error', $updated['message']);
        }

    }

    public function destroy(string $id)
    {
        if (empty($id)) {
            return back()->with('info', 'User not found');
        }

        $deleted = $this->user->destroyUser($id);

        if ($deleted['status']) {
            return to_route('users.index')->with('success', $deleted['message']);
        } else {
            return back()->with('error', $deleted['message']);
        }
    }

    public function destroyBySelection(Request $request)
    {
        $deleted = $this->user->destroyUsersBySelection($request);

        if ($deleted['status']) {
            return to_route('users.index')->with('success', $deleted['message']);
        } else {
            return back()->with('error', $deleted['message']);
        }

    }
}

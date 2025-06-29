<?php

namespace App\Http\Controllers;

use App\Repositories\Profile\Interface\ProfileRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function __construct(
        private ProfileRepositoryInterface $user
    ) {}

    public function index()
    {
        $user = $this->user->getUser();

        if (empty($user)) {
            return back()->with('error', 'User not found');
        }

        return Inertia::render('Profile/index', compact('user'));
    }

    public function updateProfile(Request $request)
    {
        $updated = $this->user->updateProfile($request);

        if ($updated['status']) {
            return to_route('profile.index')->with('success', $updated['message']);
        } else {
            return to_route('profile.index')->with('error', '$updated["message"]');
        }
    }

    public function updatePassword(Request $request)
    {

        $updated = $this->user->updatePassword($request);

        if ($updated['status']) {
            return to_route('profile.index')->with('success', $updated['message']);
        } else {
            return to_route('profile.index')->with('error', $updated['message']);
        }
    }

    public function destroyAccount(Request $request)
    {

        $deleted = $this->user->destroyAccount($request);

        if ($deleted['status']) {
            return to_route('login')->with('success', $deleted['message']);
        } else {
            return to_route('profile.index')->with('error', $deleted['message']);
        }
    }
}

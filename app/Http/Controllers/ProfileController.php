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

        if ($updated) {
            return redirect()->route('profile.index')->with('success', 'Profile updated successfully');
        } else {
            return redirect()->route('profile.index')->with('error', 'Failed to update profile');
        }
    }

    public function updatePassword(Request $request)
    {

        $updated = $this->user->updatePassword($request);

        if ($updated) {
            return redirect()->route('profile.index')->with('success', 'Password updated successfully');
        } else {
            return redirect()->route('profile.index')->with('error', 'Failed to update password');
        }
    }

    public function destroyAccount(Request $request)
    {

        $deleted = $this->user->destroyAccount($request);

        if ($deleted) {
            return redirect()->route('login')->with('success', 'Account Permanently deleted successfully');
        } else {
            return redirect()->route('profile.index')->withErrors(request()->all())->with('error', 'Failed to delete account');
        }
    }
}

<?php

namespace App\Repositories\Profile\Repository;

use App\Models\User;
use App\Repositories\Profile\Interface\ProfileRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class ProfileRepository implements ProfileRepositoryInterface
{
    private ?User $user = null;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function getUser()
    {

        if (empty($this->user)) {
            return false;
        }

        return collect($this->user)->merge([
            'profile' => ! empty($user->profile) ? asset('assets/images/user/'.$this->user->profile) : null,
        ]);

    }

    public function updateProfile($request)
    {
        $validated_req = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$request->user()->id,
        ]);

        if (empty($this->user)) {
            return ['status' => false, 'message' => 'User not found'];
        }

        $this->user->fill($validated_req);

        if ($this->user->isDirty('email')) {
            $this->user->email_verified_at = null;
        }

        if ($this->user->save()) {
            return ['status' => true, 'message' => 'Profile updated successfully'];
        } else {
            return ['status' => false, 'message' => 'Failed to update profile'];
        }
    }

    public function updatePassword($request)
    {
        $validated_req = $request->validate([
            'current_password' => 'required|current_password',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password',
        ]);

        if (empty($this->user)) {
            return ['status' => false, 'message' => 'User not found'];
        }

        if ($this->user->update(['password' => bcrypt($request->password)])) {
            return ['status' => true, 'message' => 'Password updated successfully'];
        } else {
            return ['status' => false, 'message' => 'Failed To Update Password'];
        }
    }

    public function destroyAccount($request)
    {
        $request->validate([
            'current_password' => 'required|current_password',
        ]);

        if (empty($this->user)) {
            return ['status' => false, 'message' => 'User not found'];
        }

        if ($this->user->delete()) {
            Auth::logout();

            return ['status' => true, 'message' => 'Account Permanently deleted successfully'];
        } else {
            return ['status' => false, 'message' => 'Failed to delete account'];
        }
    }
}

<?php

namespace App\Http\Middleware;

use App\Models\Currency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'role' => $request->user()?->roles()->pluck('name')->implode(' ') ?? null,
                'permissions' => $request->user()?->hasRole('Admin') ? true
                : ($request->user() ? $request->user()->getAllPermissions()->pluck('name')->toArray() : []),

            ],

            'flash' => function () {
                return [
                    'success' => session('success'),
                    'error' => session('error'),
                    'info' => session('info'),
                ];
            },

            'generalSetting' => Cache::get('general_config'),
            'asset' => asset(''),
            'currency' => Currency::where('is_active', 1)->first(),
        ];
    }
}

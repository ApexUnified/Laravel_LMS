<?php

namespace App\Providers;

use App\Repositories\Profile\Interface\ProfileRepositoryInterface;
use App\Repositories\Profile\Repository\ProfileRepository;
use App\Repositories\Settings\Interface\SettingRepositoryInterface;
use App\Repositories\Settings\Repository\SettingRepository;
use App\Repositories\Users\Interface\UserRepositoryInterface;
use App\Repositories\Users\Repository\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceBinderProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(SettingRepositoryInterface::class, SettingRepository::class);
        $this->app->bind(ProfileRepositoryInterface::class, ProfileRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}

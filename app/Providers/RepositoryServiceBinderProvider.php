<?php

namespace App\Providers;

use App\Repositories\Categories\Interface\CategoryRepositoryInterface;
use App\Repositories\Categories\Repository\CategoryRepository;
use App\Repositories\CoursePlayer\Interface\CoursePlayerRepositoryInterface;
use App\Repositories\CoursePlayer\Repository\CoursePlayerRepository;
use App\Repositories\Courses\Interface\CoursesRepositoryInterface;
use App\Repositories\Courses\Repository\CourseRepository;
use App\Repositories\Lessons\Interface\LessonRepositoryInterface;
use App\Repositories\Lessons\Repository\LessonRepository;
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
        $this->app->bind(CategoryRepositoryInterface::class, CategoryRepository::class);
        $this->app->bind(CoursesRepositoryInterface::class, CourseRepository::class);
        $this->app->bind(LessonRepositoryInterface::class, LessonRepository::class);
        $this->app->bind(CoursePlayerRepositoryInterface::class, CoursePlayerRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}

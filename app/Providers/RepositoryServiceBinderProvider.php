<?php

namespace App\Providers;

use App\Repositories\AllCourses\AllCourseRepository;
use App\Repositories\AllCourses\Interface\AllCourseRepositoryInterface;
use App\Repositories\Categories\Interface\CategoryRepositoryInterface;
use App\Repositories\Categories\Repository\CategoryRepository;
use App\Repositories\Checkouts\Interface\CheckoutRepositoryInterface;
use App\Repositories\Checkouts\Repository\CheckoutRepository;
use App\Repositories\CoursePlayer\Interface\CoursePlayerRepositoryInterface;
use App\Repositories\CoursePlayer\Repository\CoursePlayerRepository;
use App\Repositories\Courses\Interface\CoursesRepositoryInterface;
use App\Repositories\Courses\Repository\CourseRepository;
use App\Repositories\Dashboard\Interface\DashboardRepositoryInterface;
use App\Repositories\Dashboard\Repository\DashboardRepository;
use App\Repositories\Enrollments\Interface\EnrollmentRepositoryInterface;
use App\Repositories\Enrollments\Repository\EnrollmentRepository;
use App\Repositories\Lessons\Interface\LessonRepositoryInterface;
use App\Repositories\Lessons\Repository\LessonRepository;
use App\Repositories\MyCourses\Interface\MyCourseRepositoryInterface;
use App\Repositories\MyCourses\Repository\MyCoursesRepository;
use App\Repositories\Notifications\Interface\NotificationRepositoryInterface;
use App\Repositories\Notifications\Repository\NotificationRepository;
use App\Repositories\Profile\Interface\ProfileRepositoryInterface;
use App\Repositories\Profile\Repository\ProfileRepository;
use App\Repositories\Settings\Interface\SettingRepositoryInterface;
use App\Repositories\Settings\Repository\SettingRepository;
use App\Repositories\Transactions\Interface\TransactionRepositoryInterface;
use App\Repositories\Transactions\Repository\TransactionRepository;
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
        $this->app->bind(EnrollmentRepositoryInterface::class, EnrollmentRepository::class);
        $this->app->bind(MyCourseRepositoryInterface::class, MyCoursesRepository::class);
        $this->app->bind(AllCourseRepositoryInterface::class, AllCourseRepository::class);
        $this->app->bind(CheckoutRepositoryInterface::class, CheckoutRepository::class);
        $this->app->bind(NotificationRepositoryInterface::class, NotificationRepository::class);
        $this->app->bind(TransactionRepositoryInterface::class, TransactionRepository::class);
        $this->app->bind(DashboardRepositoryInterface::class, DashboardRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}

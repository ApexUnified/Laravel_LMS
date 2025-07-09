<?php

namespace App\Http\Controllers;

use App\Repositories\Dashboard\Interface\DashboardRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class DashboardController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:Dashboard', ['only' => '__invoke']),
        ];
    }

    public function __construct(
        private DashboardRepositoryInterface $dashboard
    ) {}

    public function __invoke(Request $request)
    {

        // For Admin
        $students_count = $request->user()->hasRole('Admin') ? $this->dashboard->getStudentsCount() : null;
        $instructors_count = $request->user()->hasRole('Admin') ? $this->dashboard->getInstructorsCount() : null;
        $new_registrations_this_month = $request->user()->hasRole('Admin') ? $this->dashboard->getNewRegistrationsThisMonth() : null;
        $total_courses_count = $request->user()->hasRole('Admin') ? $this->dashboard->totalCoursesCount() : null;
        $total_lessons_count = $request->user()->hasRole('Admin') ? $this->dashboard->totalLessonsCount() : null;
        $total_categories_count = $request->user()->hasRole('Admin') ? $this->dashboard->totalCategoriesCount() : null;
        $enrolled_courses = $request->user()->hasRole('Admin') ? $this->dashboard->EnrolledCourses() : new LengthAwarePaginator([], 0, 10);
        $active_courses = $request->user()->hasRole('Admin') ? $this->dashboard->activeCourses() : new LengthAwarePaginator([], 0, 10);
        $inActive_courses = $request->user()->hasRole('Admin') ? $this->dashboard->inActiveCourses() : new LengthAwarePaginator([], 0, 10);
        $daily_transactions_of_the_month_revenue = $request->user()->hasRole('Admin') ? $this->dashboard->monthlyRevenue() : [];
        $daily_transactions_of_the_month_revenue_ChartData = ! blank($daily_transactions_of_the_month_revenue) ? [
            'labels' => $daily_transactions_of_the_month_revenue['labels'],
            'data' => $daily_transactions_of_the_month_revenue['data'],
            'currency' => $daily_transactions_of_the_month_revenue['currency'],
        ] : [];

        // For Other Roles
        $user_total_enrolled_courses = ! $request->user()->hasRole('Admin') ? $this->dashboard->userTotalEnrolledCourses($request->user()->id) : null;
        $user_total_completed_courses = ! $request->user()->hasRole('Admin') ? $this->dashboard->userTotalCompletedCourses($request->user()->id) : null;
        $user_notifications = ! $request->user()->hasRole('Admin') ? $this->dashboard->getNotifications($request->user()->id) : [];

        return Inertia::render('Dashboard', compact(
            'students_count',
            'instructors_count',
            'new_registrations_this_month',
            'total_courses_count',
            'total_lessons_count',
            'total_categories_count',
            'enrolled_courses',
            'active_courses',
            'inActive_courses',
            'daily_transactions_of_the_month_revenue_ChartData',

            'user_total_enrolled_courses',
            'user_total_completed_courses',
            'user_notifications'

        ));
    }
}

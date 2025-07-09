<?php

namespace App\Repositories\Dashboard\Repository;

use App\Models\Category;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Models\Transaction;
use App\Models\User;
use App\Repositories\Dashboard\Interface\DashboardRepositoryInterface;
use App\Repositories\Notifications\Interface\NotificationRepositoryInterface;
use Str;

class DashboardRepository implements DashboardRepositoryInterface
{
    public function __construct(
        private User $user,
        private Course $course,
        private Lesson $lesson,
        private Category $category,
        private Transaction $transaction,
        private Enrollment $enrollment,
        private LessonProgress $lesson_progress,
        private NotificationRepositoryInterface $notification
    ) {}

    // Admin
    public function getStudentsCount()
    {
        return $this->user->whereHas('roles', function ($q) {
            $q->where('name', 'Student');
        })->count();

    }

    public function getInstructorsCount()
    {
        return $this->user->whereHas('roles', function ($q) {
            $q->where('name', 'Instructor');
        })->count();
    }

    public function getNewRegistrationsThisMonth()
    {
        return $this->user->whereMonth('created_at', now()->month)->count();
    }

    public function totalCoursesCount()
    {
        return $this->course->count();
    }

    public function totalLessonsCount()
    {
        return $this->lesson->count();
    }

    public function totalCategoriesCount()
    {
        return $this->category->count();
    }

    public function EnrolledCourses()
    {
        return $this->course
            ->where('is_approved', true)
            ->where('is_published', true)
            ->with('enrollments')
            ->has('enrollments')
            ->paginate(10)
            ->through(function ($course) {
                return [
                    'title' => $course->title,
                    'slug' => $course->slug,
                    'enrollments' => $course->enrollments->count(),
                ];
            });
    }

    public function activeCourses()
    {
        return $this->course
            ->where('is_approved', true)
            ->where('is_published', true)
            ->paginate(10);
    }

    public function inActiveCourses()
    {
        return $this->course
            ->where(function ($query) {
                $query->where('is_approved', false)
                    ->orWhere('is_published', false);
            })
            ->paginate(10);
    }

    public function monthlyRevenue()
    {
        $daysInMonth = now()->daysInMonth;
        $transactions = $this->transaction
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->get();

        $currency = $transactions->first() ? Str::upper($transactions->first()->currency) : 'USD';

        $transactions = $transactions->groupBy(function ($transaction) {
            return (int) $transaction->created_at->format('d');
        });

        $labels = [];
        $data = [];

        for ($day = 1; $day <= $daysInMonth; $day++) {
            $labels[] = str_pad($day, 2, '0', STR_PAD_LEFT); // e.g., '01', '02'
            $dayTransactions = $transactions[$day] ?? collect();
            $data[] = $dayTransactions->sum('amount');
        }

        return [
            'labels' => $labels,
            'data' => $data,
            'currency' => $currency,
        ];
    }

    // Other
    public function userTotalEnrolledCourses(string $user_id)
    {
        return $this->enrollment->where('user_id', $user_id)->count();
    }

    public function userTotalCompletedCourses(string $user_id)
    {
        return $this->lesson_progress->where('user_id', $user_id)->whereNotNull('completed_at')->count();
    }

    public function getNotifications(string $user_id)
    {
        return $this->notification->getAllNotifications($user_id, 2);
    }
}

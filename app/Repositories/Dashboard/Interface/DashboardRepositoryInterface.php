<?php

namespace App\Repositories\Dashboard\Interface;

interface DashboardRepositoryInterface
{
    // Admin
    public function getStudentsCount();

    public function getInstructorsCount();

    public function getNewRegistrationsThisMonth();

    public function totalCoursesCount();

    public function totalLessonsCount();

    public function totalCategoriesCount();

    public function EnrolledCourses();

    public function activeCourses();

    public function inActiveCourses();

    public function monthlyRevenue();

    // Other
    public function userTotalEnrolledCourses(string $user_id);

    public function userTotalCompletedCourses(string $user_id);

    public function getNotifications(string $user_id);
}

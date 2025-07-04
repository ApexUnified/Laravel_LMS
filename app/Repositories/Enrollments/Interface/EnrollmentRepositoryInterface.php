<?php

namespace App\Repositories\Enrollments\Interface;

use Illuminate\Http\Request;

interface EnrollmentRepositoryInterface
{
    public function getEnrollments(Request $request);

    public function storeEnrollment(Request $request);

    public function getEnrollment(string $id);

    public function destroyEnrollment(string $id);

    public function destroyBySelection(Request $request);

    public function getCourses();

    public function getUsers();

    public function getCoursesRelatedToUser(string $id);
}

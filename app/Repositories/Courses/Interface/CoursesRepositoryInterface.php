<?php

namespace App\Repositories\Courses\Interface;

use Illuminate\Http\Request;

interface CoursesRepositoryInterface
{
    public function getCourses(Request $request);

    public function storeCourse(Request $request);

    public function getCourseBySlug(string $slug);

    public function getCourseById($course_id);

    public function updateCourse(Request $request, string $slug);

    public function destroyCourse(string $id);

    public function destroyCourseBySelection(Request $request);

    public function getInstructors();

    public function getCategories();
}

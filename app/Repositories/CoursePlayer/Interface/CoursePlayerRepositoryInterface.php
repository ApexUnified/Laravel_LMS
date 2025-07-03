<?php

namespace App\Repositories\CoursePlayer\Interface;

use Illuminate\Http\Request;

interface CoursePlayerRepositoryInterface
{
    public function getCourse($course_slug);

    public function getLesson($course_slug, $lesson_slug);

    public function UpdateLessonProgress(Request $request);

    public function getCourseProgress(string $course_id);
}

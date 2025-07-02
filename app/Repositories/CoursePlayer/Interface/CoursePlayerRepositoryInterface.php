<?php

namespace App\Repositories\CoursePlayer\Interface;

interface CoursePlayerRepositoryInterface
{
    public function getCourse($course_slug);

    public function getLesson($course_slug, $lesson_slug);
}

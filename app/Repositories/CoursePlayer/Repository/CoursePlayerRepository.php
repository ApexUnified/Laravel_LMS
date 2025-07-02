<?php

namespace App\Repositories\CoursePlayer\Repository;

use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Support\Facades\Auth;

class CoursePlayerRepository
{
    public function __construct(
        private Course $course,
        private Lesson $lesson
    ) {}

    public function getCourse($course_slug)
    {
        $course = $this->course
            ->where('slug', $course_slug)
            ->when(Auth::user()->hasRole('Student'), function ($query) {
                $query->where('is_published', true)
                    ->where('is_approved', true);
            })
            ->with(['lessons'])
            ->first();

        if (empty($course)) {
            return ['status' => false, 'message' => 'Course not found! Or Course Might Be Not Approved Please Check Approval Statuses'];
        }

        return $course;
    }

    public function getLesson($course_slug, $lesson_slug)
    {
        $lesson = $this->lesson
            ->whereHas('course', function ($query) use ($course_slug) {
                $query->where('slug', $course_slug);
            })
            ->where('slug', $lesson_slug)
            ->when(Auth::user()->hasRole('Student'), function ($query) {
                $query->where('is_published', true)
                    ->where('is_approved', true);
            })
            ->with(['course'])
            ->first();

        if (empty($lesson)) {
            return ['status' => false, 'message' => 'Lesson not found! Or Lesson Might Be Not Approved Please Check Approval Statuses'];
        }

        return $lesson;
    }
}

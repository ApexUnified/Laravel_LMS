<?php

namespace App\Http\Controllers;

use App\Repositories\CoursePlayer\Repository\CoursePlayerRepository;
use Inertia\Inertia;

class CoursePlayerController extends Controller
{
    public function __construct(
        private CoursePlayerRepository $coursePlayer
    ) {}

    public function coursePlayer($course_slug)
    {
        if (empty($course_slug)) {
            return to_route('dashboard')->with('error', 'Course not found');
        }

        $course = $this->coursePlayer->getCourse($course_slug);

        if (isset($course['status']) && $course['status'] == false) {
            return to_route('dashboard')->with('error', $course['message']);
        }

        return Inertia::render('CoursePlayer/CoursePlayer', compact('course'));

    }

    public function lessonPlayer($course_slug, $lesson_slug)
    {
        if (empty($course_slug) || empty($lesson_slug)) {
            return back()->with('error', 'Course not found');
        }

        $lesson = $this->coursePlayer->getLesson($course_slug, $lesson_slug);

        if (isset($lesson['status']) && $lesson['status'] == false) {
            return to_route('dashboard')->with('error', $lesson['message']);
        }

        $course = $this->coursePlayer->getCourse($course_slug);

        if (isset($course['status']) && $course['status'] == false) {
            return to_route('dashboard')->with('error', $course['message']);
        }

        return Inertia::render('CoursePlayer/LessonPlayer', compact('lesson', 'course'));
    }
}

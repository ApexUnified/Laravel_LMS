<?php

namespace App\Http\Controllers;

use App\Repositories\CoursePlayer\Interface\CoursePlayerRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CoursePlayerController extends Controller
{
    public function __construct(
        private CoursePlayerRepositoryInterface $coursePlayer
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

        $course_progress = (int) $this->coursePlayer->getCourseProgress($course['id']);

        return Inertia::render('CoursePlayer/CoursePlayer', compact('course', 'course_progress'));

    }

    public function lessonPlayer($course_slug, $lesson_slug)
    {
        if (empty($course_slug) || $course_slug === 'notfound') {
            return back()->with('error', "Course not found Please Check Course Lessons's Realated Course Exists OR Not ");
        }

        if (empty($lesson_slug)) {
            return back()->with('error', 'Lesson not found');
        }

        $lesson = $this->coursePlayer->getLesson($course_slug, $lesson_slug);

        if (isset($lesson['status']) && $lesson['status'] == false) {
            return to_route('dashboard')->with('error', $lesson['message']);
        }

        $course = $this->coursePlayer->getCourse($course_slug);

        if (isset($course['status']) && $course['status'] == false) {
            return to_route('dashboard')->with('error', $course['message']);
        }

        $course_progress = (int) $this->coursePlayer->getCourseProgress($course['id']);

        return Inertia::render('CoursePlayer/LessonPlayer', compact('lesson', 'course', 'course_progress'));
    }

    public function UpdateLessonProgress(Request $request)
    {
        return $this->coursePlayer->UpdateLessonProgress($request);
    }
}

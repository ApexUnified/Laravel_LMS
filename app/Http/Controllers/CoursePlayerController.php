<?php

namespace App\Http\Controllers;

use App\Repositories\CoursePlayer\Interface\CoursePlayerRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        $data = $this->coursePlayer->getCourse($course_slug);

        if (isset($data['status']) && $data['status'] == false) {
            return to_route('dashboard')->with('error', $data['message']);
        }

        $course = $data['course'];
        $is_user_enrolled = $data['is_user_enrolled'];
        $course_progress = (int) $this->coursePlayer->getCourseProgress($course['id']);

        return Inertia::render('CoursePlayer/CoursePlayer', compact('course', 'course_progress', 'is_user_enrolled'));

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

        $data = $this->coursePlayer->getCourse($course_slug);

        $course = $data['course'];
        $is_user_enrolled = $data['is_user_enrolled'];

        if (Auth::user()->hasRole('Student') && ! $is_user_enrolled) {
            return to_route('dashboard')->with('error', 'You are not enrolled in this course');
        }

        if (isset($data['status']) && $data['status'] == false) {
            return to_route('dashboard')->with('error', $data['message']);
        }

        $course_progress = (int) $this->coursePlayer->getCourseProgress($course['id']);

        return Inertia::render('CoursePlayer/LessonPlayer', compact('lesson', 'course', 'course_progress', 'is_user_enrolled'));
    }

    public function UpdateLessonProgress(Request $request)
    {
        return $this->coursePlayer->UpdateLessonProgress($request);
    }
}

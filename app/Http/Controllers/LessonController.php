<?php

namespace App\Http\Controllers;

use App\Repositories\Courses\Interface\CoursesRepositoryInterface;
use App\Repositories\Lessons\Interface\LessonRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonController extends Controller
{
    public function __construct(
        private LessonRepositoryInterface $lesson,
        private CoursesRepositoryInterface $course
    ) {}

    public function index(Request $request)
    {
        $data = $this->lesson->getLessons($request);

        $lessons = $data['lessons'];
        $courses = $this->lesson->getCourses();
        $categories = $this->course->getCategories();
        $instructors = $this->course->getInstructors();
        $search = $data['search'];
        $category_id = $data['category_id'];
        $course_id = $data['course_id'];
        $instructor_id = $data['instructor_id'];

        return Inertia::render('Lessons/index', compact('lessons', 'courses', 'categories', 'instructors', 'search', 'category_id', 'course_id', 'instructor_id'));
    }

    public function create()
    {
        $courses = $this->lesson->getCourses();

        return Inertia::render('Lessons/create', compact('courses'));
    }

    public function store(Request $request)
    {
        $created = $this->lesson->storeLesson($request);

        if ($created['status']) {
            return to_route('lessons.index')->with('success', $created['message']);
        } else {
            return back()->with('error', $created['message']);
        }
    }

    public function edit(string $slug)
    {
        if (empty($slug)) {
            return back()->with('error', 'Lesson Not Found!');
        }

        $lesson = $this->lesson->getLesson($slug);

        if (isset($lesson['status']) && $lesson['status'] === false) {
            return back()->with('error', $lesson['message']);
        }

        $courses = $this->lesson->getCourses();

        return Inertia::render('Lessons/edit', compact('lesson', 'courses'));
    }

    public function update(Request $request, string $slug)
    {
        if (empty($slug)) {
            return back()->with('error', 'Lesson Not Found!');
        }

        $updated = $this->lesson->updateLesson($request, $slug);
        if ($updated['status']) {
            return to_route('lessons.index')->with('success', $updated['message']);
        } else {
            return back()->with('error', $updated['message']);
        }
    }

    public function destroy(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Lesson Not Found!');
        }

        $deleted = $this->lesson->destroyLesson($id);

        if ($deleted['status']) {
            return back()->with('success', $deleted['message']);
        } else {
            return back()->with('error', $deleted['message']);
        }

    }

    public function destroyBySelection(Request $request)
    {
        $deleted = $this->lesson->destroyLessonBySelection($request);

        if ($deleted['status']) {
            return back()->with('success', $deleted['message']);
        } else {
            return back()->with('error', $deleted['message']);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Repositories\Courses\Interface\CoursesRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function __construct(
        private CoursesRepositoryInterface $course,
    ) {}

    public function index(Request $request)
    {

        $data = $this->course->getCourses($request);

        $courses = $data['courses'];
        $instructors = $data['instructors'];
        $categories = $data['categories'];
        $search = $data['search'];
        $category_id = $data['category_id'];
        $instructor_id = $data['instructor_id'];

        // return $courses;

        return Inertia::render('Courses/index', compact('courses', 'instructors', 'categories', 'category_id', 'instructor_id', 'search'));
    }

    public function create()
    {
        $categories = $this->course->getCategories();
        $instructors = $this->course->getInstructors();

        return Inertia::render('Courses/create', compact('categories', 'instructors'));
    }

    public function store(Request $request)
    {
        $created = $this->course->storeCourse($request);
        if ($created['status']) {
            return to_route('courses.index')->with('success', $created['message']);
        } else {
            return back()->with('error', $created['message']);
        }
    }

    // public function show(string $id)
    // {
    //     $course = $this->course->getCourse($id);

    //     if (isset($course['status']) && $course['status'] === false) {
    //         return to_route('courses.index')->with('error', $course['message']);
    //     }

    //     return Inertia::render('Courses/view', compact('course'));
    // }

    public function edit(string $id)
    {

        $course = $this->course->getCourse($id);

        if (isset($course['status']) && $course['status'] === false) {
            return to_route('courses.index')->with('error', $course['message']);
        }

        $categories = $this->course->getCategories();
        $instructors = $this->course->getInstructors();

        return Inertia::render('Courses/edit', compact('course', 'categories', 'instructors'));
    }

    public function update(Request $request, string $id)
    {
        $updated = $this->course->updateCourse($request, $id);

        if ($updated['status']) {
            return to_route('courses.index')->with('success', $updated['message']);
        } else {
            return back()->with('error', $updated['message']);
        }
    }

    public function destroy(string $id)
    {
        $deleted = $this->course->destroyCourse($id);

        if ($deleted['status']) {
            return to_route('courses.index')->with('success', $deleted['message']);
        } else {
            return back()->with('error', $deleted['message']);
        }
    }

    public function destroyBySelection(Request $request)
    {
        $deleted = $this->course->destroyCourseBySelection($request);

        if ($deleted['status']) {
            return to_route('courses.index')->with('success', $deleted['message']);
        } else {
            return back()->with('error', $deleted['message']);
        }
    }
}

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
        $search = $data['search'];

        return Inertia::render('Courses/index', compact('courses', 'search'));
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

        if (isset($created['status']) && $created['status'] == false) {
            return back()->with('error', $created['message'])->withErrors($request->all());
        }

        if ($created) {
            return to_route('courses.index')->with('success', 'Course created successfully');
        } else {
            return to_route('courses.index')->with('error', 'Something went wrong While Creating Course');
        }
    }

    public function show(string $id)
    {
        $course = $this->course->getCourse($id);

        if (empty($course)) {
            return to_route('courses.index')->with('error', 'Course not found');
        }

        return Inertia::render('Courses/view', compact('course'));
    }

    public function edit(string $id)
    {

        $course = $this->course->getCourse($id);

        if (empty($course)) {
            return to_route('courses.index')->with('error', 'Course not found');
        }

        $categories = $this->course->getCategories();
        $instructors = $this->course->getInstructors();

        return Inertia::render('Courses/edit', compact('course', 'categories', 'instructors'));
    }

    public function update(Request $request, string $id)
    {
        $updated = $this->course->updateCourse($request, $id);

        if (isset($updated['status']) && $updated['status'] == false) {
            return back()->with('error', $updated['message'])->withErrors($request->all());
        }

        if ($updated) {
            return to_route('courses.index')->with('success', 'Course updated successfully');
        } else {
            return to_route('courses.index')->with('error', 'Something went wrong While Updating Course');
        }
    }

    public function destroy(string $id)
    {
        $deleted = $this->course->destroyCourse($id);

        if ($deleted) {
            return to_route('courses.index')->with('success', 'Course deleted successfully');
        } else {
            return to_route('courses.index')->with('error', 'Something went wrong While Deleting Course');
        }
    }

    public function destroyBySelection(Request $request)
    {
        $deleted = $this->course->destroyCourseBySelection($request);

        if ($deleted) {
            return to_route('courses.index')->with('success', 'Courses deleted successfully');
        } else {
            return to_route('courses.index')->with('error', 'Something went wrong While Deleting Courses');
        }
    }
}

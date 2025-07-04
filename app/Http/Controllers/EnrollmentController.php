<?php

namespace App\Http\Controllers;

use App\Repositories\Enrollments\Interface\EnrollmentRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    public function __construct(
        private EnrollmentRepositoryInterface $enrollment
    ) {}

    public function index(Request $request)
    {
        $data = $this->enrollment->getEnrollments($request);

        $enrollments = $data['enrollments'];

        // return $enrollments;
        $users = $this->enrollment->getUsers();
        $courses = $this->enrollment->getCourses();
        $user_id = $data['user_id'];
        $course_id = $data['course_id'];
        $search = $data['search'];

        return Inertia::render('Enrollments/index', compact('enrollments', 'users', 'courses', 'user_id', 'course_id', 'search'));
    }

    public function create()
    {
        $users = $this->enrollment->getUsers();

        return Inertia::render('Enrollments/create', compact('users'));
    }

    public function store(Request $request)
    {
        $created = $this->enrollment->storeEnrollment($request);

        if ($created['status']) {
            return to_route('enrollments.index')->with('success', $created['message']);
        } else {
            return back()->with('error', $created['message']);
        }
    }

    public function destroy(string $id)
    {
        $deleted = $this->enrollment->destroyEnrollment($id);

        if ($deleted['status']) {
            return to_route('enrollments.index')->with('success', $deleted['message']);
        } else {
            return back()->with('error', $deleted['message']);
        }
    }

    public function destroyBySelection(Request $request)
    {
        $deleted = $this->enrollment->destroyBySelection($request);

        if ($deleted['status']) {
            return to_route('enrollments.index')->with('success', $deleted['message']);
        } else {
            return back()->with('error', $deleted['message']);
        }
    }

    public function GetCoursesRelatedToUser(string $id)
    {
        if (empty($id)) {
            return ['status' => false, 'message' => 'User is required'];
        }

        $data = $this->enrollment->GetCoursesRelatedToUser($id);

        if (isset($data['status']) && $data['status'] === false) {
            return ['status' => false, 'message' => $data['message']];
        }

        return ['status' => true, 'courses' => $data];
    }
}

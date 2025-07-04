<?php

namespace App\Repositories\Enrollments\Repository;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use App\Repositories\Enrollments\Interface\EnrollmentRepositoryInterface;
use Illuminate\Http\Request;

class EnrollmentRepository implements EnrollmentRepositoryInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private Enrollment $enrollment,
        private Course $course,
        private User $user

    ) {}

    public function getEnrollments(Request $request)
    {
        $enrollments = $this->enrollment->query()->latest();

        $user_id = $request->filled('user_id') ? $request->user_id : null;
        $course_id = $request->filled('course_id') ? $request->course_id : null;
        $search = $request->filled('search') ? $request->search : null;

        if ($search) {
            $enrollments->where(function ($query) use ($search) {
                $query->whereHas('enrolledStudents', function ($query) use ($search) {
                    $query->where('name', 'like', '%'.$search.'%');
                })->orWhereHas('enrolledCourses', function ($query) use ($search) {
                    $query->where('title', 'like', '%'.$search.'%');
                });
            });
        }

        if ($user_id) {
            $enrollments->where('user_id', $user_id);
        }

        if ($course_id) {
            $enrollments->where('course_id', $course_id);
        }

        $enrollments = $enrollments->with(['enrolledStudents', 'enrolledCourses'])->paginate(10);

        $enrollments->getCollection()->transform(function ($enrollment) {
            $enrollment->added_at = $enrollment->created_at->format('Y-m-d g:i A');

            return $enrollment;
        });

        return ['enrollments' => $enrollments, 'user_id' => $user_id, 'course_id' => $course_id, 'search' => $search];
    }

    public function storeEnrollment(Request $request)
    {
        $validated_req = $request->validate([
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
        ], [
            'user_id.required' => 'User is required',
            'course_id.required' => 'Course is required',
            'user_id.exists' => 'SelectedUser does not exist',
            'course_id.exists' => 'Selected Course does not exist',
        ]);

        $validated_req['is_enrolled'] = true;
        $validated_req['enrolled_at'] = now();

        if ($this->enrollment->create($validated_req)) {
            return ['status' => true, 'message' => 'Enrollment created successfully'];
        } else {
            return ['status' => false, 'message' => 'Something Went Wrong, Enrollment could not be created'];
        }
    }

    public function getEnrollment(string $id)
    {
        return $this->enrollment->find($id);

    }

    public function destroyEnrollment(string $id)
    {

        $enrollment = $this->getEnrollment($id);

        if (! empty($enrollment) && $enrollment->delete()) {
            return ['status' => true, 'message' => 'Enrollment deleted successfully'];
        } else {
            return ['status' => false, 'message' => 'Something Went Wrong, Enrollment could not be deleted'];
        }
    }

    public function destroyBySelection(Request $request)
    {
        $ids = $request->array('ids');

        if (blank($ids)) {
            return ['status' => false, 'message' => 'Please select at least one enrollment to delete'];
        }

        $deleted = $this->enrollment->destroy($ids);
        if ($deleted === count($ids)) {
            return ['status' => true, 'message' => 'Enrollments deleted successfully'];
        } else {
            return ['status' => false, 'message' => 'Something Went Wrong, Enrollments could not be deleted'];
        }
    }

    public function getCourses()
    {
        return $this->course->all();
    }

    public function getUsers()
    {
        return $this->user->all();
    }

    public function getCoursesRelatedToUser(string $id)
    {

        $user = $this->user->find($id);

        if (empty($user)) {
            return ['status' => false, 'message' => 'User not found'];
        }

        $alreadyEnrolledCourses = $this->enrollment->where('user_id', $id)->pluck('course_id');

        if (blank($alreadyEnrolledCourses)) {
            return ['status' => true, 'courses' => $this->course->all()];
        }

        $courses = $this->course->whereNotIn('id', $alreadyEnrolledCourses)->get()->toArray();

        return blank($courses) ? ['status' => false, 'message' => 'No Course Availible Maybe This User Already Enrolled In All Courses'] : ['status' => true, 'courses' => $courses];
    }
}

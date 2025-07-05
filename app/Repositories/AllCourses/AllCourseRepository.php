<?php

namespace App\Repositories\AllCourses;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use App\Repositories\AllCourses\Interface\AllCourseRepositoryInterface;

class AllCourseRepository implements AllCourseRepositoryInterface
{
    public function __construct(
        private Course $course,
        private Enrollment $enrollment,
        private User $user
    ) {}

    public function getAllCourses(string $user_id)
    {
        $user = $this->user->find($user_id);
        $enrollment_course_ids = $this->enrollment->where('user_id', $user->id)->pluck('course_id');

        $courses = $this->course->when(! blank($enrollment_course_ids), function ($query) use ($enrollment_course_ids) {
            $query->whereNotIn('id', $enrollment_course_ids);
        })
            ->when($user->hasRole('Student'), function ($query) {
                $query->where('is_published', true)
                    ->where('is_approved', true);
            })
            ->with(['instructor'])->withCount('lessons')->paginate(6);

        return $courses;
    }
}

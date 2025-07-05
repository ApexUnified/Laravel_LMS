<?php

namespace App\Http\Controllers;

use App\Repositories\Courses\Interface\CoursesRepositoryInterface;
use App\Repositories\Enrollments\Interface\EnrollmentRepositoryInterface;
use Illuminate\Http\Request;

class PurchaseCourseController extends Controller
{
    public function __construct(
        private EnrollmentRepositoryInterface $enrollment,
        private CoursesRepositoryInterface $course,
    ) {}

    public function __invoke(Request $request)
    {

        if (empty($request->integer('course_id'))) {
            return back()->with('error', 'Something went wrong! Course is ID Missing');
        }

        $course = $this->course->getCourseById($request->integer('course_id'));

        if (isset($course['status']) && $course['status'] == false) {
            return back()->with('error', $course['message']);
        }

        if ((float) $course->price == 0) {
            $enroll = $this->enrollment->storeEnrollment($request);

            if ($enroll['status']) {
                return back()->with('success', "Congragulations You Have Successfully Enrolled In {$course->title}");
            } else {
                return back()->with('error', 'Something went wrong! while Enrolling You');
            }
        } else {
            dd('Payment Please./..!');
        }

    }
}

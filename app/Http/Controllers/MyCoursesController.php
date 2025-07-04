<?php

namespace App\Http\Controllers;

use App\Repositories\MyCourses\Interface\MyCourseRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MyCoursesController extends Controller
{
    public function __construct(
        private MyCourseRepositoryInterface $my_courses) {}

    public function __invoke(Request $request)
    {
        $user_id = Auth::id();

        $courses = $this->my_courses->getMyCourses($user_id);

        if (isset($courses['status']) && $courses['status'] == false) {
            session()->flash('info', $courses['message']);
        }

        return Inertia::render('MyCourses/index', compact('courses'));
    }
}

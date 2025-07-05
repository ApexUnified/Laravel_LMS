<?php

namespace App\Http\Controllers;

use App\Repositories\AllCourses\Interface\AllCourseRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AllCourseController extends Controller
{
    public function __construct(
        private AllCourseRepositoryInterface $allcourse
    ) {}

    public function __invoke(Request $request)
    {

        $courses = $this->allcourse->getAllCourses($request->user()->id);

        return Inertia::render('AllCourses/index', compact('courses'));
    }
}

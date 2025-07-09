<?php

namespace App\Http\Controllers;

use App\Repositories\AllCourses\Interface\AllCourseRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class AllCourseController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:All Courses', ['only' => '__invoke']),
        ];
    }

    public function __construct(
        private AllCourseRepositoryInterface $allcourse
    ) {}

    public function __invoke(Request $request)
    {

        $courses = $this->allcourse->getAllCourses($request->user()->id);

        return Inertia::render('AllCourses/index', compact('courses'));
    }
}

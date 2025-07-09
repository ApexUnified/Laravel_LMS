<?php

namespace App\Http\Controllers;

use App\Repositories\MyCourses\Interface\MyCourseRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MyCourseController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:My Courses', ['only' => '__invoke']),
        ];
    }

    public function __construct(
        private MyCourseRepositoryInterface $my_courses) {}

    public function __invoke(Request $request)
    {
        $user_id = Auth::id();

        $courses = $this->my_courses->getMyCourses($user_id);

        return Inertia::render('MyCourses/index', compact('courses'));
    }
}

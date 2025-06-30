<?php

namespace App\Repositories\Lessons\Interface;

use Illuminate\Http\Request;

interface LessonRepositoryInterface
{
    public function getLessons(Request $request);

    public function getLesson(string $id);

    public function storeLesson(Request $request);

    public function updateLesson(Request $request, string $id);

    public function destroyLesson(string $id);

    public function destroyLessonBySelection(Request $request);

    public function getCourses();
}

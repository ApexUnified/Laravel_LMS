<?php

namespace App\Repositories\MyCourses\Interface;

interface MyCourseRepositoryInterface
{
    public function getMyCourses(string $user_id);
}

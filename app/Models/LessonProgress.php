<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LessonProgress extends Model
{
    protected $fillable = [
        'user_id',
        'course_id',
        'lesson_id',
        'lesson_watched_time',
        'completed',
        'completed_at',
    ];
}

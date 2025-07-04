<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enrollment extends Model
{
    protected $fillable = [
        'user_id',
        'course_id',
        'is_enrolled',
        'enrolled_at',
    ];

    // Relations
    public function enrolledStudents(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function enrolledCourses(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lesson extends Model
{
    protected $fillable = [
        'course_id',
        'title',
        'slug',
        'description',
        'thumbnail',
        'video',
        'attachments',
    ];

    // Relations
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }

    protected $casts = [
        'attachments' => 'array',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'short_description',
        'thumbnail',
        'thumbnail_public_id',
        'promo_video',
        'promo_video_public_id',
        'promo_video_duration',
        'category_id',
        'instructor_id',
        'price',
        'discount',
        'level',
        'course_language',
        'is_published',
        'is_approved',
        'requirements',
        'learning_outcomes',
        'meta_title',
        'meta_description',
    ];

    // Relations
    public function instructor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'instructor_id', 'id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class, 'course_id', 'id');
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class, 'course_id', 'id');
    }

    public function lessonProgressCourse(): HasMany
    {
        return $this->hasMany(LessonProgress::class, 'course_id', 'id');
    }

    // Attributes
    public function getPromoVideoDurationAttribute()
    {
        if (empty($this->attributes['promo_video_duration'])) {
            return null;
        }

        $seconds = $this->attributes['promo_video_duration'];
        $hours = floor($seconds / 3600);
        $minutes = floor(($seconds % 3600) / 60);
        $remainingSeconds = $seconds % 60;

        return sprintf('%02d:%02d:%02d', $hours, $minutes, $remainingSeconds);
    }

    public function getDescriptionAttribute()
    {
        return json_decode($this->attributes['description']);
    }

    public function getRequirementsAttribute()
    {
        return ! empty($this->attributes['requirements']) ? json_decode($this->attributes['requirements']) : null;
    }

    public function getLearningOutcomesAttribute()
    {
        return ! empty($this->attributes['learning_outcomes']) ? json_decode($this->attributes['learning_outcomes']) : null;
    }
}

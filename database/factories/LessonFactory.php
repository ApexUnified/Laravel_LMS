<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lesson>
 */
class LessonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->title(),
            'slug' => fake()->slug(),
            'description' => fake()->text(),
            'course_id' => fake()->numberBetween(12, 20),
            'thumbnail' => fake()->imageUrl(),
            'thumbnail_public_id' => fake()->uuid(),
            'video' => fake()->imageUrl(),
            'video_public_id' => fake()->uuid(),
            'video_duration' => fake()->randomFloat(2, 0, 100),
            'is_approved' => true,
            'is_published' => true,

        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
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
            'short_description' => fake()->text(),
            'description' => fake()->text(),
            'thumbnail' => fake()->imageUrl(),
            'thumbnail_public_id' => fake()->uuid(),
            'promo_video' => fake()->imageUrl(),
            'promo_video_public_id' => fake()->uuid(),
            'instructor_id' => 2,
            'category_id' => 1,
            'price' => fake()->randomFloat(2, 0, 100),
            'discount' => fake()->randomFloat(2, 0, 100),
            'level' => fake()->randomElement(['Beginner', 'Intermediate', 'Advanced']),
            'course_language' => fake()->randomElement(['English', 'Hindi', 'Spanish']),
            'is_published' => true,
            'is_approved' => true,
        ];
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('short_description');
            $table->longText('description');
            $table->string('thumbnail');
            $table->string('thumbnail_public_id');
            $table->string('promo_video')->nullable();
            $table->string('promo_video_public_id')->nullable();
            $table->string('promo_video_duration')->nullable();
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('instructor_id')->nullable()->constrained('users')->nullOnDelete()->cascadeOnUpdate();
            $table->decimal('price', 20, 2)->default(0); // 0 will be === Free
            $table->integer('discount')->default(0); // 0 will be === No Discount
            $table->enum('level', ['Beginner', 'Intermediate', 'Advanced']);
            $table->string('course_language'); // eg: English Urdu
            $table->boolean('is_published')->default(false); // show/hide from users
            $table->boolean('is_approved')->default(false); // admin-approved course?
            $table->text('requirements')->nullable(); // e.g. "Basic Laravel knowledge"
            $table->text('learning_outcomes')->nullable(); // e.g. "Build a full-stack app"
            $table->string('meta_title')->nullable(); // SEO
            $table->text('meta_description')->nullable(); // SEO
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};

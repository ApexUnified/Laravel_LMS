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
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->nullable()->constrained('courses')->nullOnDelete()->cascadeOnUpdate();
            $table->string('title');
            $table->string('slug');
            $table->longText('description');
            $table->string('thumbnail');
            $table->string('thumbnail_public_id');
            $table->string('video');
            $table->string('video_public_id');
            $table->string('video_duration');
            $table->json('attachments')->nullable();
            $table->boolean('is_published')->default(false);
            $table->boolean('is_approved')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};

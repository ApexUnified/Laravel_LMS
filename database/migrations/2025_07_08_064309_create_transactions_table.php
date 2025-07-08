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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnUpdate()->nullOnDelete();
            $table->foreignId('course_id')->nullable()->constrained('courses')->cascadeOnUpdate()->nullOnDelete();
            $table->string('course_title');
            $table->string('transaction_id');
            $table->decimal('amount', 20, 2);
            $table->string('currency');
            $table->string('mode');
            $table->string('gateway');
            $table->string('status');
            $table->string('payment_status');
            $table->string('payment_method');
            $table->string('user_name');
            $table->string('user_email');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    protected $fillable =
        [
            'course_id',
            'user_id',
            'course_title',
            'amount',
            'currency',
            'mode',
            'gateway',
            'status',
            'payment_status',
            'payment_method',
            'user_name',
            'user_email',
            'transaction_id',
        ];

    // Relations
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }
}

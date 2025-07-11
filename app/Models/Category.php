<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = ['name'];

    // Relations
    public function courses(): HasMany
    {
        return $this->hasMany(Course::class, 'category_id', 'id');
    }
}

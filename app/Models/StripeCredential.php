<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StripeCredential extends Model
{
    protected $fillable = ['stripe_publishable_key', 'stripe_secret_key'];
}

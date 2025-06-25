<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class GeneralSetting extends Model
{
    protected $fillable = ['app_name', 'contact_email', 'contact_number', 'app_main_logo_dark', 'app_main_logo_light', 'app_favicon'];

    protected static function booted(): void
    {
        static::updated(function () {
            Cache::forget('general_config');
        });

        static::created(function () {
            Cache::forget('general_config');
        });

    }
}

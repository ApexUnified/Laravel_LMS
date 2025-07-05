<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CloudinaryCredential extends Model
{
    protected $fillable = ['cloudinary_cloud_name', 'cloudinary_url', 'cloudinary_api_key', 'cloudinary_api_secret'];
}

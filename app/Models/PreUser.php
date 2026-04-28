<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'lastname',
        'email',
        'birth_day',
        'birth_month',
        'password',
        'confirmation_token',
        'token',
        'role',
        'notify_me',
    ];
}

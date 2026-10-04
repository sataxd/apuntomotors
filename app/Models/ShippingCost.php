<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingCost extends Model
{
    use HasFactory, HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'zone',
        'districts',
        'cost',
        'description',
        'visible',
        'status',
    ];

    protected $casts = [
        'districts' => 'array', 
        'cost' => 'decimal:2',
        'visible' => 'boolean',
        'status' => 'boolean'
    ];
}

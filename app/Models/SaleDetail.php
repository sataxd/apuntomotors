<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleDetail extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'sale_id',
        'item_id',
        'name',
        'color',
        'size',
        'price',
        'quantity',
        'colors',
        'sizes',
    ];

    protected $casts = [
        'colors' => 'array',
        'sizes' => 'array',
    ];


    public function sale()
    {
        return $this->hasOne(Sale::class, 'id', 'sale_id');
    }

    public function item()
    {
        return $this->hasOne(Item::class, 'id', 'item_id');
    }
}

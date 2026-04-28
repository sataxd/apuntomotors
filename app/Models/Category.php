<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'visible',
        'status',
        'image'
    ];
    
    public function subcategories()
    {
        return $this->hasMany(Subcategory::class);
    }

    public function items()
    {
        return $this->hasMany(Item::class, 'category_id'); 
    }
}


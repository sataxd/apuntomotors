<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    use HasFactory, HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'category_id', 
        'name', 
        'slug', 
        'description', 
        'image', 
        'visible', 
        'status'
        ];


    public function category()
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

    // Una subcategoría tiene muchos productos
    public function items()
    {
        return $this->hasMany(Item::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ItemZise extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['item_id', 'name', 'summary', 'height', 'width', 'image'];

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
    // Relación con variantes
    public function variants()
    {
        return $this->hasMany(ItemVariant::class, 'zise_id');
    }
}

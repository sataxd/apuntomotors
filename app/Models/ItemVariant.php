<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ItemVariant extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'item_id',
        'color_id',
        'zise_id',
        'stock',
        'min_stock',
        'sku',
        'price',
        'discount',
        'final_price'
    ];

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
    public function color(): BelongsTo
    {
        return $this->belongsTo(ItemColor::class, 'color_id');
    }
    public function zise(): BelongsTo
    {
        return $this->belongsTo(ItemZise::class, 'zise_id');
    }
}

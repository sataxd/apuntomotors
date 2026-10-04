<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'slug',
        'name',
        'alias',
        'summary',
        'description',
        'price',
        'discount',
        'final_price',
        'discount_percent',
        'banner',
        'image',
        'category_id',
        'subcategory_id',
        'marca_id',
        'is_new',
        'offering',
        'recommended',
        'featured',
        'visible',
        'status',
        'sku',
        'stock',
        'score',
        'min_stock',
        'manual',
        'pack_items',
        'tags',
        'weight',
        'height',
        'capacity',
        'diameter',
        'color',
        'cover'

    ];

    protected $casts = [
        'pack_items' => 'array',
        'tags' => 'array',
    ];
    /*
     
    */

    public function category()
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class);
    }

    public function brand()
    {
        return $this->belongsTo(CoreValue::class, 'marca_id', 'id');
    }

    // Un producto tiene muchos colores
    public function colors()
    {
        return $this->hasMany(ItemColor::class);
    }
    // Un producto tiene muchas tallas
    public function sizes()
    {
        return $this->hasMany(ItemZise::class);
    }

    // Un producto tiene muchas variantes (pivot)
    public function variants()
    {
        return $this->hasMany(ItemVariant::class);
    }
    public function ad()
    {
        return $this->hasOne(Ad::class);
    }

    // Un producto tiene muchas imágenes
    public function images()
    {
        return $this->hasMany(ItemImage::class);
    }

    /**
     * Verifica si el producto es un pack
     */
    public function isPack()
    {
        return !empty($this->pack_items) && is_array($this->pack_items);
    }

    /**
     * Obtiene los productos que componen el pack
     */
    public function getPackItems()
    {
        if (!$this->isPack()) {
            return collect();
        }

        // pack_items ahora contiene objetos con id y name
        // Extraer solo los IDs para la consulta
        $itemIds = collect($this->pack_items)->pluck('id')->toArray();
        return Item::whereIn('id', $itemIds)->get();
    }

    /**
     * Obtiene los nombres de los productos del pack para mostrar
     */
    public function getPackItemsDisplay()
    {
        if (!$this->isPack()) {
            return null;
        }

        // Usar directamente los nombres del array pack_items
        return collect($this->pack_items)->pluck('name')->implode(', ');
    }

    /**
     * Obtiene la imagen específica del color de un producto
     * @param string $colorName - Nombre del color seleccionado
     * @return string - Imagen del color o imagen por defecto del producto
     */
    public function getImageForColor($colorName = null)
    {
        // Si no hay color especificado, usar imagen por defecto
        if (!$colorName) {
            return $this->banner ? $this->banner : $this->image;
        }

        // Buscar el color específico del producto
        $itemColor = $this->colors()->where('name', $colorName)->first();
        
        // Si encontramos el color y tiene imagen, usarla
        if ($itemColor) {
            return $itemColor->banner ? $itemColor->banner : ($itemColor->image ? $itemColor->image : ($this->banner ? $this->banner : $this->image));
        }

        // Fallback: usar imagen por defecto del producto
        return $this->banner ? $this->banner : $this->image;
    }

    protected static function booted()
    {
        static::creating(function ($item) {
            if (empty($item->final_price)) {
                $item->final_price = $item->price;
                if ($item->discount && $item->discount > 0) {
                    $item->discount_percent = 100 - (($item->discount * 100) / $item->price);
                    $item->final_price =  $item->discount;
                }
            }

            if (empty($item->sku)) {
                $item->sku = 'PROD' . strtoupper(substr($item->categoria_id, 0, 3)) . '-' . strtoupper(substr($item->name, 0, 3)) . '-' . uniqid();
            }
        });
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\CoreValue;
use App\Models\General;
use App\Models\Item;
use App\Models\Subcategory;
use App\Models\Testimony;
use Illuminate\Http\Request;

class HospitalarioController extends BasicController
{
    public $reactView = 'Hospitalario';
    public $reactRootView = 'public';

  public function setReactViewProperties(Request $request)
    {
        $generals = General::all();
        $categoryId = 'a10c346b-8605-4060-9ded-0e9094ff9721';
        $brands = CoreValue::where('status', true)->where('visible', true)->get();
        $dataAbout = Aboutus::all();
        $dataGeneral = General::all();
        $items = Item::with(['images', 'subcategory', 'brand'])
            ->where('category_id', $categoryId)
            ->where('visible', true)
            ->get();

        $usedSubcategoryIds = $items->pluck('subcategory_id')->filter()->unique();

        $validSubcategories = Subcategory::where('category_id', $categoryId)
            ->where('visible', true)
            ->whereIn('id', $usedSubcategoryIds)
            ->get();
        

        // 3. Extraer Nombres de etiquetas (tags) que SÍ están en los productos
        $usedTags = collect();

        foreach($items as $item) {
            if(is_array($item->tags)) {
                foreach($item->tags as $tag) {
                    $usedTags->push($tag);
                }
            }
        }

        $validTags = Testimony::where('visible', true)
            ->whereIn('name', $usedTags->unique())
            ->get();

        // 4. Agrupar los Items por Marca (brand)
        $groupedItems = $items->groupBy('marca_id');
        $brandsData = [];

        foreach ($groupedItems as $marcaId => $brandItems) {
            $brand = $brandItems->first()->brand; 
            // Si el producto no tiene marca, lo llamamos "Otros Modelos"
            $brandName = $brand ? $brand->name : 'Otros Modelos';
            
            $brandsData[] = [
                'id' => $marcaId ?: 'otros',
                'name' => $brandName,
                'image' => $brand ? $brand->image : null,
                'items' => $brandItems->values() // Los items de esta marca
            ];
        }
            
        return [
            'generals' => $generals,
            'brandsData' => $brandsData, // Array de marcas con sus respectivos items
            'globalSubcategories' => $validSubcategories,
            'globalTags' => $validTags,
            'brands' => $brands,
            'dataAbout' => $dataAbout,
            'dataGeneral' => $dataGeneral,
        ];
    }
}

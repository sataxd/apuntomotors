<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\Ad;
use App\Models\Category;
use App\Models\Indicator;
use App\Models\Item;
use App\Models\Post;
use App\Models\Slider;
use App\Models\Supply;
use App\Models\Testimony;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CatalogController extends BasicController
{
    public $reactView = 'CatalogProducts';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $category_slug = $request->route('category_slug');
        $subcategory_slug = $request->route('subcategory_slug');

        $initialCategory = null;
        $initialSubcategory = null;
        
        // 2. Buscamos el nombre real de la categoría si existe el slug
        if ($category_slug) {
            $category = Category::where('slug', $category_slug)->first();
            if ($category) {
                $initialCategory = $category->name;
            }
        }

        // 3. Buscamos el nombre real de la subcategoría si existe el slug
        if ($subcategory_slug) {
            $subcategory = \App\Models\Subcategory::where('slug', $subcategory_slug)->first();
            if ($subcategory) {
                $initialSubcategory = $subcategory->name;
            }
        }

        $anuncio = Ad::where('status', true)
            ->where('visible', true)
            ->where('invasivo', true)
            ->where(function ($query) {
                $query->whereNull('date_begin')
                    ->whereNull('date_end')
                    ->orWhere(function ($query) {
                        $query->where('date_begin', '<=', Carbon::now())
                            ->where('date_end', '>=', Carbon::now());
                    });
            })->orderBy('updated_at', 'desc')
            ->first();

        $items = Item::where('status', true)
            ->where('visible', true)
            ->whereNotNull('category_id') // Evita productos sin categoría
            ->with([
                'colors',
                'sizes',
                'images',
                'category',
                'subcategory',
                'ad',
                'variants' => function ($q) {
                    $q->where('stock', '>', 0)->with(['color', 'zise']);
                }
            ]) // <-- ¡Faltaba cerrar el paréntesis aquí!
            ->get();
        
        // $categories = Category::all();
        $categories = Category::whereHas('items')
        ->with(['subcategories' => function ($query) {
            // Traer solo las subcategorías que también tengan productos
            $query->whereHas('items'); 
        }])
        ->get();

        return [
            'items' => $items,
            'anuncio' => $anuncio,
            'categories' => $categories,
            'initialCategory' => $initialCategory,
            'initialSubcategory' => $initialSubcategory,
        ];
    }
}

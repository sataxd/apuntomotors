<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\Ad;
use App\Models\Indicator;
use App\Models\Item;
use App\Models\Post;
use App\Models\Slider;
use App\Models\Supply;
use App\Models\Testimony;
use Illuminate\Http\Request;

class DetailController extends BasicController
{
    public $reactView = 'DetailProduct';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        //get detail item with $request->spl_autoload_unregister
        $slug = $request->route('slug');

        $item = Item::where('slug', $slug)->with([
            'colors',
            'sizes',
            'images',
            'category',
            'subcategory',
            'ad',
            'variants' => function ($q) {
                $q->where('stock', '>', 0)->with(['color', 'zise']);
            }
        ])->firstOrFail();

        $urlCategorySlug = $request->route('category_slug');
        $urlSubcategorySlug = $request->route('subcategory_slug');

        $realCategorySlug = $item->category ? $item->category->slug : null;
        $realSubcategorySlug = $item->subcategory ? $item->subcategory->slug : null;


        if ($urlCategorySlug !== $realCategorySlug || $urlSubcategorySlug !== $realSubcategorySlug) {
            // Si no coinciden, forzamos una redirección permanente (301) a la URL correcta.
            // ¡Esto salva tu SEO!
            if ($realSubcategorySlug) {
                return redirect("/producto/{$realCategorySlug}/{$realSubcategorySlug}/{$item->slug}", 301);
            }

            return redirect("/producto/{$realCategorySlug}/{$item->slug}", 301);
        }

        // Si el item tiene un ad y ese ad tiene offer_item_id, traemos el producto de oferta
        if ($item && $item->ad && $item->ad->offer_item_id) {
            $offerItem = Item::with([
                'colors',
                'sizes',
                'images',
                'variants' => function ($q) {
                    $q->where('stock', '>', 0)->with(['color', 'zise']);
                }
            ])->find($item->ad->offer_item_id);
            // Adjuntamos el producto de oferta al ad
            $item->ad->offer_item = $offerItem;
        }

        $products_featured = Item::where('status', true)->where('visible', true)->where('featured', true)->with(['colors', 'sizes'])->orderBy('updated_at', 'DESC')->limit(12)->get();
        
        $original_count = count($products_featured);

        if ($original_count > 0 && $original_count < 4) {
        // if (count($products_featured) < 4) {
            // $original_count = count($products_featured);
            $needed = 4 - $original_count;

            for ($i = 0; $i < $needed; $i++) {
                // Duplicar elementos existentes (usando el índice original)
                $products_featured->push($products_featured[$i % $original_count]);
            }
        }
        return [
            'item' => $item,
            'products_featured' => $products_featured,
        ];
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Http\Classes\dxResponse;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;

class SubcategoryController extends BasicController
{
    public $model = Subcategory::class;
    public $reactView = 'Admin/Subcategories';
    public $prefix4filter = 'subcategories';

    public function setReactViewProperties(Request $request)
    {
        $categories = Category::all();

        return [
            'categories' => $categories,
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $model::select(['subcategories.*'])
            ->with(['category'])
            ->leftJoin('categories AS category', 'category.id', '=', 'subcategories.category_id');
            
    }
  
}

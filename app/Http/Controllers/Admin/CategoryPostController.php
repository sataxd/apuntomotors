<?php

namespace App\Http\Controllers\Admin;

use App\Models\CategoryPost;
use App\Http\Controllers\BasicController;

class CategoryPostController extends BasicController
{
    public $model = CategoryPost::class;
    public $reactView = 'Admin/CategoriesPost';
    public $imageFields = ['image'];
}

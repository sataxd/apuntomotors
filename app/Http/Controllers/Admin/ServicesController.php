<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Services;
use Illuminate\Http\Request;

class ServicesController extends BasicController
{
    public $model = Services::class;
    public $reactView = 'Admin/Services';
    public $imageFields = ['image'];

    public function setReactViewProperties(Request $request)
    {
        return [];
    }
}

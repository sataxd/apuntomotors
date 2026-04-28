<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Aboutus;
use Illuminate\Http\Request;

class AboutusController extends BasicController
{
    public $model = Aboutus::class;
    public $reactView = 'Admin/About';
    public $imageFields = ['image','icon'];

    public function setReactViewProperties(Request $request)
    {
        return [];
    }
}

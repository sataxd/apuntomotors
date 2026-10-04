<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Formula;
use Illuminate\Http\Request;

class FormulaController extends BasicController
{
    public $model = Formula::class;
    public $reactView = 'Admin/Formula';


    public function setPaginationInstance(string $model)
    {
        return $model::with('supplies');
    }
}

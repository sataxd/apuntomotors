<?php

namespace App\Http\Controllers;

use App\Models\Supply;
use App\Http\Requests\StoreSupplyRequest;
use App\Http\Requests\UpdateSupplyRequest;
use Illuminate\Http\Request;

class SupplyController extends BasicController
{
    public $model = Supply::class;
    public $reactView = 'Supplies';
    public $reactRootView = 'public';
    public $throwMediaError = true;

    public function setReactViewProperties(Request $request)
    {
        $supplies = Supply::where('visible', true)->where('status', true)->get();
        return [
            'supplies' => $supplies
        ];
    }
}

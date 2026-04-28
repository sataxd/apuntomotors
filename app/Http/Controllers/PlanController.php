<?php

namespace App\Http\Controllers;

use App\Models\Renewal;
use Illuminate\Http\Request;

class PlanController extends BasicController
{
    public $reactView = 'Plans';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $renewals = Renewal::today()
            ->select(['name', 'percentage'])
            ->where('status', true)
            ->where('visible', true)
            ->get();
        return [
            'renewals' => $renewals
        ];
    }
}

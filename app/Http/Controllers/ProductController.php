<?php

namespace App\Http\Controllers;

use App\Models\UserFormulas;
use Illuminate\Http\Request;

class ProductController extends BasicController
{
    public $reactView = 'Products';
    public $reactRootView = 'public';

    function setReactViewProperties(Request $request)
    {
        $userFormulaJpa = UserFormulas::find($request->formula);

        if (!$userFormulaJpa) return redirect()->route('Home.jsx');

        return [
            'user_formula' => $userFormulaJpa
        ];
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\General;
use Illuminate\Http\Request;

class TermsController extends BasicController
{
    public $reactView = 'Terms';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $general = General::where('correlative', 'terms_conditions')->first();
       
        return [
            'general' => $general ?? (object)[],
        ];
    }
}

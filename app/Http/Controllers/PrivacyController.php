<?php

namespace App\Http\Controllers;

use App\Models\General;
use Illuminate\Http\Request;

class PrivacyController extends BasicController
{
    public $reactView = 'Privacy';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $general = General::where('correlative', 'privacy_policy')->first();
       
        return [
            'general' => $general ?? (object)[],
        ];
    }
}

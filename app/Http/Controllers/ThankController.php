<?php

namespace App\Http\Controllers;

use App\Jobs\SendSaleWhatsApp;
use App\Models\Sale;
use Illuminate\Http\Request;

class ThankController extends BasicController
{
    public $reactView = 'Thanks';
    public $reactRootView = 'public';
}

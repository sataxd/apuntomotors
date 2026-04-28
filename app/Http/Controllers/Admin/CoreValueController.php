<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\CoreValue;
use App\Models\Strength;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CoreValueController extends BasicController
{
    public $model = CoreValue::class;
    public $reactView = 'Admin/core_values';
    public $imageFields = ['image'];
}

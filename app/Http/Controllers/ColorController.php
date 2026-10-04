<?php

namespace App\Http\Controllers;

use App\Models\Color;

class ColorController extends BasicController
{

    public $throwMediaError = true;
    public $model = Color::class;
}

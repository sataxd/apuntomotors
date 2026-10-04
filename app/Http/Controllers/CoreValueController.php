<?php

namespace App\Http\Controllers;

use App\Models\Strength;
use App\Http\Requests\StoreStrengthRequest;
use App\Http\Requests\UpdateStrengthRequest;
use App\Models\CoreValue;

class CoreValueController extends BasicController
{
    public $throwMediaError = true;
    public $model = CoreValue::class;
}

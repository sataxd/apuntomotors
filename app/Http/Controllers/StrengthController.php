<?php

namespace App\Http\Controllers;

use App\Models\Strength;
use App\Http\Requests\StoreStrengthRequest;
use App\Http\Requests\UpdateStrengthRequest;

class StrengthController extends BasicController
{
    public $throwMediaError = true;
    public $model = Strength::class;
}

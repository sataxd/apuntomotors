<?php

namespace App\Http\Controllers;

use App\Models\Fragrance;
use App\Http\Requests\StoreFragranceRequest;
use App\Http\Requests\UpdateFragranceRequest;

class FragranceController extends BasicController
{
    public $model = Fragrance::class;
}

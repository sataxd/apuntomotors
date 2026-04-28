<?php

namespace App\Http\Controllers;

use App\Models\Color;
use App\Models\InstagramPost;

class InstagramPostsController extends BasicController
{

    public $throwMediaError = true;
    public $model = InstagramPost::class;
}

<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response as HttpResponse;
use App\Http\Controllers\BasicController;
use App\Models\InstagramPost;
use App\Models\Testimony;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\File;
use SoDe\Extend\JSON;
use SoDe\Extend\Response;

class InstagramPostController extends BasicController
{
    public $model = InstagramPost::class;
    public $reactView = 'Admin/InstagramPosts';
    public $imageFields = ['image'];
}

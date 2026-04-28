<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends BasicController
{
    public $model = User::class;
    public $reactView = 'Users';
    public $ignoreStatusFilter = true;

    public function setPaginationInstance(string $model)
    {
        return $model::withCount(['sales' => function ($query) {
            $query->where('status_id', 'bc012ef5-96e8-4bbb-867b-061c4090d9d2');
        }])
            ->where('email', '<>', 'admin@mundoweb.pe');
    }
}

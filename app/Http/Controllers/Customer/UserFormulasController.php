<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\UserFormulas;
use Illuminate\Http\Request;

class UserFormulasController extends BasicController
{
    public $model = UserFormulas::class;

    public function afterSave(Request $request, object $jpa, bool $isNew)
    {
        return $jpa;
    }
}

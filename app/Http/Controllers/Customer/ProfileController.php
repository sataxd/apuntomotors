<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory as RoutingResponseFactory;
use SoDe\Extend\Response;
use Illuminate\Support\Facades\Auth;

class ProfileController extends BasicController
{
    public function save(Request $request): HttpResponse|RoutingResponseFactory
    {
        $response = new Response();
        try {

            $body = $request->all();

            $jpa = User::find(Auth::user()->id);
            $jpa->update($body);

            $response->status = 200;
            $response->message = 'Operacion correcta';
        } catch (\Throwable $th) {
            $response->status = 400;
            $response->message = $th->getMessage();
        } finally {
            return response(
                $response->toArray(),
                $response->status
            );
        }
    }
}

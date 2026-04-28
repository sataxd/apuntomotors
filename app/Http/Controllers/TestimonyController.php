<?php

namespace App\Http\Controllers;

use App\Models\Testimony;
use App\Http\Requests\StoreTestimonyRequest;
use App\Http\Requests\UpdateTestimonyRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;
use SoDe\Extend\Response;

class TestimonyController extends Controller
{
    public function getTestimonies(Request $request): HttpResponse|ResponseFactory
    {
        $response = new Response();
        try {
            $data = Testimony::all();
            //dump($data);
            $response->data = $data;
            $response->status = 200;
            $response->message = 'Operacion correcta';
        } catch (\Throwable $th) {
            // dump($th->getMessage());
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

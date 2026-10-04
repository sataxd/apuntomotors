<?php

namespace App\Http\Controllers;


use App\Http\Classes\dxResponse;
use App\Models\Aboutus;
use App\Models\Category;
use App\Models\dxDataGrid;
use App\Models\General;
use App\Models\Indicator;
use App\Models\Slider;
use App\Models\Social;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use SoDe\Extend\Crypto;
use SoDe\Extend\Response;
use SoDe\Extend\Text;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;


class GeneralController extends BasicController
{


    public function getSocials(Request $request): HttpResponse|ResponseFactory
    {
        $response = new Response();
        try {
            $data = Social::where('status',true)->where('visible',true)->get();
            $response->data = $data;
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

    public function getBenefits(Request $request): HttpResponse|ResponseFactory
    {
        $response = new Response();
        try {
            $data = Indicator::all();

            $response->data = $data;
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


    public function getAboutuses(Request $request): HttpResponse|ResponseFactory
    {
        $response = new Response();
        try {
            $data = Aboutus::all();
            $data2 = General::all();
            // dump($data);
            $response->data = ['aboutus' => $data, 'generals' => $data2];
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


    public function getSession(Request $request): HttpResponse|ResponseFactory
    {
        $response = new Response();
        try {
            // Verifica si hay sesión y devuelve al usuario, sino devuelve null
            $response->data = Auth::check() ? Auth::user() : null; 
            $response->status = 200;
            $response->message = 'Operación correcta';
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

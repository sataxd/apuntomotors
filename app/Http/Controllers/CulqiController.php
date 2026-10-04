<?php

namespace App\Http\Controllers;

use App\Jobs\SendSaleEmail;
use App\Jobs\SendSaleWhatsApp;
use App\Models\CulqiCharge;
use App\Models\CulqiSubscription;
use App\Models\Sale;
use App\Models\User;
use Culqi\Culqi;
use Error;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SoDe\Extend\Crypto;
use SoDe\Extend\Fetch;
use SoDe\Extend\JSON;
use SoDe\Extend\Math;
use SoDe\Extend\Response;
use Illuminate\Support\Str;
use SoDe\Extend\Text;

class CulqiController extends Controller
{
  private $culqi = null;
  private $url = null;

  public function __construct()
  {
    $this->culqi = new Culqi(['api_key' => env('CULQI_PRIVATE_KEY')]);
    $this->url = env('CULQI_API');
  }

  public function order(Request $request)
  {
    $response = Response::simpleTryCatch(function () use ($request) {

      [$status, $sale] = SaleController::create($request->sale, $request->details);
      
      if (!$status) throw new Exception($sale['error']);

      // Obtenemos variables como propiedades del objeto
      $amount = $sale->amount;
      if ($sale->delivery) $amount += $sale->delivery;
      if ($sale->coupon_discount) $amount -= $sale->coupon_discount;

      $cleanPhone = preg_replace('/\D/', '', $sale->phone);
      $city = $sale->district ?? $sale->province ?? 'Lima';

      $config = [
        "amount" => Math::ceil(($amount * 100)),
        "currency_code" => 'PEN',
        "description" => "Compra en " . env('APP_NAME'),
        "order_number" => '#' . env('APP_CORRELATIVE') . '-' . $sale->code,
        "client_details" => array(
          "first_name" =>  $sale->name,
          "last_name" => $sale->lastname,
          "email" => $sale->email,
          "phone_number" => $cleanPhone,
        ),
        "antifraud_details" => [
            "address" => $sale->address ?? 'Recojo en tienda',
            "address_city" => $city, 
            "country_code" => "PE",
            "first_name" => $sale->name,
            "last_name" => $sale->lastname,
            "phone_number" => $cleanPhone,
        ],
        "expiration_date" => time() + (24 * 60 * 60),
        "confirm" => false
      ];

      $order = $this->culqi->Orders->create($config);

      if (gettype($order) == 'string') {
          $res = json_decode((string) $order, true);
          Sale::where('id', $sale->id)->delete();
          $errorMessage = $res['user_message'] ?? $res['merchant_message'] ?? $order;
          throw new Exception($errorMessage);
      }

      return \array_merge((array) $order, [
        'amount' => Math::ceil($amount, 2),
        'delivery' => $sale->delivery,
      ]);
    });

    return response($response->toArray(), $response->status);
  }

  public function token(Request $request)
  {
    $order_number = \str_replace('#' . env('APP_CORRELATIVE') . '-', '', $request->order);
    $sale = Sale::where('code', $order_number)->first();

    $response = Response::simpleTryCatch(function () use ($request, $sale) {
      $this->createCharge($request->token, $sale);
      $sale->status_id = '312f9a91-d3f2-4672-a6bf-678967616cac';
      $sale->save();
    }, function () use ($sale) {
      $sale->update(['status_id' => 'd3a77651-15df-4fdc-a3db-91d6a8f4247c']);
    });
    return response($response->toArray(), $response->status);
  }

  private function createCharge($token, $sale): void
  {
    $amount = $sale->amount;
    if ($sale->delivery) $amount += $sale->delivery;
    if ($sale->coupon_discount) $amount -= $sale->coupon_discount;

    $config = [
      "amount" => Math::ceil(($amount * 100)),
      "capture" => true,
      "currency_code" => "PEN",
      "order_number" => '#' . env('APP_CORRELATIVE') . '-' . $sale->code,
      "description" => "Compra en " . env('APP_NAME'),
      "email" => $token['email'] ?? $sale->email,
      "installments" => 0,
      "antifraud_details" => [
        "address" => $sale->address ?? 'Recojo en tienda',
        "address_city" => $sale->district ?? $sale->province ?? 'Lima',
        "country_code" => "PE",
        "first_name" => $sale->name,
        "last_name" => $sale->lastname,
        "phone_number" => preg_replace('/\D/', '', $sale->phone),
      ],
      "source_id" => $token['id']
    ];

    $charge = $this->culqi->Charges->create($config);

    if (gettype($charge) == 'string') {
      $res = JSON::parse((string) $charge);
      throw new Exception($res['user_message']);
    }
  }

  // ... (El resto de tus métodos como createClient, webhook, processOrder se mantienen exactamente igual)
  
  private function createClient(): string
  {
    $user = Auth::user();

    $resGet = new Fetch($this->url . '/customers?email=' . $user->email, [
      'headers' => ['Authorization' => 'Bearer ' . \env('CULQI_PRIVATE_KEY')]
    ]);

    if (!$resGet->ok) throw new Exception('Ocurrio un error al consultar clientes en Culqi');

    $dataGet = $resGet->json();

    if (count($dataGet['data']) > 0) {
      $cq_cus_id = $dataGet['data'][0]['id'];
      User::where('id', $user->id)->update(['cq_cus_id' => $cq_cus_id]);
      return $cq_cus_id;
    }

    $res = new Fetch($this->url . '/customers', [
      'method' => 'POST',
      'headers' => [
        'Content-Type' => 'application/json',
        'Authorization' => 'Bearer ' . \env('CULQI_PRIVATE_KEY')
      ],
      'body' => [
        "first_name" => $user->name,
        "last_name" => $user->lastname,
        "email" => $user->email,
        "address" => $user->address . ' ' . $user->address_number,
        "address_city" => $user->district ?? $user->province,
        "country_code" => "PE",
        "phone_number" => $user->phone
      ]
    ]);

    if (!$res->ok) throw new Exception('Ocurrio un error al crear el cliente en Culqi');
    $data = $res->json();
    User::where('id', $user->id)
      ->update(['cq_cus_id' => $data['id']]);
    return $data['id'];
  }

  private function createCard($cq_cus_id, $token): string
  {
    $res = new Fetch($this->url . '/cards', [
      'method' => 'POST',
      'headers' => [
        'Content-Type' => 'application/json',
        'Authorization' => 'Bearer ' . \env('CULQI_PRIVATE_KEY')
      ],
      'body' => [
        "customer_id" => $cq_cus_id,
        "token_id" => $token,
        "validate" => true,
        "metadata" => [
          "marca_tarjeta" => "VISA"
        ]
      ]
    ]);
    if (!$res->ok) throw new Exception('Ocurrio un error al crear la tarjeta en Culqi');
    $data = $res->json();
    return $data['id'];
  }

  public function webhook(Request $request)
  {
    $response = Response::simpleTryCatch(function () use ($request) {
      $data = JSON::parse($request->data);
      switch ($request->type) {
        case 'subscription.charge.succeeded':
          return $this->processSubscriptionCharge($request, $data);
          break;
        default:
          return $this->processOrder($request, $data);
          break;
      }
    });

    return response($response->toArray(), $response->status);
  }

  public function processSubscriptionCharge(Request $request, array $data)
  {
    $culqiSubscription = CulqiSubscription::where('cq_sxn_id', $data['subsId'])->first();

    if (!$culqiSubscription) throw new Exception('Esta subscripcion no esta registrada en ' . env('APP_NAME'));

    $cChrRes = new Fetch($this->url . '/charges/' . $data['chargeId'], [
      'headers' => [
        'Authorization' => 'Bearer ' . \env('CULQI_PRIVATE_KEY')
      ]
    ]);

    if (!$cChrRes->ok) throw new Exception('El cargo que intentas procesar no existe en Culqi');

    $chargeExists = CulqiCharge::where('culqi_id', $data['chargeId'])->exists();

    if ($chargeExists) return;

    $sale = Sale::with(['details'])->find($culqiSubscription->sale_id);

    if (!$sale) throw new Exception('La venta asociada a la suscripción no existe.');

    if (!$culqiSubscription->already_paid) {
      $sale->update(['status_id' => '312f9a91-d3f2-4672-a6bf-678967616cac']);
      $culqiSubscription->update(['already_paid' => true]);

    } else {
      $cChrData = $cChrRes->json();

      $chargeJpa = new CulqiCharge();
      $chargeJpa->culqi_id = $data['chargeId'];
      $chargeJpa->amount = $cChrData['amount'] / 100;
      $chargeJpa->culqi_subscription_id = $culqiSubscription->id;
      $chargeJpa->save();

      $chargesCount = CulqiCharge::where('culqi_subscription_id', $culqiSubscription->id)
        ->whereNull('sale_id')
        ->count();

      if ($chargesCount < $culqiSubscription->total_payments) return;

      $newSale = $sale->replicate();
      $newSale->status_id = '312f9a91-d3f2-4672-a6bf-678967616cac';
      $newSale->coupon_id = null;
      $newSale->coupon_discount = 0;
      $newSale->save();

      CulqiCharge::where('culqi_subscription_id', $culqiSubscription->id)
        ->whereNull('sale_id')
        ->update(['sale_id' => $newSale->id]);

      $sale->details->each(function ($detail) use ($newSale) {
        $newSale->details()->create($detail->toArray());
      });
    }
  }

  public function processOrder(Request $request, array $data)
  {
    $res = new Fetch($this->url . '/orders/' . $data['id'], [
      'headers' => [
        'Authorization' => 'Bearer ' . \env('CULQI_PRIVATE_KEY')
      ]
    ]);

    if (!$res->ok) throw new Exception("Ocurrio un error al verificar la orden de pago");

    $data = $res->json();

    $code = str_replace('#' . env('APP_CORRELATIVE') . '-', '', $data['order_number']);

    if ($data['state'] == 'expired') {
      Sale::where('code', $code)
        ->where('status_id', 'f13fa605-72dd-4729-beaa-ee14c9bbc47b')
        ->update(['status_id' => 'd3a77651-15df-4fdc-a3db-91d6a8f4247c']);
      return;
    }

    if ($data['state'] != 'paid') return;

    $sale = Sale::where('code', $code)->first();
    $sale->status_id = '312f9a91-d3f2-4672-a6bf-678967616cac';
    $sale->save();
  }
}
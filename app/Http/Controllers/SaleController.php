<?php

namespace App\Http\Controllers;

use App\Jobs\SendSaleEmail;
use Illuminate\Support\Facades\Log;
use App\Jobs\SendSaleWhatsApp;
use App\Models\Sale;
use App\Models\Bundle;
use App\Models\Item;
use App\Models\Renewal;
use App\Models\SaleDetail;
use App\Models\StatisticSale;
use App\Models\User;
use App\Models\Department; // <-- NUEVO
use App\Models\Province;   // <-- NUEVO
use App\Models\District;   // <-- NUEVO
use App\Models\General;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SoDe\Extend\Trace;
use SoDe\Extend\Array2;
use SoDe\Extend\Response;

class SaleController extends Controller
{
    static function create(array $sale, array $details): array
    {
        Log::info('Detalles recibidos en create:', ['sale' => $sale, 'details' => $details]);

        try {
            $productIds = array_map(fn($item) => $item['id'], $details);
            $itemsJpa = Item::whereIn('id', $productIds)->get();

            $saleDetails = [];
            $totalPrice = 0;
            $totalItems = 0;

            foreach ($details as $detail) {
                $itemJpa = $itemsJpa->firstWhere('id', $detail['id']);
                if (!$itemJpa) continue;

                $color = $detail['selectedColor'] ?? $detail['color'] ?? null;
                $size = $detail['selectedSize'] ?? $detail['size'] ?? null;

                $priceToUse = $detail['final_price'] ?? $detail['price'] ?? ($itemJpa->discount != 0 ? $itemJpa->discount : $itemJpa->price);

               $saleDetails[] = [
                    'item_id' => $itemJpa->id,
                    'name' => $itemJpa->name,
                    'price' => $priceToUse, 
                    'quantity' => $detail['quantity'] ?? 1,
                    'color' => $color,
                    'size' => $size
                ];

                $totalPrice += $priceToUse * ($detail['quantity'] ?? 1);
                $totalItems += ($detail['quantity'] ?? 1);
            }

            $saleJpa = new Sale();
            $saleJpa->code = Trace::getId();
            $saleJpa->user_id = Auth::check() ? Auth::user()->id : null;
            $saleJpa->name = $sale['name'];
            $saleJpa->dni = $sale['dni'] ?? null;
            $saleJpa->lastname = $sale['lastname'];
            $saleJpa->email = $sale['email'];
            $saleJpa->phone = $sale['phone'];
            $saleJpa->status_id = 'f13fa605-72dd-4729-beaa-ee14c9bbc47b';

            // --- LÓGICA DE UBIGEO (Traduciendo IDs a Nombres) ---
            $dep = isset($sale['department_id']) && $sale['department_id'] ? Department::find($sale['department_id']) : null;
            $prov = isset($sale['province_id']) && $sale['province_id'] ? Province::find($sale['province_id']) : null;
            $dist = isset($sale['district_id']) && $sale['district_id'] ? District::find($sale['district_id']) : null;

            $saleJpa->country = $sale['country'] ?? 'Perú';
            $saleJpa->department = $dep ? $dep->description : ($sale['department'] ?? 'Lima');
            $saleJpa->province = $prov ? $prov->description : ($sale['province'] ?? 'Lima');
            $saleJpa->district = $dist ? $dist->description : ($sale['district'] ?? 'Lima');
            
            // === NUEVO: Lógica de Método de Envío y Dirección ===
            $saleJpa->method_shipping = $sale['method_shipping'] ?? 'delivery';


            if ($saleJpa->method_shipping === 'pickup') {
                // Lógica de Recojo en Tienda
                // Intentamos buscar la dirección en una tabla de configuración (ej: General),
                
                $direccion = General::where('correlative', 'address')->first();
                $distrito = General::where('correlative', 'district')->first();
                $provincia = General::where('correlative', 'province')->first();
               
                
                if ($direccion && $direccion->description) {
                    $storeAddress = $direccion->description;
                }

                if ($distrito && $distrito->description) {
                    $storeDistrict = $distrito->description;
                }

                if ($provincia && $provincia->description) {
                    $storeProvince = $provincia->description;
                }

                $saleJpa->address = $storeAddress ?? 'Consultar dirección al interno';
                $saleJpa->number = 'S/N';
                $saleJpa->reference = 'Recojo presencial en tienda';
                $saleJpa->zip_code = null;
                $saleJpa->department = 'Lima';
                $saleJpa->province = $storeProvince ?? 'Lima';
                $saleJpa->district = $storeDistrict ?? 'Lima';

            } else {
                // Lógica normal de Delivery
                // Usamos "?? 'Sin definir'" por si acaso tu DB tiene los otros campos como NOT NULL
                $saleJpa->address = $sale['address'] ?? 'Sin dirección';
                $saleJpa->number = $sale['number'] ?? 'S/N';
                $saleJpa->reference = $sale['reference'] ?? null;
                $saleJpa->zip_code = $sale['zip_code'] ?? null;
            }

            if (Auth::check()) {
                $userJpa = User::find(Auth::user()->id);
                $userJpa->phone = $sale['phone'];
                $userJpa->dni = $sale['dni'] ?? null;
                $userJpa->country = $saleJpa->country;
                $userJpa->department = $saleJpa->department;
                $userJpa->province = $saleJpa->province;
                $userJpa->district = $saleJpa->district;
                $userJpa->zip_code = $saleJpa->zip_code;
                $userJpa->address = $saleJpa->address;
                $userJpa->address_number = $saleJpa->number;
                $userJpa->address_reference = $saleJpa->reference;
                $userJpa->save();
            }

            if (isset($sale['coupon']) && $sale['coupon']) {
                [$couponStatus, $couponJpa] = CouponController::verify(
                    $sale['coupon'],
                    $totalPrice,
                    $sale['email']
                );

                if (!$couponStatus) throw new Exception($couponJpa);
                $saleJpa->coupon_id = $couponJpa->id;

                if ($couponJpa->type == 'percentage') {
                    $saleJpa->coupon_discount = $totalPrice * ($couponJpa->amount / 100);
                } else {
                    $saleJpa->coupon_discount = $couponJpa->amount;
                }
            }

            $saleJpa->amount = $totalPrice;
            // AHORA GUARDAMOS EL COSTO DE ENVÍO QUE ENVÍA REACT
            $saleJpa->delivery = $sale['shipping_cost'] ?? 0; 
            $saleJpa->save();

            foreach ($saleDetails as $detail) {
                $detailJpa = new SaleDetail();
                $detailJpa->sale_id = $saleJpa->id;
                $detailJpa->item_id = $detail['item_id'];
                $detailJpa->name = $detail['name'];
                $detailJpa->price = $detail['price'];
                $detailJpa->quantity = $detail['quantity'];
                $detailJpa->color = $detail['color'];
                $detailJpa->size = $detail['size'];
                $detailJpa->save();
                
                if ($detailJpa->color || $detailJpa->size) {
                    $variant = \App\Models\ItemVariant::where('item_id', $detailJpa->item_id)
                        ->whereHas('color', function ($q) use ($detailJpa) {
                            if ($detailJpa->color) $q->where('name', $detailJpa->color);
                        })
                        ->whereHas('zise', function ($q) use ($detailJpa) { 
                            if ($detailJpa->size) $q->where('name', $detailJpa->size);
                        })
                        ->first();

                    if ($variant) {
                        $variant->decrement('stock', $detailJpa->quantity);
                    } else {
                        $item = \App\Models\Item::find($detailJpa->item_id);
                        if ($item) $item->decrement('stock', $detailJpa->quantity);
                    }
                    
                } else {
                    $item = \App\Models\Item::find($detailJpa->item_id);
                    if ($item) {
                        $item->decrement('stock', $detailJpa->quantity);
                    }
                }
            }

            $statId = session()->get('website_statistic_id');
            if ($statId) {
                StatisticSale::create([
                    'website_statistic_id' => $statId,
                    'sale_id' => $saleJpa->id,
                ]);
            }

            $saleToReturn = Sale::with(['details'])->find($saleJpa->id);

            return [true, $saleToReturn];
        } catch (\Throwable $th) {
            Log::error('Error en SaleController::create', [
                'error' => $th->getMessage(),
                'line' => $th->getLine(),
                'file' => $th->getFile()
            ]);
            return [false, [
                'error' => 'Error validando datos: ' . $th->getMessage(),
            ]];
        }
    }

    public function notify(Request $request, $code)
    {
        $response = Response::simpleTryCatch(function () use ($code) {
            $sale = Sale::where('code', $code)->first();
            if (!$sale) throw new Exception('No existe la venta con el código: ' . $code);
            Log::info('Notificando por WhatsApp. Sale ID: ' . $sale->id . ', Código: ' . $code);
        });
        Log::info('Respuesta de notify:', $response->toArray());
        return response($response->toArray(), $response->status);
    }


    // NUEVO: Método para procesar el checkout por transferencia
    public function transferCheckout(Request $request)
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            
            // Reutilizamos tu lógica de creación
            [$status, $sale] = self::create($request->sale, $request->details);
            
            if (!$status) throw new Exception($sale['error']);

            // Opcional: Si tienes un estado específico para "Pendiente de Transferencia", puedes asignarlo aquí.
            // Actualmente se guarda con el estado por defecto que pusiste en create()

            return $sale;
        });

        return response($response->toArray(), $response->status);
    }
}
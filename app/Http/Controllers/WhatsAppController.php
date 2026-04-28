<?php

namespace App\Http\Controllers;

use App\Models\Formula;
use App\Models\Sale;
use Illuminate\Support\Facades\View;
use SoDe\Extend\Fetch;
use SoDe\Extend\Text;

class WhatsAppController extends Controller
{
    static function sendSale(Sale $sale, bool $send2client = true, bool $send2group = true)
    {
        try {
            $jpa  = Sale::with([
                'status',
                'details',
                'details.item',
                'coupon'
            ])->find($sale->id);

            $data =  [
                'sale' => $jpa
            ];
            $content = View::make('mailing.sale-done-wefem', $data)->render();
            $onlyName = \explode(' ', $sale->name)[0];

            // Construir lista de productos
            $productos = '';
            foreach ($jpa->details as $detail) {
                // Verificar si el producto es un pack
                if ($detail->item && $detail->item->isPack()) {
                    // Es un pack, mostrar solo los productos que lo componen sin mencionar "PACK"
                    
                    // Usar pack_items directamente del JSON para evitar consultas adicionales
                    $packItemsData = $detail->item->pack_items;
                    if ($packItemsData && is_array($packItemsData)) {
                        foreach ($packItemsData as $packItem) {
                            if (is_array($packItem) && isset($packItem['name'])) {
                                // Buscar el producto individual para verificar si acepta tallas/colores
                                $individualItem = \App\Models\Item::where('name', $packItem['name'])->first();
                                
                                // Usar alias si existe, sino usar name del item individual
                                $displayName = ($individualItem && !empty($individualItem->alias)) 
                                    ? $individualItem->alias 
                                    : $packItem['name'];
                                $itemLine = "+ *{$displayName}*";
                                $individualItem = \App\Models\Item::where('name', $packItem['name'])->first();
                                
                                // Verificar si el producto individual acepta tallas o colores
                                $acceptsSizes = $individualItem && $individualItem->sizes->count() > 0;
                                $acceptsColors = $individualItem && $individualItem->colors->count() > 0;
                                
                                // Verificar si el detalle tiene talla o color para asignar
                                $hasSize = $detail->size;
                                $hasColor = $detail->color;
                                
                                // Cada producto que acepta el atributo lo recibe
                                $shouldReceiveSize = $acceptsSizes && $hasSize;
                                $shouldReceiveColor = $acceptsColors && $hasColor;
                                
                                if ($shouldReceiveSize || $shouldReceiveColor) {
                                    $itemLine .= ' ';
                                    if ($shouldReceiveSize) $itemLine .= ' ' . strtoupper($detail->size);
                                    if ($shouldReceiveSize && $shouldReceiveColor) $itemLine .= ' - ';
                                    if ($shouldReceiveColor) $itemLine .= ' ' . strtoupper($detail->color);
                                    $itemLine .= '';
                                }
                                
                                $productos .= $itemLine . "\n";
                            }
                        }
                    }
                } else {
                    // Producto normal - usar alias si existe, sino usar name
                    $displayName = (!empty($detail->item->alias)) 
                        ? $detail->item->alias 
                        : $detail->name;
                    $linea = '+ *' . $displayName . '*';
                    if ($detail->size || $detail->color) {
                        $linea .= ' ';
                        if ($detail->size) $linea .= ' ' . strtoupper($detail->size);
                        if ($detail->size && $detail->color) $linea .= ' - ';
                        if ($detail->color) $linea .= ' ' . strtoupper($detail->color);
                        $linea .= '';
                    }
                    $productos .= $linea . "\n";
                }
            }

            // Monto y método de pago
            $monto = '*S/' . number_format($jpa->amount, 2) . ' CULQI*';

            // Dirección y datos
            $isLima = ($jpa->department == 'Lima Metropolitana');
            $direccion = $jpa->address . ($jpa->number ? ' ' . $jpa->number : '');
            $referencia = $jpa->reference ? "*Referencia:* {$jpa->reference}" : '';
            $provincia = $isLima 
                ? '*LIMA METROPOLITANA*' 
                : (
                    ($jpa->province ? '*' . strtoupper($jpa->province) . '*' : '') .
                    ($jpa->department ? ' - *' . strtoupper($jpa->department) . '*' : '') .
                    ' - *SHALOM*'
                );

            $mensaje = "*PEDIDO #{$jpa->code}.* {$jpa->name} {$jpa->lastname}\n";
            $mensaje .= $productos . "\n";
            $mensaje .= $isLima
                ? ("*LIMA METROPOLITANA*\n*DNI:* {$jpa->dni}\n*Dirección:* $direccion\n$referencia\n*Correo:* {$jpa->email}\n*Celular:* {$jpa->phone}\n$monto")
                : ("*PROVINCIA* $provincia\n*DNI:* {$jpa->dni}\n*Dirección:* $direccion\n" . ($jpa->district ? $jpa->district . "\n" : '') . ($jpa->department ? strtoupper($jpa->department) . "\n" : '') . "*Correo:* {$jpa->email}\n*Celular:* {$jpa->phone}\n$monto");

            try {
                if ($send2client) {
                    $phone = ltrim($sale->phone, '+');
                    new Fetch(env('WA_URL') . '/api/send', [
                        'method' => 'POST',
                        'headers' => [
                            'Content-Type' => 'application/json'
                        ],
                        'body' => [
                            'from' => env('APP_CORRELATIVE'),
                            'to' => [$phone],
                            'content' => $mensaje,
                            'html' => $content
                        ]
                    ]);
                    if ($sale->status_id == 'f13fa605-72dd-4729-beaa-ee14c9bbc47b') {
                        new Fetch(env('WA_URL') . '/api/send', [
                            'method' => 'POST',
                            'headers' => [
                                'Content-Type' => 'application/json'
                            ],
                            'body' => [
                                'from' => env('APP_CORRELATIVE'),
                                'to' => ['51' . Text::keep($sale->phone, '0123456789')],
                                'content' => 'Deseas realizar el pago por yape, plin o tarjeta?'
                            ]
                        ]);
                    }
                }
            } catch (\Throwable $th) {}
            try {
                if ($send2group)
                    new Fetch(env('WA_URL') . '/api/send', [
                        'method' => 'POST',
                        'headers' => [
                            'Content-Type' => 'application/json'
                        ],
                        'body' => [
                            'from' => env('APP_CORRELATIVE'),
                            'to' => [env('WAGROUP_VENTAS_ID')],
                            'content' => $mensaje,
                            'html' => $content
                        ]
                    ]);
            } catch (\Throwable $th) {}
        } catch (\Throwable $th) {
            dump($th->getMessage());
        }
    }
}

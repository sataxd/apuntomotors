<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedido</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body style="background: #7B4EDB; font-family: 'Poppins', Arial, sans-serif; margin: 0; padding: 0;">
    <div style="max-width: 750px; margin: 40px auto; background: #7B4EDB; border-radius: 24px; padding: 32px 32px 24px 32px; color: #fff;">        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <div style="font-size: 22px; font-weight: 700; background: #fff; color: #7B4EDB; border-radius: 16px; padding: 8px 24px;">Pedido: <span style="font-weight: 400;">{{ $sale->code }}</span></div>
            <img src="{{ config('app.url') }}/assets/img/logo.png" alt="wefem" style="height: 40px;">
        </div>
        <div style="background: #fff; color: #7B4EDB; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px;">
                <div style="min-width: 260px;">
                    <div style="font-weight: 600; margin-bottom: 4px;">Nombre: <span style="font-weight: 400; color: #333;">{{ $sale->name }} {{ $sale->lastname }}</span></div>
                    <div style="font-weight: 600; margin-bottom: 4px;">Teléfono: <span style="font-weight: 400; color: #333;">{{ $sale->phone }}</span></div>
                    <div style="font-weight: 600; margin-bottom: 4px;">Correo: <span style="font-weight: 400; color: #333;">{{ $sale->email }}</span></div>
                    <div style="font-weight: 600; margin-bottom: 4px;">Dirección: <span style="font-weight: 400; color: #333;">{{ $sale->address }}</span></div>
                    <div style="font-weight: 600; margin-bottom: 4px;">Referencia: <span style="font-weight: 400; color: #333;">{{ $sale->reference }}</span></div>
                    <div style="font-weight: 600; margin-bottom: 4px;">Comprobante: <span style="font-weight: 400; color: #333;">Boleta</span></div>
                </div>
              
            </div>
        </div>        <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin-bottom: 24px; flex-wrap: wrap;">
            @foreach ($sale->details as $detail)                @if ($detail->item && $detail->item->isPack())
                    {{-- Es un pack, mostrar cards individuales para cada producto del pack --}}
                    @if ($detail->item->pack_items && is_array($detail->item->pack_items))
                        @foreach ($detail->item->pack_items as $packItem)
                            @if (is_array($packItem) && isset($packItem['name']))                                @php
                                    // Buscar el producto individual por nombre
                                    $individualItem = \App\Models\Item::where('name', $packItem['name'])->first();
                                    
                                    // Verificar si el producto individual acepta tallas o colores
                                    $acceptsSizes = $individualItem && $individualItem->sizes->count() > 0;
                                    $acceptsColors = $individualItem && $individualItem->colors->count() > 0;
                                    
                                    // Verificar si el detalle tiene talla o color para asignar
                                    $hasSize = $detail->size;
                                    $hasColor = $detail->color;
                                    
                                    // Cada producto que acepta el atributo lo recibe
                                    // (no limitamos a solo el primero)
                                    $shouldReceiveSize = $acceptsSizes && $hasSize;
                                    $shouldReceiveColor = $acceptsColors && $hasColor;
                                @endphp
                                  @if ($individualItem)
                                    <div style="background: #fff; border-radius: 16px; width: 140px; padding: 12px; color: #7B4EDB; text-align: center; position: relative;">
                                        <span style="position: absolute; top: 8px; right: 12px; background: #000000; color: #fff; border-radius: 12px; padding: 2px 10px; font-size: 13px; font-weight: 600; z-index:2;">x{{ (int) $detail->quantity }}</span>
                                        @php
                                            // Obtener la imagen específica del color si este producto acepta colores
                                            $colorForImage = ($shouldReceiveColor) ? $detail->color : null;
                                            $productImage = $individualItem->getImageForColor($colorForImage);
                                        @endphp                                        <img src="{{ config('app.url') }}/api/items/media/{{ $productImage }}" alt="{{ $individualItem->name }}" style="width: 100%; aspect-ratio: 1/1; object-fit: contain; border-radius: 8px; margin-bottom: 8px;">
                                        <div style="font-weight: 700; font-size: 15px; margin-bottom: 2px;">{{ $individualItem->alias ?? $individualItem->name }}</div>
                                        @if ($shouldReceiveSize || $shouldReceiveColor)
                                            <div style="font-size: 13px; color: #333; margin-bottom: 2px;">
                                                @if ($shouldReceiveSize) Talla {{ $detail->size }} @endif
                                                @if ($shouldReceiveSize && $shouldReceiveColor) - @endif
                                                @if ($shouldReceiveColor) Color {{ $detail->color }} @endif
                                            </div>
                                        @endif
                                        <div style="font-size: 11px; color: #FF6B35; font-weight: 600;">Parte del Pack: {{ $detail->name }}</div>
                                    </div>
                                @endif
                            @endif
                        @endforeach
                    @endif                @else                    {{-- Producto normal --}}
                    <div style="background: #fff; border-radius: 16px; width: 140px; padding: 12px; color: #7B4EDB; text-align: center; position: relative;">
                        <span style="position: absolute; top: 8px; right: 12px; background: #000000; color: #fff; border-radius: 12px; padding: 2px 10px; font-size: 13px; font-weight: 600; z-index:2;">x{{ (int) $detail->quantity }}</span>                        @php
                            // Obtener la imagen específica del color si hay color seleccionado
                            $productImage = $detail->item->getImageForColor($detail->color);
                        @endphp
                        <img src="{{ config('app.url') }}/api/items/media/{{ $productImage }}" alt="{{ $detail->name }}" style="width: 100%; aspect-ratio: 1/1; object-fit: contain; border-radius: 8px; margin-bottom: 8px;">
                        <div style="font-weight: 700; font-size: 15px; margin-bottom: 2px;">{{$detail->item->alias ?? $detail->name }}</div>
                        @if ($detail->size || $detail->color)
                            <div style="font-size: 13px; color: #333; margin-bottom: 2px;">
                                @if ($detail->size) Talla {{ $detail->size }} @endif
                                @if ($detail->size && $detail->color) - @endif
                                @if ($detail->color) Color {{ $detail->color }} @endif
                            </div>
                        @endif
                    </div>
                @endif
            @endforeach
        </div>
        <div style="background: #fff; color: #7B4EDB; border-radius: 16px; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
            <div>
                <div style="font-weight: 700; font-size: 16px; margin-bottom: 6px;">Status:
                    @if ($sale->status_id == 'f13fa605-72dd-4729-beaa-ee14c9bbc47b')
                        <span style="color: #FF9900; font-weight: 700;"> Pendiente de pago</span>
                    @else
                        <span style="color: #10c469; font-weight: 700;"> Pagado</span>
                    @endif
                </div>
                <div style="font-weight: 700; font-size: 16px;">Tipo de envío:
                    <span style="font-weight: 400; color: #333;">
                        @if ($sale->department == 'Lima Metropolitana')
                            Envío gratis Lima Metropolitana
                        @else
                            Envío por Shalom (pago en destino)
                        @endif
                    </span>
                </div>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 15px; color: #333;">Subtotal: S/ {{ number_format($sale->amount * 0.82, 2) }}</div>
                <div style="font-size: 15px; color: #333;">IGV: S/ {{ number_format($sale->amount * 0.18, 2) }}</div>
                <div style="font-size: 18px; font-weight: 700; color: #7B4EDB;">Total: S/ {{ number_format($sale->amount, 2) }}</div>
            </div>
        </div>
    </div>
</body>
</html>

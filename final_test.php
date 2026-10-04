<?php

use App\Models\Sale;
use App\Http\Controllers\WhatsAppController;

// Cargar la configuración de Laravel
require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

try {
    // Buscar una venta con pack
    $sale = Sale::whereHas('details.item', function($query) {
        $query->whereNotNull('pack_items');
    })->with([
        'status',
        'details',
        'details.item',
        'coupon'
    ])->latest()->first();

    if (!$sale) {
        echo "No se encontró ninguna venta con pack para probar.\n";
        exit(1);
    }

    echo "Probando con venta: {$sale->code}\n";
    
    // Mostrar detalles
    foreach ($sale->details as $detail) {
        echo "Producto: {$detail->name}\n";
        if ($detail->item && $detail->item->isPack()) {
            echo "  - Es un pack\n";
            echo "  - Pack items: " . json_encode($detail->item->pack_items) . "\n";
            echo "  - Color seleccionado: " . ($detail->color ?: 'ninguno') . "\n";
            echo "  - Talla seleccionada: " . ($detail->size ?: 'ninguna') . "\n";
        }
    }
    
    // Probar solo generación del mensaje (sin envío)
    WhatsAppController::sendSale($sale, false, false);
    
    echo "✅ Proceso completado exitosamente. Revisa los logs para verificar el funcionamiento.\n";
    
} catch (\Throwable $th) {
    echo "❌ Error: " . $th->getMessage() . "\n";
    echo "Archivo: " . $th->getFile() . "\n";
    echo "Línea: " . $th->getLine() . "\n";
}

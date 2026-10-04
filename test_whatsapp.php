<?php

use App\Models\Sale;
use App\Http\Controllers\WhatsAppController;

// Cargar la configuración de Laravel
require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

try {
    // Buscar una venta reciente para prueba
    $sale = Sale::latest()->first();

    if (!$sale) {
        echo "No se encontró ninguna venta para probar.\n";
        exit(1);
    }

    echo "Probando WhatsApp con venta: {$sale->code}\n";
    
    // Intentar enviar WhatsApp (sin enviar realmente)
    WhatsAppController::sendSale($sale, false, false);
    
    echo "Proceso completado. Revisar logs para más detalles.\n";
    
} catch (\Throwable $th) {
    echo "Error: " . $th->getMessage() . "\n";
    echo "Archivo: " . $th->getFile() . "\n";
    echo "Línea: " . $th->getLine() . "\n";
}

<?php

use App\Models\Sale;
use Illuminate\Support\Facades\View;

// Cargar la configuración de Laravel
require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

try {
    // Buscar una venta reciente para prueba
    $sale = Sale::with([
        'status',
        'details',
        'details.item',
        'coupon'
    ])->latest()->first();

    if (!$sale) {
        echo "No se encontró ninguna venta para probar.\n";
        exit(1);
    }

    echo "Probando con venta: {$sale->code}\n";
    
    $data = ['sale' => $sale];
    
    // Intentar renderizar el template
    $content = View::make('mailing.sale-done-wefem', $data)->render();
    
    echo "Template renderizado exitosamente.\n";
    echo "Longitud del contenido: " . strlen($content) . " caracteres\n";
    
} catch (\Throwable $th) {
    echo "Error al renderizar template: " . $th->getMessage() . "\n";
    echo "Archivo: " . $th->getFile() . "\n";
    echo "Línea: " . $th->getLine() . "\n";
}

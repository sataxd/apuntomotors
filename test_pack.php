<?php

use App\Models\Sale;
use App\Models\Item;
use Illuminate\Support\Facades\View;

// Cargar la configuración de Laravel
require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

try {
    // Buscar un pack específico
    $packItem = Item::where('name', 'wePack')->first();
    
    if (!$packItem) {
        echo "No se encontró el pack wePack.\n";
        exit(1);
    }

    echo "Pack encontrado: {$packItem->name}\n";
    echo "Pack items: " . json_encode($packItem->pack_items) . "\n";
    
    // Verificar si los productos del pack existen
    if ($packItem->pack_items && is_array($packItem->pack_items)) {
        foreach ($packItem->pack_items as $packItemData) {
            if (is_array($packItemData) && isset($packItemData['name'])) {
                $individualItem = Item::where('name', $packItemData['name'])->first();
                if ($individualItem) {
                    echo "Producto encontrado: {$individualItem->name}\n";
                    echo "  - Colores disponibles: {$individualItem->colors->count()}\n";
                    echo "  - Tallas disponibles: {$individualItem->sizes->count()}\n";
                    
                    // Probar el método getImageForColor
                    $image = $individualItem->getImageForColor('Rosa');
                    echo "  - Imagen para color Rosa: {$image}\n";
                } else {
                    echo "¡PROBLEMA! Producto no encontrado: {$packItemData['name']}\n";
                }
            }
        }
    }
    
} catch (\Throwable $th) {
    echo "Error: " . $th->getMessage() . "\n";
    echo "Archivo: " . $th->getFile() . "\n";
    echo "Línea: " . $th->getLine() . "\n";
}

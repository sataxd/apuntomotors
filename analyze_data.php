<?php

require_once 'vendor/autoload.php';

// Inicializar Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\SaleDetail;
use App\Models\Item;

echo "=== PROBANDO NUEVA LÓGICA DE PACKS ===\n\n";

// Simular un detalle de venta de pack
$mockDetail = (object)[
    'name' => 'wePack',
    'size' => 'A',
    'color' => 'Rosa',
    'quantity' => 1
];

// Buscar el item wePack
$packItem = Item::where('name', 'wePack')->first();
$mockDetail->item = $packItem;

echo "Simulando WhatsApp para: {$mockDetail->name}\n";
echo "Talla: {$mockDetail->size}, Color: {$mockDetail->color}\n\n";

// Simular la lógica del WhatsApp Controller
if ($mockDetail->item && $mockDetail->item->isPack()) {
    $productos = "+ *PACK: {$mockDetail->name}*\n";
    
    $packItemsData = $mockDetail->item->pack_items;
    if ($packItemsData && is_array($packItemsData)) {
        foreach ($packItemsData as $packItem) {
            if (is_array($packItem) && isset($packItem['name'])) {
                $itemLine = "  - *{$packItem['name']}*";
                
                // Buscar el producto individual
                $individualItem = Item::where('name', $packItem['name'])->first();
                
                echo "Verificando producto: {$packItem['name']}\n";
                if ($individualItem) {
                    echo "  - Tiene sizes: " . ($individualItem->sizes ? 'Sí' : 'No') . "\n";
                    echo "  - Tiene colors: " . ($individualItem->colors ? 'Sí' : 'No') . "\n";
                    
                    // Si tiene tallas/colores y el detalle tiene talla/color
                    if (($individualItem->sizes || $individualItem->colors) && 
                        ($mockDetail->size || $mockDetail->color)) {
                        
                        $itemLine .= ' (';
                        if ($mockDetail->size) $itemLine .= 'Talla ' . strtoupper($mockDetail->size);
                        if ($mockDetail->size && $mockDetail->color) $itemLine .= ' - ';
                        if ($mockDetail->color) $itemLine .= 'Color ' . strtoupper($mockDetail->color);
                        $itemLine .= ')';
                        
                        echo "  - ✓ Se asigna talla/color a este producto\n";
                    } else {
                        echo "  - ✗ No se asigna talla/color\n";
                    }
                }
                
                $productos .= $itemLine . "\n";
                echo "\n";
            }
        }
    }
    
    echo "Resultado final WhatsApp:\n";
    echo $productos;
}

echo "\n=== PRUEBA COMPLETADA ===\n";

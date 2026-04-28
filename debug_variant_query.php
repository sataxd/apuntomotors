<?php

require_once 'vendor/autoload.php';

// Inicializar Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Item;

echo "=== DEBUGGING VARIANT QUERY ===\n";

$productId = '9e878c2d-239a-46bb-9c95-3f65e93b9ada'; // ShakerCup ID
$product = Item::find($productId);

if (!$product) {
    echo "Product not found\n";
    exit;
}

echo "Testing product: {$product->name}\n";
echo "Product has variants: " . ($product->variants()->count() > 0 ? 'YES' : 'NO') . "\n";

// Vamos a replicar exactamente la consulta del controlador
$testColor = 'Lila';

echo "\nTesting color: {$testColor}\n";

// Query original del controlador
$variant = $product->variants()
    ->whereHas('color', function($q) use ($testColor) {
        $q->where('name', $testColor);
    })
    ->first();

echo "Variant found with original query: " . ($variant ? 'YES' : 'NO') . "\n";

if ($variant) {
    echo "Variant ID: {$variant->id}\n";
    echo "Variant Stock: {$variant->stock}\n";
    echo "Variant Color: " . ($variant->color ? $variant->color->name : 'N/A') . "\n";
}

// Vamos a verificar todas las variantes disponibles
echo "\nAll available variants:\n";
foreach ($product->variants as $v) {
    $colorName = $v->color ? $v->color->name : 'N/A';
    $colorId = $v->color ? $v->color->id : 'N/A';
    echo "  - Variant ID: {$v->id}, Color: {$colorName} (ID: {$colorId}), Stock: {$v->stock}\n";
}

// Vamos a verificar los colores disponibles
echo "\nAll available colors:\n";
foreach ($product->colors as $color) {
    echo "  - Color ID: {$color->id}, Name: {$color->name}\n";
}

// Intentemos una consulta más directa
echo "\nDirect variant search with color name '{$testColor}':\n";
$directVariant = $product->variants()
    ->join('item_colors', 'item_variants.color_id', '=', 'item_colors.id')
    ->where('item_colors.name', $testColor)
    ->first();

echo "Direct variant found: " . ($directVariant ? 'YES' : 'NO') . "\n";

if ($directVariant) {
    echo "Direct variant stock: {$directVariant->stock}\n";
}

// Vamos a probar con diferentes casos de comparación
$testCases = ['Lila', 'lila', 'LILA', 'Rosa', 'rosa', 'ROSA'];

foreach ($testCases as $colorTest) {
    echo "\nTesting color case: '{$colorTest}'\n";
    
    $caseVariant = $product->variants()
        ->whereHas('color', function($q) use ($colorTest) {
            $q->where('name', $colorTest);
        })
        ->first();
    
    echo "Found: " . ($caseVariant ? 'YES' : 'NO') . "\n";
    
    // Probar con LIKE también
    $likeVariant = $product->variants()
        ->whereHas('color', function($q) use ($colorTest) {
            $q->where('name', 'LIKE', $colorTest);
        })
        ->first();
    
    echo "Found with LIKE: " . ($likeVariant ? 'YES' : 'NO') . "\n";
}

echo "\n=== END DEBUG ===\n";

<?php

require_once 'vendor/autoload.php';

// Inicializar Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Item;

echo "=== TESTING STOCK VERIFICATION LOGIC ===\n";

$productId = '9e878c2d-239a-46bb-9c95-3f65e93b9ada'; // ShakerCup ID
$product = Item::find($productId);

if (!$product) {
    echo "Product not found\n";
    exit;
}

echo "Testing product: {$product->name}\n";
echo "Has variants: " . ($product->variants()->count() > 0 ? 'yes' : 'no') . "\n";

// Simular el request que viene del frontend
$testCases = [
    ['id' => $productId, 'quantity' => 1, 'color' => 'Lila', 'size' => null],
    ['id' => $productId, 'quantity' => 1, 'color' => 'Rosa', 'size' => null],
    ['id' => $productId, 'quantity' => 1, 'color' => 'Verde', 'size' => null], // Color inexistente
    ['id' => $productId, 'quantity' => 1, 'color' => null, 'size' => null], // Sin color
];

foreach ($testCases as $index => $testCase) {
    echo "\n--- Test Case " . ($index + 1) . " ---\n";
    echo "Color: " . ($testCase['color'] ?? 'null') . "\n";
    echo "Size: " . ($testCase['size'] ?? 'null') . "\n";
    
    // Reproducir la lógica del controlador
    $hasVariants = $product->variants()->count() > 0;
    
    if ($hasVariants) {
        $variantQuery = $product->variants();
        
        if (!empty($testCase['color'])) {
            $variantQuery->whereHas('color', function($q) use ($testCase) {
                $q->where('name', $testCase['color']);
            });
        }
        
        if (!empty($testCase['size'])) {
            $variantQuery->whereHas('zise', function($q) use ($testCase) {
                $q->where('name', $testCase['size']);
            });
        }
        
        $variant = $variantQuery->first();
        
        if ($variant) {
            $colorName = $variant->color ? $variant->color->name : 'N/A';
            $sizeName = $variant->zise ? $variant->zise->name : 'N/A';
            echo "Found variant: Color={$colorName}, Size={$sizeName}, Stock={$variant->stock}\n";
            echo "Available: " . ($variant->stock >= $testCase['quantity'] ? 'YES' : 'NO') . "\n";
        } else {
            echo "No variant found - this would cause 'No hay stock suficiente'\n";
            
            // Debugging: Let's see what variants exist
            echo "Available variants:\n";
            foreach ($product->variants as $v) {
                $colorName = $v->color ? $v->color->name : 'N/A';
                $sizeName = $v->zise ? $v->zise->name : 'N/A';
                echo "  - Color: {$colorName}, Size: {$sizeName}, Stock: {$v->stock}\n";
            }
        }
    }
}

echo "\n=== END TEST ===\n";

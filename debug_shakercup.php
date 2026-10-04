<?php

require_once 'vendor/autoload.php';

// Inicializar Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Item;

echo "=== DEBUG SHAKERCUP PRODUCT ===\n";

// Buscar productos con "shaker" en el nombre
$products = Item::where('name', 'like', '%shaker%')
    ->orWhere('name', 'like', '%ShakerCup%')
    ->orWhere('name', 'like', '%Shaker%')
    ->get();

echo "Found " . $products->count() . " products with 'shaker' in name:\n";

foreach ($products as $product) {
    echo "\n--- Product: {$product->name} ---\n";
    echo "ID: {$product->id}\n";
    echo "Stock: {$product->stock}\n";
    echo "Status: " . ($product->status ? 'active' : 'inactive') . "\n";
    echo "Visible: " . ($product->visible ? 'yes' : 'no') . "\n";
    echo "Colors count: " . $product->colors()->count() . "\n";
    echo "Sizes count: " . $product->sizes()->count() . "\n";
    echo "Variants count: " . $product->variants()->count() . "\n";
    
    if ($product->colors()->count() > 0) {
        echo "Colors: ";
        foreach ($product->colors as $color) {
            echo $color->name . " ";
        }
        echo "\n";
    }
    
    if ($product->variants()->count() > 0) {
        echo "Variants:\n";
        foreach ($product->variants as $variant) {
            $colorName = $variant->color ? $variant->color->name : 'N/A';
            $sizeName = $variant->zise ? $variant->zise->name : 'N/A';
            echo "  - Color: {$colorName}, Size: {$sizeName}, Stock: {$variant->stock}\n";
        }
    }
}

// Si no encontramos productos con "shaker", buscar productos que empiecen con "S"
if ($products->count() === 0) {
    echo "\nNo products found with 'shaker'. Searching products starting with 'S':\n";
    $sProducts = Item::where('name', 'like', 'S%')->take(10)->get();
    foreach ($sProducts as $product) {
        echo "- {$product->name}\n";
    }
}

echo "\n=== END DEBUG ===\n";

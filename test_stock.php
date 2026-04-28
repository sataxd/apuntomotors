<?php
require_once 'vendor/autoload.php';

// Initialize Laravel application
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Item;

echo "=== TESTING STOCK VALIDATION ===\n\n";

// Get some test products
$items = Item::with(['variants.color', 'variants.zise'])->where('status', true)->take(3)->get();

foreach ($items as $item) {
    echo "Item: {$item->name} (ID: {$item->id})\n";
    echo "Base Stock: {$item->stock}\n";
    echo "Has Variants: " . ($item->variants->count() > 0 ? 'Yes' : 'No') . "\n";
    
    if ($item->variants->count() > 0) {
        echo "Variants:\n";
        foreach ($item->variants as $variant) {
            $colorName = $variant->color ? $variant->color->name : 'N/A';
            $sizeName = $variant->zise ? $variant->zise->name : 'N/A';
            echo "  - Color: {$colorName}, Size: {$sizeName}, Stock: {$variant->stock}\n";
        }
    }
    echo "---\n\n";
}

echo "=== TESTING API ENDPOINTS ===\n\n";

// Test the verify stock endpoint
echo "Testing /api/items/verify-stock endpoint...\n";

// Create a simple HTTP client test
$testPayload = [];
foreach ($items as $item) {
    if ($item->variants->count() > 0) {
        $firstVariant = $item->variants->first();
        $colorName = $firstVariant->color ? $firstVariant->color->name : null;
        $sizeName = $firstVariant->zise ? $firstVariant->zise->name : null;
        
        $testPayload[] = [
            'id' => $item->id,
            'quantity' => 1,
            'color' => $colorName,
            'size' => $sizeName
        ];
    } else {
        $testPayload[] = [
            'id' => $item->id,
            'quantity' => 1,
            'color' => null,
            'size' => null
        ];
    }
}

echo "Test payload:\n";
echo json_encode($testPayload, JSON_PRETTY_PRINT) . "\n\n";

// Simulate the controller logic
$result = [];
foreach ($testPayload as $itemData) {
    $itemJpa = Item::find($itemData['id']);
    if (!$itemJpa) continue;
    
    $hasVariants = $itemJpa->variants()->count() > 0;
    
    if ($hasVariants) {
        // Look for exact variant
        $variant = $itemJpa->variants()
            ->whereHas('color', function($q) use ($itemData) {
                if (!empty($itemData['color'])) $q->where('name', $itemData['color']);
            })
            ->whereHas('zise', function($q) use ($itemData) {
                if (!empty($itemData['size'])) $q->where('name', $itemData['size']);
            })
            ->first();
        
        if ($variant) {
            $result[] = [
                'id' => $itemJpa->id,
                'variant_id' => $variant->id,
                'stock' => $variant->stock,
                'requested' => $itemData['quantity'],
                'available' => $variant->stock >= $itemData['quantity'],
                'name' => $itemJpa->name,
                'color' => $itemData['color'] ?? null,
                'size' => $itemData['size'] ?? null,
            ];
        } else {
            $result[] = [
                'id' => $itemJpa->id,
                'variant_id' => null,
                'stock' => 0,
                'requested' => $itemData['quantity'],
                'available' => false,
                'name' => $itemJpa->name,
                'color' => $itemData['color'] ?? null,
                'size' => $itemData['size'] ?? null,
            ];
        }
    } else {
        // Product without variants
        $result[] = [
            'id' => $itemJpa->id,
            'stock' => $itemJpa->stock,
            'requested' => $itemData['quantity'],
            'available' => $itemJpa->stock >= $itemData['quantity'],
            'name' => $itemJpa->name,
            'color' => null,
            'size' => null,
        ];
    }
}

echo "Stock verification result:\n";
echo json_encode($result, JSON_PRETTY_PRINT) . "\n\n";

// Summary
$availableCount = count(array_filter($result, function($item) {
    return $item['available'];
}));

echo "=== SUMMARY ===\n";
echo "Total items tested: " . count($result) . "\n";
echo "Items with sufficient stock: {$availableCount}\n";
echo "Items with insufficient stock: " . (count($result) - $availableCount) . "\n";

if ($availableCount > 0) {
    echo "\n✅ SUCCESS: Stock validation is working correctly!\n";
    echo "Products with stock can be added to cart.\n";
} else {
    echo "\n❌ ISSUE: All products show insufficient stock.\n";
    echo "Need to investigate further.\n";
}

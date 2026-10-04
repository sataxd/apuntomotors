<?php

require_once 'vendor/autoload.php';

// Inicializar Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Item;
use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;

echo "=== TESTING PRODUCT WITHOUT VARIANTS ===\n";

// Buscar un producto sin variantes
$productWithoutVariants = Item::whereDoesntHave('variants')->first();

if (!$productWithoutVariants) {
    echo "No product without variants found\n";
    exit;
}

echo "Testing product: {$productWithoutVariants->name}\n";
echo "Product price: {$productWithoutVariants->price}\n";
echo "Product final_price: {$productWithoutVariants->final_price}\n";
echo "Product discount: {$productWithoutVariants->discount}\n";

// Test request without variants
$requestData = [
    ['id' => $productWithoutVariants->id, 'quantity' => 1]
];

echo "\nTesting request: " . json_encode($requestData) . "\n";

$controller = new ItemController();
$request = Request::create('/api/items/verify-stock', 'POST', $requestData);

try {
    $response = $controller->verifyStock($request);
    $responseData = json_decode($response->getContent(), true);
    
    echo "Response status: " . $response->getStatusCode() . "\n";
    echo "Response data: " . json_encode($responseData, JSON_PRETTY_PRINT) . "\n";
    
    if (isset($responseData['data']) && is_array($responseData['data']) && count($responseData['data']) > 0) {
        $result = $responseData['data'][0];
        echo "\n--- PRICE INFORMATION ---\n";
        echo "Price: " . ($result['price'] ?? 'NOT SET') . "\n";
        echo "Final Price: " . ($result['final_price'] ?? 'NOT SET') . "\n";
        echo "Discount: " . ($result['discount'] ?? 'NOT SET') . "\n";
        echo "Stock: " . $result['stock'] . "\n";
        echo "Available: " . ($result['available'] ? 'YES' : 'NO') . "\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

echo "\n=== END TEST ===\n";

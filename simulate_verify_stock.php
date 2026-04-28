<?php

require_once 'vendor/autoload.php';

// Inicializar Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Item;
use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;

echo "=== SIMULATING VERIFY STOCK REQUEST ===\n";

$productId = '9e878c2d-239a-46bb-9c95-3f65e93b9ada'; // ShakerCup ID
$product = Item::find($productId);

if (!$product) {
    echo "Product not found\n";
    exit;
}

echo "Testing product: {$product->name}\n";

// Vamos a simular diferentes requests que podrían venir del frontend
$testRequests = [
    [
        ['id' => $productId, 'quantity' => 1, 'color' => 'Lila', 'size' => null]
    ],
    [
        ['id' => $productId, 'quantity' => 1, 'color' => 'Rosa', 'size' => null]
    ],
    [
        ['id' => $productId, 'quantity' => 1, 'color' => 'lila', 'size' => null] // Minúscula
    ],
    [
        ['id' => $productId, 'quantity' => 1, 'color' => 'LILA', 'size' => null] // Mayúscula
    ],
    [
        ['id' => $productId, 'quantity' => 1, 'color' => '', 'size' => null] // Color vacío
    ],
    [
        ['id' => $productId, 'quantity' => 1] // Sin color ni size
    ]
];

$controller = new ItemController();

foreach ($testRequests as $index => $requestData) {
    echo "\n--- Test Request " . ($index + 1) . " ---\n";
    echo "Request data: " . json_encode($requestData) . "\n";
    
    // Crear un mock request
    $request = Request::create('/api/items/verify-stock', 'POST', $requestData);
    
    try {
        $response = $controller->verifyStock($request);
        $responseData = json_decode($response->getContent(), true);
        
        echo "Response status: " . $response->getStatusCode() . "\n";
        echo "Response data: " . json_encode($responseData, JSON_PRETTY_PRINT) . "\n";
        
        if (isset($responseData['data']) && is_array($responseData['data']) && count($responseData['data']) > 0) {
            $result = $responseData['data'][0];
            echo "Stock available: " . ($result['available'] ? 'YES' : 'NO') . "\n";
            echo "Stock amount: " . $result['stock'] . "\n";
            echo "Color requested: " . ($result['color'] ?? 'null') . "\n";
        }
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
    }
}

echo "\n=== END TEST ===\n";

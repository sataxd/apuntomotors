<?php

require_once 'vendor/autoload.php';
require_once 'bootstrap/app.php';

// Simular el payload que envía el frontend para un carrito con ShakerCup
$payload = [
    [
        'id' => 33, // ShakerCup
        'quantity' => 1,
        'color' => 'Negro',
        'size' => null,
    ],
    [
        'id' => 33, // ShakerCup otra variación
        'quantity' => 2,
        'color' => 'Blanco',
        'size' => null,
    ]
];

echo "=== PAYLOAD ENVIADO ===\n";
print_r($payload);

// Crear una instancia del controlador
$controller = new \App\Http\Controllers\ItemController();

// Crear un mock request
$request = new \Illuminate\Http\Request();
$request->merge(['items' => $payload]);

try {
    $response = $controller->verifyStock($request);
    $data = $response->getData(true); // true para array asociativo
    
    echo "\n=== RESPUESTA DEL BACKEND ===\n";
    print_r($data);
    
    // Simular la lógica del frontend
    echo "\n=== SIMULACIÓN LÓGICA FRONTEND ===\n";
    
    // Supongamos que tenemos este carrito (simulando el estado del frontend)
    $carrito = [
        [
            'id' => 33,
            'name' => 'ShakerCup',
            'variations' => [
                [
                    'color' => 'Negro',
                    'size' => null,
                    'quantity' => 1
                ],
                [
                    'color' => 'Blanco', 
                    'size' => null,
                    'quantity' => 2
                ]
            ],
            'price' => 0, // Este debería actualizarse
            'final_price' => 0,
            'discount' => 0
        ]
    ];
    
    echo "Carrito ANTES de actualizar precios:\n";
    print_r($carrito);
    
    // Aplicar la lógica actual del frontend (que está mal)
    $items = $data['data'] ?? $data;
    
    echo "\nItems devueltos por el backend:\n";
    foreach ($items as $index => $item) {
        echo "Item {$index}: ID={$item['id']}, Price={$item['price']}, Final_price={$item['final_price']}\n";
    }
    
    // Lógica actual del frontend (problemática)
    $newCart = [];
    foreach ($carrito as $x) {
        $found = null;
        foreach ($items as $item) {
            if ($item['id'] == $x['id']) {
                $found = $item;
                break; // Solo encuentra el primero!
            }
        }
        
        if ($found) {
            $x['price'] = $found['price'];
            $x['final_price'] = $found['final_price'];
            $x['discount'] = $found['discount'];
            $x['name'] = $found['name'];
        }
        $newCart[] = $x;
    }
    
    echo "\nCarrito DESPUÉS de aplicar lógica actual (problemática):\n";
    print_r($newCart);
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}

?>

<?php

// Script para probar la lógica de carrito con cURL simulando el frontend

$url = 'http://localhost/projects/wefem/api/items/verify-stock';

// Simular el payload que envía el frontend para un carrito con ShakerCup
$payload = [
    'items' => [
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
    ]
];

echo "=== PAYLOAD ENVIADO ===\n";
print_r($payload);

// Hacer petición con cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json',
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "\n=== RESPUESTA DEL BACKEND (HTTP $httpCode) ===\n";
echo $response . "\n";

if ($httpCode === 200) {
    $data = json_decode($response, true);
    
    echo "\n=== ANÁLISIS DE LA RESPUESTA ===\n";
    
    if (isset($data['data'])) {
        $items = $data['data'];
    } else {
        $items = $data;
    }
    
    echo "Items devueltos por el backend:\n";
    foreach ($items as $index => $item) {
        echo "Item {$index}: ID={$item['id']}, Price={$item['price']}, Final_price={$item['final_price']}, Stock={$item['stock']}\n";
        if (isset($item['color'])) {
            echo "  - Color: {$item['color']}\n";
        }
        if (isset($item['size'])) {
            echo "  - Size: {$item['size']}\n";
        }
    }
    
    // Simular la lógica actual del frontend (problemática)
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
    
    echo "\n=== PROBLEMA IDENTIFICADO ===\n";
    echo "El backend devuelve " . count($items) . " items (uno por cada variación).\n";
    echo "Pero el frontend solo toma el primer item que coincida con el ID del producto.\n";
    echo "Esto significa que todas las variaciones del mismo producto tendrán el mismo precio,\n";
    echo "que corresponde solo al precio de la primera variación en la respuesta.\n";
}

?>

<?php

require_once 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$generals = \App\Models\General::all();
echo "Total records: " . $generals->count() . "\n";

foreach ($generals as $general) {
    echo "ID: {$general->id}, Correlative: {$general->correlative}, Name: {$general->name}\n";
}

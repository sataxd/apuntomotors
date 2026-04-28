<?php

namespace Database\Seeders;

use App\Models\Indicator;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IndicatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $indicators = [
            ['symbol' => '+', 'name' => '12.500', 'description' => 'Pedidos vendidos'],
            ['symbol' => '+', 'name' => '250', 'description' => 'Marcas y Emprendimientos'],
            ['symbol' => '+', 'name' => '4800', 'description' => 'Pedidos personalizados'],
        ];

        Indicator::where('status', true)->delete();
        
        foreach ($indicators as $indicator) {
            Indicator::create($indicator);
        }
    }
}

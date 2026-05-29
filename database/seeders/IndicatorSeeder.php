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
            [
                'symbol' => '%', 
                'name' => '100', 
                'description' => 'Garantía en reparaciones'
            ],
            [
                'symbol' => '+', 
                'name' => '550', 
                'description' => 'Clientes Satisfechos'
            ],
            [
                'symbol' => '+', 
                'name' => '5', 
                'description' => 'Años de Experiencia'
            ],
        ];

        Indicator::where('status', true)->delete();
        
        foreach ($indicators as $indicator) {
            Indicator::create($indicator);
        }
    }
}
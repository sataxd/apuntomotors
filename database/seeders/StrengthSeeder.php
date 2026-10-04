<?php

namespace Database\Seeders;

use App\Models\Strength;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StrengthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

       $strengths = [
            // Círculo Externo (out)
            [
                'name' => 'Agencias',
                'description' => 'out'
            ],
            [
                'name' => 'Eventos',
                'description' => 'out'
            ],
            [
                'name' => 'Bodegas',
                'description' => 'out'
            ],
            [
                'name' => 'Licorerías',
                'description' => 'out'
            ],
            [
                'name' => 'Restaurantes',
                'description' => 'out'
            ],
            [
                'name' => 'Hoteles',
                'description' => 'out'
            ],
            // Círculo Interno (in)
            [
                'name' => 'Productoras',
                'description' => 'in'
            ],
            [
                'name' => 'Oficinas',
                'description' => 'in'
            ],
            [
                'name' => 'Cervecerías',
                'description' => 'in'
            ],
            [
                'name' => 'Empresas',
                'description' => 'in'
            ],
        ];

        foreach ($strengths as $strength) {
            Strength::updateOrCreate([
                'name' => $strength['name']
            ], [
                'description' => $strength['description']
            ]);
        }
    }
}

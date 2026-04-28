<?php

namespace Database\Seeders;

use App\Models\CoreValue;
use Illuminate\Database\Seeder;

class CoreValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $coreValues = [
            [
                'name' => 'Atención Personalizada',
                'description' => null,
                'image' => 'c85bfae0-c7ea-483e-ac86-edcda4cb5f25.png',
                'visible' => 1,
                'status' => 1,
            ],
            [
                'name' => 'Agilidad en Despacho',
                'description' => null,
                'image' => '5310ce23-5fef-48ba-8af1-977035aac98f.png',
                'visible' => 1,
                'status' => 1,
            ],
            [
                'name' => 'Precios Competitivos',
                'description' => null,
                'image' => 'f4177184-3b49-41a8-84de-707eec12bc07.png',
                'visible' => 1,
                'status' => 1,
            ],
            [
                'name' => 'Productos de Calidad',
                'description' => null,
                'image' => 'a23e1580-e75f-4547-a103-46a043035f5d.png',
                'visible' => 1,
                'status' => 1,
            ],
        ];

        foreach ($coreValues as $value) {
            CoreValue::updateOrCreate(
                ['name' => $value['name']],
                $value
            );
        }
    }
}
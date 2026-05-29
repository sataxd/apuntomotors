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
                'name' => 'Asesoría Técnica',
                'description' => null,
                'image' => 'c85bfae0-c7ea-483e-ac86-edcda4cb5f25.png',
                'visible' => 1,
                'status' => 1,
            ],
            [
                'name' => 'Eficiencia y Rapidez',
                'description' => null,
                'image' => '52ed9edb-a856-4341-925b-6a0cb27d84f1.png',
                'visible' => 1,
                'status' => 1,
            ],
            [
                'name' => 'Precios Accesibles',
                'description' => null,
                'image' => 'f4177184-3b49-41a8-84de-707eec12bc07.png',
                'visible' => 1,
                'status' => 1,
            ],
            [
                'name' => 'Servicio de Calidad',
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
<?php

namespace Database\Seeders;

use App\Models\Slider;
use Illuminate\Database\Seeder;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sliders = [
            [
                'name' => 'La calidad es nuestra mejor garantía',
                'description' => 'En Vitromaxx cada producto, cada acto, de atención y servicio obedece a un criterio de perfección, compartido por más de 28 años, comprometiendo el verdadero significado del servicio al cliente.',
                'image' => '18a7a887-4208-4327-b612-f079bb09f10a.webp',
                'button_text' => 'Ver productos',
                'button_link' => '/catalogo',
            ],
            [
                'name' => 'Nueva Promo Wiskera',
                'description' => 'Llévate esta promo por caja de 50 un de botella wiskera.',
                'image' => '43ed2098-0cea-4025-8c48-97cf23f0e2bc.webp',
                'button_text' => '',
                'button_link' => '',
            ],
        ];

        foreach ($sliders as $slider) {
            Slider::updateOrCreate(['name' => $slider['name']], $slider);
        }
    }
}

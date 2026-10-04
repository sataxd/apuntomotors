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
                'name' => 'Frenos y Mecánica Integral: Tu Seguridad en Buenas Manos',
                'description' => 'Mantenimiento preventivo con tecnología avanzada para que conduzcas sin preocupaciones. ¡Agenda tu diagnóstico hoy mismo en Apunto Motors!',
                'image' => 'c3f42224-83ba-4306-a41c-3a246d0386a0.webp',
                'button_text' => 'Ver servicios',
                'button_link' => '/servicios',
                'esimagen' => 1,
            ],
            [
                'name' => 'Transparencia y Confianza en Cada Revisión Vehicular',
                'description' => 'Expertos en cambio de aceite y chequeos preventivos. Te brindamos soluciones honestas y repuestos originales para proteger tu inversión.',
                'image' => '2038336c-579c-4284-911d-c5a17a6a7dd3.webp',
                'button_text' => null,
                'button_link' => null,
                'esimagen' => 1,
            ],
        ];

        foreach ($sliders as $slider) {
            Slider::updateOrCreate(['name' => $slider['name']], $slider);
        }
    }
}
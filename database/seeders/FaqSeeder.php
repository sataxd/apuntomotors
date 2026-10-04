<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faqs = [
            [
                'name' => '¿Qué tipo de servicios automotrices ofrecen?',
                'description' => 'Ofrecemos soluciones automotrices integrales y servicios de mantenimiento multimarca. Nuestros principales servicios incluyen el mantenimiento preventivo y correctivo, la inspección y reparación de frenos y suspensión, y el diagnóstico electrónico de alta precisión. Además, contamos con la capacidad operativa para atender tanto a conductores particulares como a grandes flotas vehiculares empresariales.'
            ],
            [
                'name' => '¿Atienden a todas las marcas y modelos de vehículos?',
                'description' => 'Sí, en Apunto Motors somos un taller mecánico multimarca líder en Lima. Nuestro equipo técnico está altamente capacitado y cuenta con una amplia experiencia comprobada en el cuidado y mantenimiento preventivo y correctivo de diversas marcas y modelos. Para ello, estamos equipados con escáneres multimarca de última generación.'
            ],
            [
                'name' => '¿Cómo garantizan la transparencia en los precios y diagnósticos?',
                'description' => 'Nuestra propuesta de valor se centra en brindarte un diagnóstico preciso, transparente y honesto. Para tu tranquilidad, te mostramos el diagnóstico real de tu auto mediante fotos y videos antes de iniciar cualquier reparación. Te entregamos un presupuesto detallado, sin costos ocultos de última hora, y realizamos cambios únicamente en las piezas donde realmente se necesita.'
            ],
            [
                'name' => '¿Utilizan repuestos originales en sus reparaciones?',
                'description' => 'Absolutamente. Nuestro compromiso de calidad incluye el uso irrestricto de repuestos originales de alta calidad. Maximizamos el rendimiento de tu vehículo utilizando repuestos y tecnología avanzada para asegurar la durabilidad de tu inversión y superar tus expectativas.'
            ],
            [
                'name' => '¿Ofrecen alguna garantía por los servicios mecánicos realizados?',
                'description' => 'Sí, brindamos un 100% de garantía de satisfacción en todos nuestros diagnósticos y reparaciones. Cada mantenimiento, ya sea correctivo o preventivo, cuenta con un respaldo técnico total y se ejecuta bajo estrictos protocolos de seguridad y profesionalismo para devolverte una total seguridad al volante.'
            ],
            [
                'name' => '¿Es necesario agendar una cita previa para llevar mi vehículo?',
                'description' => 'Sí, recomendamos agendar tu cita mecánica con anticipación para poder brindarte una atención personalizada y eficiente. Diseñamos un flujo de trabajo optimizado y cumplimos con plazos de entrega estrictos, porque sabemos lo importante que es tu movilidad y no queremos que pases días sin tu auto.'
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::updateOrCreate(['name' => $faq['name']], $faq);
        }
    }
}
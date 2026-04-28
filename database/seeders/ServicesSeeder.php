<?php

namespace Database\Seeders;

use App\Models\Services;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'name' => 'Serigrafía',
                'description' => '<p>Diagn&oacute;stico y correcci&oacute;n de fallos en equipos, cableado o configuraci&oacute;n para restablecer la funcionalidad completa de su sistema de intercomunicadores.&nbsp;</p><ul><li>Servicio de reparaci&oacute;n para todos los productos de la marca&nbsp;<strong>Itower</strong></li><li>Para<strong>&nbsp;otras marcas</strong>, servicio de reparaci&oacute;n limitado a disponibilidad de repuestos en el mercado y/o .</li></ul>',
                'image' => 'aff10d57-3209-4c79-bf93-d45f8df072a8.webp',
                'visible' => 1,
                'status' => 1,
            ],
            [
                'name' => 'Sublimado',
                'description' => '<ul><li>Revisi&oacute;n del estado de gabinetes, soportes, puntos de fijaci&oacute;n y protecciones contra la intemperie (especialmente en cercos el&eacute;ctricos y sensores exteriores).</li><li>Retiro de polvo, suciedad e insectos de sensores, sirenas, paneles de control y c&aacute;maras/micr&oacute;fonos de intercomunicadores para evitar falsas alarmas y garantizar la sensibilidad.</li></ul>',
                'image' => '2f728386-f9bf-4a78-94b2-563d7c0a549b.jpg',
                'visible' => 1,
                'status' => 1,
            ],
            [
                'name' => 'Brandeo',
                'description' => '<ul><li>Evaluaci&oacute;n detallada del espacio (vivienda, comercio, hospital, per&iacute;metro) para identificar puntos cr&iacute;ticos de acceso, zonas ciegas y los mejores lugares para ubicar sensores o c&aacute;maras.</li><li>Determinaci&oacute;n de la cantidad exacta y el tipo de equipos necesarios (detectores, barreras, intercomunicadores) para una cobertura del 100%, evitando la sobre o subestimaci&oacute;n.</li><li>En el caso de alarmas contra incendio o cercos el&eacute;ctricos, aseguramos que la instalaci&oacute;n cumpla con las regulaciones locales y est&aacute;ndares de seguridad vigentes.</li></ul>',
                'image' => 'f5b9ea16-3c7b-4ddc-a5e1-693c9b81b430.webp',
                'visible' => 1,
                'status' => 1,
            ],
            [
                'name' => 'Ampliaciones',
                'description' => '<ul><li>Adici&oacute;n de nuevos componentes o funcionalidades a un sistema existente (ej. m&aacute;s sensores, sirenas, un nuevo sector en el cerco el&eacute;ctrico, m&aacute;s puntos de intercomunicaci&oacute;n).</li><li><p>El servicio de ampliaciones le permite aumentar la cobertura y las funcionalidades de su sistema de seguridad existente de manera eficiente y sin necesidad de sustituir toda la instalaci&oacute;n.</p></li></ul>',
                'image' => '53bf3a05-98e6-4863-811d-0b3b0630cc22.webp',
                'visible' => 0,
                'status' => 1,
            ],
            [
                'name' => 'Modificaciones',
                'description' => '<ul><li>Reubicaci&oacute;n de equipos o reconfiguraci&oacute;n de zonas y par&aacute;metros operativos dentro del sistema de seguridad ya instalado, sin necesidad de a&ntilde;adir nuevos componentes.</li><li><p>El servicio de Modificaciones se enfoca en&nbsp;<strong>ajustar, reubicar o reconfigurar</strong>&nbsp;elementos clave de su sistema de seguridad ya instalado, en respuesta a cambios estructurales, de uso o por preferencias operativas del cliente.</p></li></ul>',
                'image' => '2f9a84d4-7365-46b3-97eb-aea7d69295f3.webp',
                'visible' => 0,
                'status' => 1,
            ],
            [
                'name' => 'Traslados',
                'description' => '<ul><li><p>El servicio de Traslados se encarga del&nbsp;<strong>desmontaje seguro, transporte y reinstalaci&oacute;n completa</strong>&nbsp;de sus sistemas de seguridad electr&oacute;nica (alarmas, cercos, intercomunicadores) desde su ubicaci&oacute;n actual hasta una nueva propiedad.</p></li><li>Evita la inactividad prolongada; su sistema estar&aacute; operativo en el nuevo lugar r&aacute;pidamente.</li><li>Al ser el mismo equipo t&eacute;cnico que conoce el sistema, garantizamos que el sistema operar&aacute; con la misma fiabilidad en la nueva ubicaci&oacute;n.</li></ul>',
                'image' => 'e0e11aa7-6d42-4b20-85a8-7ae624ba1351.webp',
                'visible' => 0,
                'status' => 1,
            ],
            [
                'name' => 'Cambio de Equipos',
                'description' => '<ul><li>Sustituci&oacute;n de componentes antiguos, obsoletos o da&ntilde;ados por modelos compatibles de rendimiento superior dentro de su infraestructura de seguridad actual.</li><li>Permite acceder a las ventajas de las nuevas tecnolog&iacute;as (ej. mayor velocidad, m&aacute;s funciones) sin tener que invertir en un sistema completamente nuevo.</li><li>Nos aseguramos de que el nuevo equipo se integre perfectamente a otros sistemas instalados.</li></ul>',
                'image' => 'b88febb0-950a-4756-9e01-5ed26831d085.webp',
                'visible' => 0,
                'status' => 1,
            ],
            [
                'name' => 'Nuevas Tecnologías',
                'description' => '<p>Integraci&oacute;n de las &uacute;ltimas innovaciones en seguridad electr&oacute;nica (ej. integraci&oacute;n con IoT, intercomunicadores IP avanzados, alarmas con verificaci&oacute;n de video) para mejorar su protecci&oacute;n.</p>',
                'image' => '223755ff-42c0-4662-b382-0e5f9d0919c3.webp',
                'visible' => 0,
                'status' => 1,
            ],
        ];

        foreach ($services as $service) {
            Services::updateOrCreate(['name' => $service['name']], $service);
        }
    }
}
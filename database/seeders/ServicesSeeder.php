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
                'name' => 'Mantenimiento preventivo y correctivo',
                'slug' => 'mantenimiento-preventivo-y-correctivo',
                'description' => '<p>En <strong>Apunto Motors</strong>, nuestro servicio de <strong>mantenimiento preventivo y correctivo</strong> optimiza el rendimiento y alarga la vida &uacute;til de tu motor. Por ello, en el mantenimiento preventivo realizamos el <strong>cambio de aceite</strong>, revisi&oacute;n de filtros y chequeos rigurosos. Este enfoque evita reparaciones costosas y garantiza tu tranquilidad.</p>\r\n\r\n<p>Como <strong>taller mec&aacute;nico multimarca en Lima</strong>, contamos con un equipo t&eacute;cnico capacitado y esc&aacute;neres de &uacute;ltima generaci&oacute;n. Esto nos permite un <strong>diagn&oacute;stico electr&oacute;nico</strong> preciso para identificar fallas , resolviendo cada aver&iacute;a con <strong>repuestos originales</strong> de alta calidad para proteger tu inversi&oacute;n.</p>\r\n\r\n<p>Te garantizamos transparencia total, presupuestos honestos y soluciones exactas que ahorran tiempo y dinero. &iexcl;Reserva tu cita y conduce con total seguridad!</p>',
                'image' => '7d6663bc-8f91-4fc9-9bda-c72065691db0.webp',
                'visible' => 1,
                'status' => 1,
                'featured' => 1,
            ],
            [
                'name' => 'Suspensión, Dirección, Frenos y Embragues',
                'slug' => 'suspension-direccion-frenos-y-embragues',
                'description' => '<p>Nuestro servicio integral de <strong>suspensi&oacute;n, direcci&oacute;n, frenos y embragues</strong> est&aacute; dise&ntilde;ado para garantizarte una conducci&oacute;n suave, estable y libre de riesgos en cualquier tipo de terreno. Nos encargamos de inspeccionar y reparar a fondo los amortiguadores, las pastillas, los discos y todos los componentes vitales de tu veh&iacute;culo.</p>\r\n\r\n<p>Entre los servicios que tenemos est&aacute;n: Revisi&oacute;n y cambio de pastillas y zapatas, Rectificado o reemplazo de discos y tambores, Purga y cambio de l&iacute;quido de frenos, Diagn&oacute;stico del sistema ABS, Mantenimiento de c&aacute;lipers (mordazas), Inspecci&oacute;n y cambio de amortiguadores y resortes, Reemplazo de r&oacute;tulas de suspensi&oacute;n, Alineaci&oacute;n y balanceo computarizado, Mantenimiento de la cremallera de direcci&oacute;n, Revisi&oacute;n de direcci&oacute;n hidr&aacute;ulica o el&eacute;ctrica, Cambio del kit de embrague, Diagn&oacute;stico de vibraciones o dureza y muchos m&aacute;s.</p>\r\n\r\n<p>&nbsp;</p>',
                'image' => '8681e02c-1dec-4c5e-b1bb-29611d45d4e5.webp',
                'visible' => 1,
                'status' => 1,
                'featured' => 1,
            ],
            [
                'name' => 'Diagnóstico computarizado',
                'slug' => 'diagnostico-computarizado',
                'description' => '<p>Nuestro servicio de <strong>diagn&oacute;stico computarizado</strong> es clave para detectar fallas invisibles con esc&aacute;neres multimarca de &uacute;ltima generaci&oacute;n. Realizamos una evaluaci&oacute;n exacta y profunda de tu veh&iacute;culo para identificar problemas de forma proactiva, antes de que se conviertan en reparaciones costosas.</p>\r\n\r\n<p>Realizamos Detecci&oacute;n precisa de problemas mec&aacute;nicos y electr&oacute;nicos mediante tecnolog&iacute;a avanzada y sistemas de diagn&oacute;stico por computador,&nbsp;Evaluaci&oacute;n e identificaci&oacute;n de problemas en sensores y sistemas internos.</p>\r\n\r\n<p>Te brindamos soluciones exactas que ahorran tiempo y dinero a nuestros clientes. &iexcl;Agenda tu cita hoy mismo!</p>',
                'image' => 'bb40f069-fe2d-49b8-837d-90b5d2faa54e.webp',
                'visible' => 1,
                'status' => 1,
                'featured' => 1,
            ],
            [
                'name' => 'Reparación de motor',
                'slug' => 'reparacion-de-motor',
                'description' => '<p>Sabemos que el motor es el coraz&oacute;n de tu veh&iacute;culo. Nuestro servicio especializado en <strong>reparaci&oacute;n de motor</strong> est&aacute; dise&ntilde;ado para devolverle la m&aacute;xima potencia, rendimiento y eficiencia a tu m&aacute;quina. Como tu taller automotriz de confianza, realizamos el cambio de piezas y reparaci&oacute;n de motor y sistemas internos utilizando siempre tecnolog&iacute;a avanzada y repuestos originales para proteger tu inversi&oacute;n a largo plazo.</p>\r\n\r\n<p>Realizamos:&nbsp;Diagn&oacute;stico profundo para la detecci&oacute;n precisa de fallas mec&aacute;nicas,&nbsp;Reparaci&oacute;n de aver&iacute;as y reemplazo de piezas internas desgastadas,&nbsp;Rectificado de culata, bloque del motor y cambio de empaquetaduras,&nbsp;Limpieza, ajuste y calibraci&oacute;n de los sistemas de inyecci&oacute;n o distribuci&oacute;n, etc.</p>',
                'image' => 'de5af39c-ec69-4232-95f8-05d61f834976.webp',
                'visible' => 1,
                'status' => 1,
                'featured' => 1,
            ],
            [
                'name' => 'Aire acondicionado',
                'slug' => 'aire-acondicionado',
                'description' => '<p>Sabemos que tu confort al conducir es fundamental en cualquier temporada. Nuestro servicio especializado de <strong>aire acondicionado</strong> garantiza que la temperatura de tu cabina sea siempre la ideal. Realizamos una revisi&oacute;n exhaustiva de todo el sistema de climatizaci&oacute;n, abarcando la recarga de gas refrigerante, la limpieza profunda de los conductos y el reemplazo del filtro de cabina para que respires aire puro, libre de bacterias y malos olores.</p>\r\n\r\n<p>Te garantizamos transparencia total, presupuestos honestos y soluciones exactas que ahorran tiempo y dinero. &iexcl;Reserva tu cita hoy mismo y viaja con total frescura!</p>',
                'image' => '3ff1c8e8-4d4a-4335-a261-0903fb0dd9e6.webp',
                'visible' => 1,
                'status' => 1,
                'featured' => 1,
            ],
            [
                'name' => 'Luces en general',
                'slug' => 'luces-en-general',
                'description' => '<p>Entendemos que tu seguridad en el camino es una prioridad absoluta. Un sistema de iluminaci&oacute;n en perfecto estado es vital para garantizar tu visibilidad nocturna y alertar de tus movimientos a otros conductores. Nuestro servicio especializado de <strong>luces en general</strong> abarca la revisi&oacute;n, regulaci&oacute;n y el reemplazo de faros principales, direccionales, neblineros y luces de freno.</p>\r\n\r\n<p>Contamos con un equipo t&eacute;cnico capacitado y esc&aacute;neres. Esto nos permite realizar un diagn&oacute;stico electr&oacute;nico preciso para identificar fallas ocultas en los cableados y sistemas el&eacute;ctricos.</p>',
                'image' => 'de571004-5846-44cf-833b-47b9afecf182.webp',
                'visible' => 1,
                'status' => 1,
                'featured' => 1,
            ],
            [
                'name' => 'Full TUNING',
                'slug' => 'full-tuning',
                'description' => '<p>En <strong>Apunto Motors</strong>, sabemos que tu veh&iacute;culo es una extensi&oacute;n de tu personalidad. Nuestro servicio de <strong>Full Tuning</strong> est&aacute; dise&ntilde;ado para aquellos conductores apasionados que buscan llevar su auto al siguiente nivel, tanto en est&eacute;tica como en potencia. Ofrecemos una especializaci&oacute;n en la personalizaci&oacute;n est&eacute;tica y funcional de veh&iacute;culos para garantizar que tu auto destaque en las calles.</p>\r\n\r\n<p>Utilizamos tecnolog&iacute;a y componentes de la m&aacute;s alta calidad para asegurar que cada modificaci&oacute;n no solo luzca incre&iacute;ble, sino que tambi&eacute;n sea 100% segura y duradera.</p>',
                'image' => 'aa69aa06-2dbe-4d64-afa1-95c480463609.webp',
                'visible' => 1,
                'status' => 1,
                'featured' => 0,
            ],
            [
                'name' => 'Tratamiento de pintura',
                'slug' => 'tratamiento-de-pintura',
                'description' => '<p>La est&eacute;tica de tu autom&oacute;vil es fundamental. Nuestro servicio de <strong>tratamiento de pintura</strong> y planchado est&aacute; especializado en restaurar la carrocer&iacute;a de su veh&iacute;culo, dej&aacute;ndolo como nuevo. Entendemos perfectamente que un cuidado exterior adecuado hace mucho m&aacute;s que recuperar el aspecto del veh&iacute;culo, nos ayuda a devolver valor y utilidad al veh&iacute;culo a largo plazo.</p>\r\n\r\n<p>Tenemos la m&aacute;s alta calidad para proteger tu carrocer&iacute;a contra los rayos UV, rayones y la contaminaci&oacute;n, logrando un acabado espejo duradero.</p>',
                'image' => 'e6881255-414b-4d86-bc00-091988472655.webp',
                'visible' => 1,
                'status' => 1,
                'featured' => 0,
            ],
            [
                'name' => 'Limpieza de inyectores ultrasonido',
                'slug' => 'limpieza-de-inyectores-ultrasonido',
                'description' => '<p>La eficiencia de tu veh&iacute;culo depende de una inyecci&oacute;n de combustible precisa. Nuestro servicio especializado en <strong>limpieza de inyectores ultrasonido</strong> es la soluci&oacute;n ideal para recuperar la potencia perdida, eliminar los molestos tirones y optimizar al m&aacute;ximo el ahorro de combustible.&nbsp;</p>\r\n\r\n<p>Utilizamos tecnolog&iacute;a avanzada y equipos de ultrasonido de alta frecuencia para desprender el carb&oacute;n, barniz y las impurezas acumuladas en el interior de los inyectores, dej&aacute;ndolos como nuevos.</p>',
                'image' => '1f31360d-ad3d-4151-add0-bc1ce02dbb8e.webp',
                'visible' => 1,
                'status' => 1,
                'featured' => 0,
            ],
        ];

        foreach ($services as $service) {
            Services::updateOrCreate(['name' => $service['name']], $service);
        }
    }
}
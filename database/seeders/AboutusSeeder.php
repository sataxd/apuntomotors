<?php

namespace Database\Seeders;

use App\Models\Aboutus;
use Illuminate\Database\Seeder;

class AboutusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $aboutuses = [
            [
                'correlative' => 'about-us',
                'name' => 'Nosotros',
                'description' => 'Nos enfocamos en valorar y personalizar la experiencia del *auto cuidado* y del cuidado del *medio ambiente*. Creemos que se puede generar bienestar en las personas mostrándoles la mejor versión de cada *un@* y *empoderándol@s*. Es por eso que apostamos por crear fórmulas únicas a través de experiencias digitales de personalización. Creando productos orgánicos, libre de parabenos, sulfatos y libres de maltrato animal. De las miles de combinaciones que existen, la tuya es única, abrázala.',
                'subtitle' => 'aaaaaaaaaa',
                'icon' => '1615d194-26cd-4beb-a282-884b163d36f4.png',
                'image' => 'd180dcf1-afbe-4910-a6f7-f2be7b2b057a.png',
                'button_text' => 'eeee',
                'button_link' => 'ccccc',
            ],
            [
                'correlative' => 'phone',
                'name' => 'Teléfono',
                'description' => '5114605000',
            ],
            [
                'correlative' => 'email',
                'name' => 'Correo',
                'description' => 'hola@vua.pe',
                'subtitle' => 'asdasdaq',
                'button_text' => 'sdasdas',
                'button_link' => 'dssss',
            ],
            [
                'correlative' => 'whatsapp',
                'name' => 'WhatsApp',
                'description' => '5114605000',
            ],
            [
                'correlative' => 'customer-complaints',
                'name' => 'Libro de reclamaciones',
                'description' => 'https://docs.google.com/forms/d/e/1FAIpQLSesYBA7aagw3XFpqZelSLb70mx4qEI4XO2PXh6JcVV5ghnkrQ/viewform',
            ],
            [
                'correlative' => 'home-about-title',
                'name' => 'Tu Taller de Confianza',
                'subtitle' => 'Expertos multimarca dedicados a mantener tu auto en su mejor rendimiento.',
            ],
            [
                'correlative' => 'home-about-description',
                'name' => 'Sobre Nosotros',
                'description' => '<p>En Apunto Motors somos un taller mec&aacute;nico multimarca l&iacute;der en Lima, especializado en mantenimiento preventivo y correctivo. Destacamos por nuestra infraestructura moderna con tecnolog&iacute;a de diagn&oacute;stico avanzada y un equipo t&eacute;cnico altamente capacitado.</p>\r\n\r\n<p>Brindamos soluciones honestas, transparentes y eficientes para que conduzcas con total seguridad. Maximizamos el rendimiento de tu veh&iacute;culo utilizando repuestos originales para superar cada una de tus expectativas.</p>',
            ],
            [
                'correlative' => 'home-about-cardone',
                'name' => 'Misión',
                'description' => '<p>Ofrecer servicios de mantenimiento multimarca, garantizando la total seguridad y confianza de nuestros clientes en Lima.</p>',
                'icon' => '21f306ca-a218-4d80-9881-1424bc5c8ecc.png',
                'image' => '7bb447e6-3c68-45f7-a8de-40a4061446ae.webp',
            ],
            [
                'correlative' => 'home-about-cardsecond',
                'name' => 'Visión',
                'description' => '<p>Ser el taller mec&aacute;nico l&iacute;der y referente del pa&iacute;s, reconocido por nuestra transparencia, excelencia t&eacute;cnica y soluciones integrales.</p>',
                'icon' => '8f635f34-fd30-43b6-bc63-ad25a1f84990.png',
                'image' => 'f78b147f-f508-4915-bbd1-d6ddaebceab7.webp',
            ],
            [
                'correlative' => 'home-category-section',
                'name' => 'Encuentra el envase ideal para tus productos',
            ],
            [
                'correlative' => 'home-tecnician-title',
                'name' => 'Somos tu taller mecánico automotriz de confianza',
            ],
            [
                'correlative' => 'home-tecnico-section',
                'name' => 'Sobre Nosotros',
                'description' => '<p>En Apunto Motors, nos consolidamos como el aliado estrat&eacute;gico para el cuidado de tu veh&iacute;culo, bas&aacute;ndonos en la excelencia y la transparencia. Con a&ntilde;os de experiencia en el sector automotriz, nuestro equipo de t&eacute;cnicos certificados utiliza infraestructura moderna para ofrecer servicios integrales que superan las expectativas m&aacute;s exigentes.</p>\r\n\r\n<p>Nuestra propuesta de valor se centra en un diagn&oacute;stico preciso y honesto, garantizando que cada unidad reciba el tratamiento especializado que merece bajo estrictos protocolos de seguridad y profesionalismo.</p>',
                'image' => 'd5e2360c-abf8-492b-a021-a71af415af29.webp',
                'button_text' => 'Más información',
            ],
            [
                'correlative' => 'home-certified-section',
                'name' => 'Certificado para INDECI',
                'description' => '<p>Respecto a Sistemas de Alarma contra Incendio cumplimos con todas las exigencias y recomendaciones de los fabricantes para el control, instalacion, y mantenimiento de estos sistemas.</p><p>Finalizado el servicio se otorgar&aacute; un certificado de operatividad que le ser&aacute; de utilidad al momento de la inspecci&oacute;n INDECI</p>',
                'image' => 'c81eec32-7d6c-4556-87b9-53780851cbf4.webp',
            ],
            [
                'correlative' => 'home-brands-section',
                'name' => '¿Por qué escogernos?',
                'subtitle' => 'Nuestros clientes nos prefieren',
            ],
            [
                'correlative' => 'home-contact-section',
                'name' => 'Ponte en contacto',
                'description' => '<p>&iquest;Tu veh&iacute;culo necesita atenci&oacute;n experta? No permitas que un peque&ntilde;o ruido se convierta en una falla mayor. En Apunto Motors estamos listos para brindarte la asesor&iacute;a t&eacute;cnica que necesitas con precios transparentes y atenci&oacute;n personalizada. <strong>&iexcl;Cont&aacute;ctanos hoy mismo y conduce con total tranquilidad!</strong></p>',
                'subtitle' => 'Tambien puedes enviarnos un mensaje',
                'button_text' => 'Enviar mensaje',
            ],
            [
                'correlative' => 'home-clients-section',
                'name' => 'Nuestros Clientes',
                'description' => '<p>En Apunto Motors atendemos a una comunidad diversa, desde conductores particulares que buscan la m&aacute;xima seguridad familiar hasta empresas que requieren una gesti&oacute;n de flotas eficiente y puntual. Nuestros clientes valoran la transparencia en cada presupuesto y la precisi&oacute;n t&eacute;cnica, confiando en nosotros para mantener su movilidad sin contratiempos.</p>\r\n\r\n<p>Garantizamos la durabilidad de tu inversi&oacute;n y tu total confianza al volante a trav&eacute;s de soluciones mec&aacute;nicas expertas para cada cliente.</p>',
                'icon' => 'dcbc27d1-73ae-4570-89d9-5c857611ee2e.png',
                'image' => 'bc22b54d-6788-4a0c-883b-831757416c8c.mp4',
            ],
            [
                'correlative' => 'services-title-section',
                'name' => 'Servicio',
                'description' => '<p>En Vitromaxx cuenta con el mejor servicio <strong>post-venta</strong> y pone a su disposici&oacute;n el personal calificado para desarrollar los servicios a continuaci&oacute;n:</p>',
            ],
            [
                'correlative' => 'products-intercomunicadores-section',
                'name' => 'Intercomunicadores',
                'description' => '<p>Los sistemas de intercomunicadores permiten identificar a las personas desde el momento en que habla con ellos a través del intercomunicador o portero, de la misma forma que usted se comunica por un teléfono convencional o monitor.</p>',
                'image' => '2d04a0f7-6004-4101-8c0f-b79fe5d7488d.png',
                'button_text' => 'Ver todos los productos',
            ],
            [
                'correlative' => 'products-intercomunicadoressecond-1benefit',
                'name' => 'Seguridad Integral',
                'description' => '<p>Evite el riesgo de permitir el acceso a personas extra&ntilde;as mediante la identificaci&oacute;n inmediata por voz o monitor.</p>',
            ],
            [
                'correlative' => 'products-intercomunicadoressecond-2benefit',
                'name' => 'Control de Acceso',
                'description' => '<p>Gestione la apertura de puertas con chapas el&eacute;ctricas de forma remota, brindando tranquilidad a su familia.</p>',
            ],
            [
                'correlative' => 'products-intercomunicadoressecond-3benefit',
                'name' => 'Conexión del Hogar',
                'description' => '<p>Optimice la coordinaci&oacute;n interna con sistemas que conectan eficientemente todas las habitaciones de su vivienda.</p>',
            ],
            [
                'correlative' => 'products-videoporteros-section',
                'name' => 'Videoporteros',
                'description' => '<p>El videoportero es un equipo intercomunicador que tiene una c&aacute;mara incorporada al portero, se encarga de enviar audio y video a un monitor dentro de su casa u oficina donde puede ver a las personas que tocan la puerta, evitando el riesgo de abrir la puerta a personas extra&ntilde;as, no autorizadas.&nbsp;</p>',
                'image' => '81fe7aa4-fe41-48e6-b4a1-106b989777f0.png',
                'button_text' => 'Ver todos los productos',
            ],
            [
                'correlative' => 'products-videoporteros-1benefit',
                'name' => 'Videovigilancia Móvil',
                'description' => '<p>Videoporteros inteligentes cuentan con <strong>apps de Apple y Android</strong> y pueden simular a un monitor de forma remota.</p>',
            ],
            [
                'correlative' => 'products-videoporteros-2benefit',
                'name' => 'Evidencia y Registro',
                'description' => '<p>Los videoporteros cuentan con <strong>almacenamiento autom&aacute;tico de llamadas en audio e imagen.</strong></p>',
            ],
            [
                'correlative' => 'products-videoporteros-3benefit',
                'name' => 'Acceso sin llaves',
                'description' => '<p>El uso de&nbsp;<strong>tarjetas de proximidad (RFID)</strong>, permiten que las personas autorizadas ingresen con solo acercar su credencial</p>',
            ],
            [
                'correlative' => 'products-incendios-section',
                'name' => 'Alarma contra Incendios',
                'description' => '<p>Una alarma contra incendio ofrece seguridad y detecci&oacute;n temprana de humo o fuego. Protegen tu hogar y oficina.</p><p>Realizamos ejecuci&oacute;n de proyectos integrales, desde la asesor&iacute;a a la implementaci&oacute;n y puesta en marcha del sistema.&nbsp;</p>',
                'image' => 'd9a76b4e-2f3c-4fdd-8b76-61f3fa9b461d.webp',
            ],
            [
                'correlative' => 'products-incendios-1benefit',
                'name' => 'Certificación',
                'description' => '<p>Realizamos los Protocolos para efectos de inspecci&oacute;n de Defensa Civil (INDECI) para nuestros clientes</p>',
            ],
            [
                'correlative' => 'products-incendios-2benefit',
                'name' => 'Documentación',
                'description' => '<p>Suministramos con nuestras obras los documentos necesarios para su funcionamiento y cuidado (Planos, manuales y otros similares)</p>',
            ],
            [
                'correlative' => 'products-incendios-3benefit',
                'name' => 'Marcas reconocidas',
                'description' => '<p>Contamos con equipos de marcas reconocidas del mercado (Mircom, Napco, Bosch, DSC) normados seg&uacute;n la NFPA.&nbsp;</p>',
            ],
            [
                'correlative' => 'products-alarmas-1section',
                'name' => 'Alarmas contra robo',
                'description' => '<p>Un sistema de alarma contra robo es un conjunto integrado de dispositivos electr&oacute;nicos dise&ntilde;ados para&nbsp;<strong>detectar la presencia de intrusos</strong>&nbsp;en una propiedad.</p>',
                'image' => 'c097b2b8-1608-45ff-a03e-ec5b02d230a2.webp',
            ],
            [
                'correlative' => 'products-alarmas-2section',
                'name' => 'Equipos y accesorios de alarmas contra robo',
                'description' => '<p>Realizamos ejecuci&oacute;n de proyectos integrales, desde la asesor&iacute;a a la implementaci&oacute;n y puesta en marcha del sistema. Nuestro servicio tambi&eacute;n abarca el Mantenimiento, Reparaci&oacute;n, Ampliaci&oacute;n, Traslado y Configuraci&oacute;n de sistemas ya instalados.</p>',
                'image' => '5e83a134-94d2-4bc0-ad6c-57e29ba04132.webp',
            ],
            [
                'correlative' => 'products-hospitalario-1section',
                'name' => 'Intercomunicador Hospitalario',
                'description' => '<p>Un Sistema de Intercomunicaci&oacute;n Hospitalaria es una red de comunicaci&oacute;n avanzada dise&ntilde;ada para permitir a los pacientes solicitar asistencia r&aacute;pidamente y facilitar la coordinaci&oacute;n entre el personal de enfermer&iacute;a y m&eacute;dico.</p>',
                'image' => '09d404b5-f904-42ca-acf2-d08d1d84d268.webp',
            ],
            [
                'correlative' => 'products-hospitalario-2section',
                'name' => 'Equipos y accesorios de intercomunicador hospitalario',
                'description' => '<p>Optimice la gesti&oacute;n asistencial con nuestros sistemas de intercomunicaci&oacute;n hospitalaria de alta fidelidad. Ofrecemos soluciones integrales que incluyen centrales de enfermer&iacute;a, pulsadores de cama, tiradores de ba&ntilde;o y se&ntilde;al&eacute;tica luminosa.</p>',
                'image' => '8e955fd3-7f1a-49c0-861b-b2b2cc416ffd.webp',
            ],
            [
                'correlative' => 'products-cerco-1section',
                'name' => 'Cercos eléctricos',
                'description' => '<p>El cerco el&eacute;ctrico es la barrera de seguridad&nbsp;<strong>m&aacute;s eficaz y visible</strong>&nbsp;para proteger el per&iacute;metro de tu propiedad.</p>',
                'image' => '7668457a-7445-42ed-988f-39858ea2f1e3.webp',
            ],
            [
                'correlative' => 'products-cerco-2section',
                'name' => 'Equipos y accesorios de cercos eléctricos',
                'description' => '<p>Sistemas de cercado el&eacute;ctrico certificados para seguridad industrial y residencial. Ofrecemos una gama completa de accesorios: desde cables de acero inoxidable de alta conductividad hasta sensores de flexi&oacute;n.</p>',
                'image' => '1e2baba4-51f3-4008-a790-9fc4b82a21ff.webp',
            ],
            [
                'correlative' => 'head-section-services',
                'name' => 'Conoce nuestros servicios',
                'subtitle' => 'Nuestros años de experiencia nos permiten ofrecer servicios de excelencia',
            ],
        ];

        foreach ($aboutuses as $aboutus) {
            Aboutus::updateOrCreate(['correlative' => $aboutus['correlative']], $aboutus);
        }
    }
}
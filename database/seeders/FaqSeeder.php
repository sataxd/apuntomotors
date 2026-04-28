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
                'name' => '¿Qué tipo de productos ofrecen?',
                'description' => 'Ofrecemos una amplia gama de envases de vidrio para la industria de alimentos y bebidas. Nuestro catálogo incluye frascos para conservas, botellas para vinos y licores (desde miniaturas de 50 ml hasta formatos de 750 ml), botellas novedosas (como los modelos Huaco, Orangután y Cráneo), damajuanas, vasos, copas y accesorios.'
            ],
            [
                'name' => '¿Venden por unidad o solo al por mayor?',
                'description' => 'Atendemos principalmente requerimientos al por mayor para emprendedores y empresas; por ello, la venta de nuestros envases se realiza por caja cerrada. La cantidad de unidades exactas por caja varía dependiendo del modelo y tamaño del producto.'
            ],
            [
                'name' => '¿Realizan servicios de personalización para los envases?',
                'description' => '¡Sí! Brindamos servicios de personalización para darle identidad a tu marca. Contamos con servicio de serigrafía y venta de envases con acabado pavonado. Además, ofrecemos el servicio de grabado para tapas rosca, tapones y cápsulas (la venta de complementos grabados se realiza solo por millar). Puedes comunicarte directamente al +51 991 542 541 para cotizar la personalización de tu proyecto.'
            ],
            [
                'name' => '¿Los frascos y botellas incluyen sus respectivas tapas?',
                'description' => 'Varios de nuestros productos, como ciertos modelos de frascos, miniaturas y promociones específicas, incluyen la tapa, tapón o cápsula dentro del precio indicado. Para otros modelos, las tapas o corchos se adquieren por separado según las necesidades de tu producto.'
            ],
              [
                'name' => '¿Tienen envases específicos para licores de alta gama o artesanales?',
                'description' => 'Sí, contamos con una línea exclusiva de Botellas Premium fabricadas con vidrio Extra Flint, que ofrecen una transparencia cristalina y un brillo superior. Esta línea es ideal para licores finos, piscos artesanales y destilados de exportación. Para procesos de fermentación y macerados artesanales, también contamos con damajuanas de vidrio de hasta 4 litros.'
            ],
              [
                'name' => '¿Cómo puedo realizar un pedido o comunicarme con un asesor?',
                'description' => 'Puedes realizar tus pedidos o solicitar asesoría a través de nuestros canales de atención telefónica y WhatsApp: 964 223 943, 967 602 801 o 991 542 541. También puedes escribirnos al correo ventas@vitromaxxperu.com o visitarnos en nuestra tienda ubicada en la Calle San Germán MZ A LT 16 A, San Martín de Porres (Referencia: Tottus de la Av. Central).'
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::updateOrCreate(['name' => $faq['name']], $faq);
        }
    }
}

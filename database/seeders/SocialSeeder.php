<?php

namespace Database\Seeders;

use App\Models\Social;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SocialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $socials = [
            [
                'name' => 'Apunto Motors',
                'description' => 'Instagram',
                'icon' => 'fab fa-instagram',
                'link' => 'https://www.instagram.com/apuntomotors/'
            ],
            [
                'name' => 'Apunto Motors',
                'description' => 'Facebook',
                'icon' => 'fab fa-facebook-f',
                'link' => 'https://web.facebook.com/profile.php?id=61573249179061'
            ],
            [
                'name' => 'Apunto Motors',
                'description' => 'WhatsApp',
                'icon' => 'fab fa-whatsapp',
                'link' => 'https://api.whatsapp.com/send?phone=+51923508259&text=%C2%A1Hola%21+Quisiera+que+me+informe+sobre+los+servicios+de+Apunto Motors.'
            ],
        ];

        foreach ($socials as $social) {
            Social::updateOrCreate([
                'icon' => $social['icon']
            ], [
                'name' => $social['name'],
                'description' => $social['description'],
                'link' => $social['link']
            ]);
        }
    }
}
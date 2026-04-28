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
                'name' => 'Vitromaxx',
                'description' => 'Instagram',
                'icon' => 'fab fa-instagram',
                'link' => 'https://www.instagram.com/vitromaxxperuoficial/'
            ],
            [
                'name' => 'Vitromaxx',
                'description' => 'Facebook',
                'icon' => 'fab fa-facebook-f',
                'link' => 'https://www.facebook.com/envasesvitromax'
            ],
            [
                'name' => 'Vitromaxx',
                'description' => 'WhatsApp',
                'icon' => 'fab fa-whatsapp',
                'link' => 'https://api.whatsapp.com/send?phone=+51991542541&text=' . urlencode('¡Hola! Quisiera que me informe sobre los producto de Vitromaxx.')
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

<?php

namespace App\Services;

use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\Post; 
use App\Models\Services; // <--- 1. Importa el modelo de tus servicios (cambia el nombre si tu modelo es diferente)

class SitemapGenerator
{
    public function generate()
    {
        $sitemap = Sitemap::create();

        // 1. URLs estáticas públicas (basadas en tus rutas actuales activas)
        $sitemap->add(Url::create('/')->setPriority(1.0)->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY));
        $sitemap->add(Url::create('/nosotros')->setPriority(0.8));
        $sitemap->add(Url::create('/contacto')->setPriority(0.8));
        $sitemap->add(Url::create('/servicios')->setPriority(0.9));

        Services::all()->each(function (Services $service) use ($sitemap) {
            $url = Url::create("/servicios/{$service->slug}")
                ->setLastModificationDate($service->updated_at)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                ->setPriority(0.8);

            $sitemap->add($url);
        });

        $sitemap->add(Url::create('/terminos-y-condiciones')->setPriority(0.3));
        $sitemap->add(Url::create('/politicas-de-privacidad')->setPriority(0.3));
        $sitemap->add(Url::create('/libro-de-reclamaciones')->setPriority(0.5));
        $sitemap->add(Url::create('/blog')->setPriority(0.9));

        // 2. URLs dinámicas: Artículos del blog
        Post::all()->each(function (Post $post) use ($sitemap) {
            $url = Url::create("/blog/{$post->slug}")
                ->setLastModificationDate($post->updated_at)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                ->setPriority(0.7);

            $sitemap->add($url);
        });

        return $sitemap;
    }
}
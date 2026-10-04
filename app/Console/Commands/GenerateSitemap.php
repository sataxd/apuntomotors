<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Services;
use App\Models\Post;
use Carbon\Carbon;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate {--url= : URL base del sitio web (ej. https://apuntomotors.com)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Genera y actualiza el archivo public/sitemap.xml estático';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $baseUrl = rtrim($this->option('url') ?: config('app.url'), '/');
        $now = now()->toAtomString();

        $this->info("Generando sitemap para: {$baseUrl}");

        $staticRoutes = [
            ['path' => '', 'priority' => '1.0', 'freq' => 'weekly'],
            ['path' => '/nosotros', 'priority' => '0.8', 'freq' => 'monthly'],
            ['path' => '/servicios', 'priority' => '0.9', 'freq' => 'weekly'],
            ['path' => '/blog', 'priority' => '0.9', 'freq' => 'daily'],
            ['path' => '/contacto', 'priority' => '0.8', 'freq' => 'monthly'],
            ['path' => '/terminos-y-condiciones', 'priority' => '0.3', 'freq' => 'yearly'],
            ['path' => '/politicas-de-privacidad', 'priority' => '0.3', 'freq' => 'yearly'],
            ['path' => '/libro-de-reclamaciones', 'priority' => '0.3', 'freq' => 'yearly'],
        ];

        $services = Services::where('status', true)->where('visible', true)->get();
        $posts = Post::where('status', true)->get();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;

        // Rutas estáticas
        foreach ($staticRoutes as $r) {
            $xml .= '    <url>' . PHP_EOL;
            $xml .= '        <loc>' . htmlspecialchars($baseUrl . $r['path']) . '</loc>' . PHP_EOL;
            $xml .= '        <lastmod>' . $now . '</lastmod>' . PHP_EOL;
            $xml .= '        <changefreq>' . $r['freq'] . '</changefreq>' . PHP_EOL;
            $xml .= '        <priority>' . $r['priority'] . '</priority>' . PHP_EOL;
            $xml .= '    </url>' . PHP_EOL;
        }

        // Servicios
        foreach ($services as $service) {
            $date = $service->updated_at ? $service->updated_at->toAtomString() : $now;
            $xml .= '    <url>' . PHP_EOL;
            $xml .= '        <loc>' . htmlspecialchars($baseUrl . '/servicios/' . $service->slug) . '</loc>' . PHP_EOL;
            $xml .= '        <lastmod>' . $date . '</lastmod>' . PHP_EOL;
            $xml .= '        <changefreq>weekly</changefreq>' . PHP_EOL;
            $xml .= '        <priority>0.9</priority>' . PHP_EOL;
            $xml .= '    </url>' . PHP_EOL;
        }

        // Posts del blog
        foreach ($posts as $post) {
            $date = $post->updated_at ? $post->updated_at->toAtomString() : ($post->post_date ? Carbon::parse($post->post_date)->toAtomString() : $now);
            $postIdentifier = $post->slug ?: $post->id;
            $xml .= '    <url>' . PHP_EOL;
            $xml .= '        <loc>' . htmlspecialchars($baseUrl . '/blog/' . $postIdentifier) . '</loc>' . PHP_EOL;
            $xml .= '        <lastmod>' . $date . '</lastmod>' . PHP_EOL;
            $xml .= '        <changefreq>weekly</changefreq>' . PHP_EOL;
            $xml .= '        <priority>0.8</priority>' . PHP_EOL;
            $xml .= '    </url>' . PHP_EOL;
        }

        $xml .= '</urlset>';

        $destinationPath = public_path('sitemap.xml');
        file_put_contents($destinationPath, $xml);

        $totalUrls = count($staticRoutes) + $services->count() + $posts->count();
        $this->info("✓ Sitemap generado con éxito en: {$destinationPath}");
        $this->info("✓ Total de URLs indexadas: {$totalUrls}");

        return Command::SUCCESS;
    }
}

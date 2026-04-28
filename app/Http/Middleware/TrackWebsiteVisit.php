<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\WebsiteStatistic;
use Jenssegers\Agent\Agent;

class TrackWebsiteVisit
{
    public function handle(Request $request, Closure $next)
    {
        // Detectar datos del dispositivo
        if ($this->shouldTrack($request)) {
            $agent = new Agent();
            $ip = $request->ip();

            // Determinar tipo de dispositivo
            $deviceType = 'Unknown';
            if ($agent->isMobile()) {
                $deviceType = 'Móvil';
            } elseif ($agent->isTablet()) {
                $deviceType = 'Tablet';
            } else {
                $deviceType = 'Escritorio';
            }

            // Determinar fuente
            $referrer = $request->headers->get('referer') ?? 'Directo/otros';
            $source = 'Directo/otros';

            if (str_contains($referrer, 'facebook.com')) {
                $source = 'Facebook';
            } elseif (str_contains($referrer, 'instagram.com')) {
                $source = 'Instagram';
            } elseif (str_contains($referrer, 'google.com')) {
                $source = 'Google';
            }

            // Guardar registro
            $statistic = WebsiteStatistic::create([
                'referrer' => $referrer,
                'source' => $source,
                'device' => $agent->device(),
                'device_type' => $deviceType,
                'os' => $agent->platform(),
                'browser' => $agent->browser(),
                'location' => $ip,
                'page' => $request->path(),
                'visited_at' => now(),
            ]);

            session()->put('website_statistic_id', $statistic->id);
        }

        return $next($request);
    }
    private function shouldTrack(Request $request): bool
    {
        // Puedes agregar lógica adicional aquí
        return true; // Por ahora rastreamos todas las visitas
    }
}

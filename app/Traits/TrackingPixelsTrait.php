<?php

namespace App\Traits;

use App\Models\General;
use Illuminate\Support\Facades\Cache;

trait TrackingPixelsTrait
{
    /**
     * Obtener píxeles de seguimiento desde la base de datos
     * con cache para evitar múltiples consultas
     */
    public function getTrackingPixels(): array
    {
        return Cache::remember('tracking_pixels', 3600, function () {
            $generals = General::whereIn('correlative', [
                'facebook_pixel',
                'meta_pixel',
                'google_analytics',
                'gtm_container',
                'tiktok_pixel',
                'microsoft_clarity'
            ])->pluck('description', 'correlative');

            return [
                'FACEBOOK_PIXEL' => $generals->get('facebook_pixel', ''),
                'META_PIXEL' => $generals->get('meta_pixel', ''),
                'GOOGLE_ANALYTICS' => $generals->get('google_analytics', ''),
                'GTM_CONTAINER' => $generals->get('gtm_container', ''),
                'TIKTOK_PIXEL' => $generals->get('tiktok_pixel', ''),
                'MICROSOFT_CLARITY' => $generals->get('microsoft_clarity', ''),
            ];
        });
    }

    /**
     * Obtener datos SEO desde la base de datos
     */
    public function getSeoData(): array
    {
        return Cache::remember('seo_data', 3600, function () {
            $seoGenerals = General::whereIn('correlative', [
                'seo_title',
                'seo_description', 
                'seo_keywords'
            ])->pluck('description', 'correlative');

            return [
                'seo_title' => $seoGenerals->get('seo_title', env('APP_NAME', 'Vuá')),
                'seo_description' => $seoGenerals->get('seo_description', ''),
                'seo_keywords' => $seoGenerals->get('seo_keywords', ''),
            ];
        });
    }

    /**
     * Limpiar cache de píxeles y SEO
     */
    public function clearTrackingCache(): void
    {
        Cache::forget('tracking_pixels');
        Cache::forget('seo_data');
    }
}

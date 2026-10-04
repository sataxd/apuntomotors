<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WebsiteStatistic;
use Illuminate\Support\Carbon;

class WebsiteStatisticSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Poblar con 100 registros de visitas aleatorias
        $referrers = ['google.com', 'facebook.com', 'twitter.com', 'direct', 'linkedin.com'];
        $sources = ['ad', 'organic', 'referral', 'email'];
        $devices = ['iPhone', 'Android', 'Windows PC', 'MacBook', 'iPad'];
        $deviceTypes = ['mobile', 'desktop', 'tablet'];
        $oss = ['iOS', 'Android', 'Windows', 'macOS', 'Linux'];
        $browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'];
        $locations = ['USA', 'UK', 'Canada', 'Australia', 'India'];
        $pages = ['/home', '/about', '/contact', '/pricing', '/blog'];

        for ($i = 0; $i < 100; $i++) {
            WebsiteStatistic::create([
            'referrer'    => $referrers[array_rand($referrers)],
            'source'      => $sources[array_rand($sources)],
            'device'      => $devices[array_rand($devices)],
            'device_type' => $deviceTypes[array_rand($deviceTypes)],
            'os'          => $oss[array_rand($oss)],
            'browser'     => $browsers[array_rand($browsers)],
            'location'    => $locations[array_rand($locations)],
            'page'        => $pages[array_rand($pages)],
            'visited_at'  => Carbon::now()->subMinutes(rand(0, 60 * 24 * 30)),
            ]);
        }
    }
}

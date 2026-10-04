<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;
use SoDe\Extend\Crypto;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   
    public function run(): void
    {
        Status::query()->delete();
        $statuses = [
            [
                'id' => 'f13fa605-72dd-4729-beaa-ee14c9bbc47b',
                'name' => 'Pendiente',
                'color' => '#6c757d',
                'editable' => false
            ],
            [
                'id' => '312f9a91-d3f2-4672-a6bf-678967616cac',
                'name' => 'Procesando',
                'color' => '#2BA824',
                'editable' => false
            ],
            
            [
                'id' => 'c063efb2-1e9b-4a43-8991-b444c14d30dd',
                'name' => 'Cancelado',
                'color' => '#323a46',
                'reversible' => false
            ],
         
            [
                'id' => 'bc012ef5-96e8-4bbb-867b-061c4090d9d2',
                'name' => 'Concluido',
                'color' => '#108CC4',
                'reversible' => false
            ],
        ];
        foreach ($statuses as $status) {
            Status::updateOrCreate(['name' => $status['name']], $status);
        }
    }
}

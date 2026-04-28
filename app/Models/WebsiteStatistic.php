<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebsiteStatistic extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'referrer',
        'source',
        'device',
        'device_type',
        'os',
        'browser',
        'location',
        'page',
        'visited_at',
    ];

    public function purchases()
    {
        return $this->hasManyThrough(Sale::class, StatisticSale::class, 'website_statistic_id', 'id', 'id', 'sale_id');
    }
}

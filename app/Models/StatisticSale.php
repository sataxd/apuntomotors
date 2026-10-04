<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatisticSale extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'statistics_sales';


    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['website_statistic_id', 'sale_id'];

    public function purchases()
    {
        return $this->hasManyThrough(Sale::class, StatisticSale::class, 'website_statistic_id', 'id', 'id', 'sale_id');
    }
}

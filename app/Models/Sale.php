<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sale extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'code',
        'dni',
        'user_id',
        'name',
        'lastname',
        'fullname',
        'email',
        'phone',
        'country',
        'department',
        'province',
        'district',
        'zip_code',
        'address',
        'number',
        'reference',
        'amount',
        'delivery',
        'method_shipping',
        'coupon_discount',
        'coupon_id',
        'total_amount',
        'status_id',
    ];



    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class);
    }


    public function coupon(): BelongsTo
    {
        return $this->belongsTo(Coupon::class);
    }

    public function formula(): BelongsTo
    {
        return $this->belongsTo(Formula::class);
    }

    public function bundle(): BelongsTo
    {
        return $this->belongsTo(Bundle::class);
    }

    public function renewal(): BelongsTo
    {
        return $this->belongsTo(Renewal::class);
    }

    public function details(): HasMany
    {
        return $this->hasMany(SaleDetail::class);
    }




    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function statistics()
    {
        return $this->belongsToMany(WebsiteStatistic::class, 'statistics_sales');
    }
}

<?php

namespace App\Observers;

use App\Models\Sale;

class SaleCreationObserver
{
    public function created(Sale $sale)
    {
        $total_amount = $sale->amount;

        if ($sale->bundle_discount) $total_amount -= $sale->bundle_discount;
        if ($sale->renewal_discount) $total_amount -= $sale->renewal_discount;
        if ($sale->coupon_discount) $total_amount -= $sale->coupon_discount;
        if ($sale->delivery) $total_amount += $sale->delivery;

        Sale::where('id', $sale->id)
            ->update([
                'fullname' => $sale->name . ' ' . $sale->lastname,
                'total_amount' => $total_amount
            ]);
    }
}

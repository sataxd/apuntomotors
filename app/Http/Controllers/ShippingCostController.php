<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BasicController;
use App\Models\ShippingCost;
use Illuminate\Http\Request;

class ShippingCostController extends BasicController
{
    /**
     * ===================================================================
     * ENDPOINT PARA EL CHECKOUT (React Client)
     * Ruta sugerida en api.php: Route::post('/shipping/calculate', [ShippingCostController::class, 'calculate'])
     * ===================================================================
     */
    public function calculate(Request $request)
    {
        $request->validate([
            'zone' => 'required|string',
            'district_id' => 'required|string' // AHORA RECIBIMOS EL ID (Ej: '150103' para Ate)
        ]);

        $zone = $request->zone;
        $districtId = trim($request->district_id);

        $shipping = ShippingCost::where('zone', $zone)
            ->where('status', true)
            ->where('visible', true)
            ->whereJsonContains('districts', $districtId) // Busca si el ID está en el JSON
            ->first();

        if (!$shipping) {
            $shipping = ShippingCost::where('zone', $zone)
                ->where('status', true)
                ->where('visible', true)
                ->whereNull('districts')
                ->first();
        }

        if ($shipping) {
            return response()->json(['status' => 200, 'data' => $shipping]);
        }

        return response()->json(['status' => 404, 'message' => 'Sin cobertura'], 404);
    }
}
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\District;
use App\Models\ShippingCost;
use Illuminate\Http\Request;

class ShippingCostController extends BasicController
{
    public $model = ShippingCost::class;
    public $reactView = 'Admin/ShippingCost';

    public function setReactViewProperties(Request $request)
    {
        return [];
    }

    /**
     * Interceptamos los datos ANTES de que BasicController los guarde.
     * Convertimos el texto de distritos en un Array JSON real.
     */
    public function beforeSave(Request $request)
    {
        $body = $request->all();

        if (isset($body['districts']) && is_array($body['districts']) && count($body['districts']) > 0) {
            // Limpiamos valores nulos y reindexamos
            $body['districts'] = array_values(array_filter($body['districts']));
        } else {
            $body['districts'] = null; 
        }

        return $body;
    }


    public function getAvailableDistricts(Request $request)
    {
        $provinceId = $request->province_id;
        $currentId = $request->current_id; // ID del registro que estamos editando (para no excluir sus propios distritos)

        if (!$provinceId) return response()->json([]);

        // 1. Obtener los IDs de todos los distritos que ya están guardados en la BD
        $query = ShippingCost::whereNotNull('districts');
        
        if ($currentId) {
            $query->where('id', '!=', $currentId);
        }
        
        $usedDistricts = [];
        foreach ($query->get() as $cost) {
            if (is_array($cost->districts)) {
                $usedDistricts = array_merge($usedDistricts, $cost->districts);
            }
        }
        $usedDistricts = array_unique($usedDistricts);

        // 2. Buscar los distritos de la provincia solicitada, excluyendo los ya usados
        $districts = District::where('province_id', $provinceId)
            ->whereNotIn('id', $usedDistricts)
            ->get(['id', 'description as name']);

        return response()->json($districts);
    }

}
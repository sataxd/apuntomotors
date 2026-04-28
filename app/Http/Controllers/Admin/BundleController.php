<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Bundle;
use App\Models\BundleItem;
use Illuminate\Http\Request;

class BundleController extends BasicController
{
    public $model = Bundle::class;
    public $reactView = 'Bundles';
    public $reactRootView = 'admin';

    public function setPaginationInstance(string $model)
    {
        return $model::with(['items']);
    }

    public function afterSave(Request $request, object $jpa, bool $isNew)
    {
        $items = $request->items;
        BundleItem::where('bundle_id', $jpa->id)->whereNotIn('item_id', $items)->delete();
        if (\count($items) > 0) {
            foreach ($items as $item) {
                BundleItem::updateOrCreate(['bundle_id' => $jpa->id, 'item_id' => $item]);
            }
            $jpa->includes_all_items = false;
        } else {
            $jpa->includes_all_items = true;
        }
        $jpa->save();
    }
}

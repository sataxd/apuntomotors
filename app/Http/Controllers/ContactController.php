<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\General;
use Illuminate\Http\Request;

class ContactController extends BasicController
{
    public $reactView = 'Contact';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $generals = General::all();
        $faqsJpa = Faq::select()
            ->where('visible', true)
            ->where('status', true)
            ->get();
        return [
            'generals' => $generals,
            'faqs' => $faqsJpa
        ];
    }
}

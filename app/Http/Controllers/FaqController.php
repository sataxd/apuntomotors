<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Http\Requests\StoreFaqRequest;
use App\Http\Requests\UpdateFaqRequest;
use Illuminate\Http\Request;

class FaqController extends BasicController
{
    public $reactView = 'FAQs';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $faqsJpa = Faq::select()
            ->where('visible', true)
            ->where('status', true)
            ->get();
        return [
            'faqs' => $faqsJpa
        ];
    }
}

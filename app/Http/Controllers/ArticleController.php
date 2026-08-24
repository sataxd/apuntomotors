<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class ArticleController extends BasicController
{
    public $reactView = 'BlogArticle';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        if (!$request->slug) return redirect()->route('Blog.jsx');

        $currentArticle = Post::with(['category', 'tags'])->where('slug', $request->slug)->first();
     
        $nextArticle = Post::select(['name', 'slug'])
            ->where('post_date', '>', $currentArticle->post_date)
            ->orderBy('post_date', 'asc')
            ->first();

        $previousArticle = Post::select(['name', 'slug'])
            ->where('post_date', '<', $currentArticle->post_date)
            ->orderBy('post_date', 'desc')
            ->first();

        return [
            'previousArticle' => $previousArticle,
            'article' => $currentArticle,
            'nextArticle' => $nextArticle
        ];
    }
}

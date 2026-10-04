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
        if (!$request->articleId) return redirect()->route('Blog.jsx');

        $identifier = $request->articleId;

        $currentArticle = Post::with(['category', 'tags'])
            ->where('slug', $identifier)
            ->orWhere('id', $identifier)
            ->firstOrFail();

        // Si se accede mediante el UUID antiguo y existe un slug amigable, redirigir con 301 para SEO
        if ($currentArticle->slug && $identifier === $currentArticle->id) {
            return redirect()->to(url("/blog/{$currentArticle->slug}"), 301);
        }

        $nextArticle = Post::select(['name', 'id', 'slug'])
            ->where('post_date', '>', $currentArticle->post_date)
            ->orderBy('post_date', 'asc')
            ->first();

        $previousArticle = Post::select(['name', 'id', 'slug'])
            ->where('post_date', '<', $currentArticle->post_date)
            ->orderBy('post_date', 'desc')
            ->first();

        $brandSuffix = ' | Apunto Motors';
        $fallbackTitle = (mb_strlen($currentArticle->name . $brandSuffix) > 65)
            ? \Illuminate\Support\Str::limit($currentArticle->name, 65 - mb_strlen($brandSuffix)) . $brandSuffix
            : $currentArticle->name . $brandSuffix;

        $seoTitle = !empty($currentArticle->meta_title) ? $currentArticle->meta_title : $fallbackTitle;
        $seoDescription = !empty($currentArticle->meta_description)
            ? $currentArticle->meta_description
            : \Illuminate\Support\Str::limit(strip_tags($currentArticle->summary ?? $currentArticle->description ?? ''), 155);
        $seoKeywords = !empty($currentArticle->meta_keywords) ? $currentArticle->meta_keywords : null;

        $friendlySlug = $currentArticle->slug ?: $currentArticle->id;

        return [
            'previousArticle' => $previousArticle,
            'article' => $currentArticle,
            'nextArticle' => $nextArticle,
            'seo_title' => $seoTitle,
            'seo_description' => $seoDescription,
            'seo_keywords' => $seoKeywords,
            'seo_image' => $currentArticle->image ? url("/api/posts/media/{$currentArticle->image}") : asset('assets/img/logoapuntomotor.png'),
            'canonical_url' => url("/blog/{$friendlySlug}"),
            'seo_type' => 'article',
        ];
    }
}

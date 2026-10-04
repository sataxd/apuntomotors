<?php

use Illuminate\Support\Facades\Route;

// Admin
use App\Http\Controllers\Admin\AboutusController as AdminAboutusController;
use App\Http\Controllers\Admin\ServicesController as AdminServicesController;
use App\Http\Controllers\Admin\HomeController as AdminHomeController;
use App\Http\Controllers\Admin\IndicatorController as AdminIndicatorController;
use App\Http\Controllers\Admin\ShippingCostController as AdminShippingCostController;
use App\Http\Controllers\Admin\SliderController as AdminSliderController;
use App\Http\Controllers\Admin\TestimonyController as AdminTestimonyController;
use App\Http\Controllers\Admin\SubscriptionController as AdminSubscriptionController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\SubcategoryController as AdminSubcategoryController;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\Admin\SocialController as AdminSocialController;
use App\Http\Controllers\Admin\StrengthController as AdminStrengthController;
use App\Http\Controllers\Admin\CoreValueController as AdminCoreValueController;
use App\Http\Controllers\Admin\GeneralController as AdminGeneralController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\AccountController as AdminAccountController;
use App\Http\Controllers\Admin\ItemController as AdminItemController;
use App\Http\Controllers\Admin\ItemColorController as AdminItemColorController;
use App\Http\Controllers\Admin\InstagramPostController as AdminInstagramPostsController;
use App\Http\Controllers\Admin\ItemSizeController as AdminItemSizeController;
use App\Http\Controllers\Admin\FaqController as AdminFaqController;
use App\Http\Controllers\Admin\FormulaController as AdminFormulaController;
use App\Http\Controllers\Admin\SupplyController as AdminSupplyController;
use App\Http\Controllers\Admin\TagController as AdminTagController;
use App\Http\Controllers\Admin\AdController as AdminAdController;
use App\Http\Controllers\Admin\FragranceController as AdminFragranceController;
use App\Http\Controllers\Admin\RenewalController as AdminRenewalController;
use App\Http\Controllers\Admin\BundleController as AdminBundleController;
use App\Http\Controllers\Admin\CouponController as AdminCouponController;
use App\Http\Controllers\Admin\SaleController as AdminSaleController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\ComplaintController as AdminComplaintController;

// Public 
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\AlarmaIncendioController;
use App\Http\Controllers\AlarmaRobosController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DetailController;
use App\Http\Controllers\ElectricoController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\FormulaController;
use App\Http\Controllers\HospitalarioController;
use App\Http\Controllers\InstructionController;
use App\Http\Controllers\IntercomunicatorController;
use App\Http\Controllers\LoginVuaController;
use App\Http\Controllers\MyAccountController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\PopupController;
use App\Http\Controllers\PrivacyController;
use App\Http\Controllers\ReturnPoliticsController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\ShippingPoliticsController;
use App\Http\Controllers\SupplyController;
use App\Http\Controllers\TermsController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\TestResultController;
use App\Http\Controllers\ThankController;
use App\Http\Controllers\VideoporterosController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Public routes
Route::get('/', [HomeController::class, 'reactView'])->name('Home.jsx');
Route::get('/nosotros', [AboutController::class, 'reactView'])->name('About.jsx');
Route::get('/contacto', [ContactController::class, 'reactView'])->name('Contact.jsx');
Route::get('/catalogo', [CatalogController::class, 'reactView'])->name('CatalogProducts.jsx');
Route::get('/catalogo/{category_slug}', [CatalogController::class, 'reactView'])->name('CatalogProducts.category.jsx');
Route::get('/catalogo/{category_slug}/{subcategory_slug}', [CatalogController::class, 'reactView'])->name('CatalogProducts.subcategory.jsx');
Route::get('/producto/{category_slug}/{subcategory_slug}/{slug}', [DetailController::class, 'reactView'])->name('DetailProduct.subcategory.jsx');
Route::get('/producto/{category_slug}/{slug}', [DetailController::class, 'reactView'])->name('DetailProduct.jsx');
Route::get('/servicios', [ServiceController::class, 'reactView'])->name('ServicesAll.jsx');
Route::get('/servicios/{slug}', [ServicesController::class, 'reactView'])->name('Services.jsx');
// Route::get('/producto/{slug}', [DetailController::class, 'reactView'])->name('DetailProduct.jsx');
Route::get('/terminos-y-condiciones', [TermsController::class, 'reactView'])->name('Terms.jsx');
Route::get('/politicas-de-privacidad', [PrivacyController::class, 'reactView'])->name('Privacy.jsx');
Route::get('/politicas-de-envios', [ShippingPoliticsController::class, 'reactView'])->name('ShippingPolitics.jsx');
Route::get('/politicas-de-cambio-y-devolucion', [ReturnPoliticsController::class, 'reactView'])->name('ReturnPolitics.jsx');
Route::get('/libro-de-reclamaciones', [ComplaintController::class, 'reactView'])->name('ComplaintsBook.jsx');




// Route::get('/intercomunicadores', [IntercomunicatorController::class, 'reactView'])->name('Intercomunicadores.jsx');
// Route::get('/videoporteros', [VideoporterosController::class, 'reactView'])->name('Videoporteros.jsx');
// Route::get('/alarma-contra-incendios', [AlarmaIncendioController::class, 'reactView'])->name('AlarmaIncendios.jsx');
// Route::get('/sistema-de-alarma-contra-robo', [AlarmaRobosController::class, 'reactView'])->name('AlarmaRobos.jsx');
// Route::get('/intercomunicador-hospitalario', [HospitalarioController::class, 'reactView'])->name('Hospitalario.jsx');
// Route::get('/sistema-de-cerco-electrico', [ElectricoController::class, 'reactView'])->name('CercoElectrico.jsx');

Route::get('/blog', [BlogController::class, 'reactView'])->name('Blog.jsx');
Route::get('/blog/{articleId}', [ArticleController::class, 'reactView'])->name('BlogArticle.jsx');

//Route::get('/instructions', [InstructionController::class, 'reactView'])->name('Instructions.jsx');
//Route::get('/quiz', [CatalogController::class, 'reactView'])->name('Quiz.jsx');
//Route::get('/plans', [PlanController::class, 'reactView'])->name('Plans.jsx');
//Route::get('/supplies', [SupplyController::class, 'reactView'])->name('Supplies.jsx');
//Route::get('/faqs', [FaqController::class, 'reactView'])->name('FAQs.jsx');
//Route::get('/test', [TestController::class, 'reactView'])->name('Test.jsx');
//Route::get('/test/result/{formula}', [TestResultController::class, 'reactView'])->name('TestResult.jsx');


// Vistas maquetadas finalizadas
Route::get('/cart', [CartController::class, 'reactView'])->name('Cart.jsx');
Route::get('/checkout', [CheckoutController::class, 'reactView'])->name('Checkout.jsx');
Route::get('/formula/{formula}', [FormulaController::class, 'reactView'])->name('Formula.jsx');
Route::get('/thanks', [ThankController::class, 'reactView'])->name('Thanks.jsx');
Route::get('/popup', [PopupController::class, 'reactView'])->name('Popup.jsx');

Route::get('/login', [AuthController::class, 'loginView'])->name('Login.jsx');
Route::get('/register', [AuthController::class, 'registerView'])->name('Register.jsx');
Route::get('/confirm-email/{token}', [AuthController::class, 'confirmEmailView'])->name('ConfirmEmail.jsx');
Route::get('/confirmation/{token}', [AuthController::class, 'loginView'])->name('confirmation');

Route::middleware(['auth', 'can:Customer'])->group(function () {
    Route::get('/my-account', [MyAccountController::class, 'reactView'])->name('MyAccount.jsx');
});
// Admin routes
Route::middleware(['can:Admin', 'auth'])->prefix('admin')->group(function () {
    Route::get('/home-data', [AdminHomeController::class, 'setReactViewProperties']);
    // Endpoint para ventas por rango de fechas (gráfica personalizada)
    Route::get('/sales-by-range', [AdminHomeController::class, 'salesByDateRange']);
    Route::get('/', fn() => redirect('Admin/Messages.jsx'));
    Route::get('/home', [AdminHomeController::class, 'reactView'])->name('Admin/Home.jsx');
    Route::get('/sales', [AdminSaleController::class, 'reactView'])->name('Admin/Sales.jsx');
    Route::get('/posts', [AdminPostController::class, 'reactView'])->name('Admin/Posts.jsx');
    Route::get('/items', [AdminItemController::class, 'reactView'])->name('Admin/Items.jsx');
    Route::get('/colors', [AdminItemColorController::class, 'reactView'])->name('Admin/Colors.jsx');
    Route::get('/instagram_posts', [AdminInstagramPostsController::class, 'reactView'])->name('Admin/InstagramPosts.jsx');
    Route::get('/sizes', [AdminItemSizeController::class, 'reactView'])->name('Admin/Sizes.jsx');
    Route::get('/supplies', [AdminSupplyController::class, 'reactView'])->name('Admin/Supplies.jsx');
    Route::get('/gifts', [AdminSupplyController::class, 'reactView'])->name('Admin/Gifts.jsx');
    Route::get('/formulas', [AdminFormulaController::class, 'reactView'])->name('Admin/Formulas.jsx');
    Route::get('/fragrances', [AdminFragranceController::class, 'reactView'])->name('Admin/Fragrances.jsx');
    Route::get('/ads', [AdminAdController::class, 'reactView'])->name('Admin/Ads.jsx');
    Route::get('/renewals', [AdminRenewalController::class, 'reactView'])->name('Admin/Renewals.jsx');
    Route::get('/bundles', [AdminBundleController::class, 'reactView'])->name('Admin/Bundles.jsx');
    Route::get('/coupons', [AdminCouponController::class, 'reactView'])->name('Admin/Coupons.jsx');
    Route::get('/messages', [AdminSubscriptionController::class, 'reactView'])->name('Admin/Messages.jsx');
    Route::get('/subscriptions', [AdminSubscriptionController::class, 'reactView'])->name('Admin/Subscriptions.jsx');
    Route::get('/about', [AdminAboutusController::class, 'reactView'])->name('Admin/About.jsx');
    Route::get('/services', [AdminServicesController::class, 'reactView'])->name('Admin/Services.jsx');
    Route::get('/indicators', [AdminIndicatorController::class, 'reactView'])->name('Admin/Indicators.jsx');
    Route::get('/shipping', [AdminShippingCostController::class, 'reactView'])->name('Admin/ShippingCost.jsx');
    Route::get('/sliders', [AdminSliderController::class, 'reactView'])->name('Admin/Sliders.jsx');
    Route::get('/testimonies', [AdminTestimonyController::class, 'reactView'])->name('Admin/Testimonies.jsx');
    Route::get('/categories', [AdminCategoryController::class, 'reactView'])->name('Admin/Categories.jsx');
    Route::get('/subcategories', [AdminSubcategoryController::class, 'reactView'])->name('Admin/Subcategories.jsx');
    Route::get('/tags', [AdminTagController::class, 'reactView'])->name('Admin/Tags.jsx');
    Route::get('/faqs', [AdminFaqController::class, 'reactView'])->name('Admin/Faqs.jsx');
    Route::get('/socials', [AdminSocialController::class, 'reactView'])->name('Admin/Socials.jsx');
    Route::get('/strengths', [AdminStrengthController::class, 'reactView'])->name('Admin/Strengths.jsx');
    Route::get('/core_values', [AdminCoreValueController::class, 'reactView'])->name('Admin/CoreValues.jsx');
    Route::get('/generals', [AdminGeneralController::class, 'reactView'])->name('Admin/Generals.jsx');
    Route::get('/users', [AdminUserController::class, 'reactView'])->name('Admin/Users.jsx');
    Route::get('/complaints', [AdminComplaintController::class, 'reactView'])->name('Admin/Complaints.jsx');

    Route::get('/profile', [AdminProfileController::class, 'reactView'])->name('Admin/Profile.jsx');
    Route::get('/account', [AdminAccountController::class, 'reactView'])->name('Admin/Account.jsx');
});


Route::get('/mailing/new-formula', fn() => view('mailing.new-formula'));

Route::get('/sitemap.xml', function () {
    $baseUrl = rtrim(config('app.url'), '/');
    $now = now()->toAtomString();

    $staticRoutes = [
        ['path' => '', 'priority' => '1.0', 'freq' => 'weekly'],
        ['path' => '/nosotros', 'priority' => '0.8', 'freq' => 'monthly'],
        ['path' => '/servicios', 'priority' => '0.9', 'freq' => 'weekly'],
        ['path' => '/blog', 'priority' => '0.9', 'freq' => 'daily'],
        ['path' => '/contacto', 'priority' => '0.8', 'freq' => 'monthly'],
        ['path' => '/terminos-y-condiciones', 'priority' => '0.3', 'freq' => 'yearly'],
        ['path' => '/politicas-de-privacidad', 'priority' => '0.3', 'freq' => 'yearly'],
        ['path' => '/libro-de-reclamaciones', 'priority' => '0.3', 'freq' => 'yearly'],
    ];

    $services = \App\Models\Services::where('status', true)->where('visible', true)->get();
    $posts = \App\Models\Post::where('status', true)->get();

    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;

    foreach ($staticRoutes as $r) {
        $xml .= '    <url>' . PHP_EOL;
        $xml .= '        <loc>' . htmlspecialchars($baseUrl . $r['path']) . '</loc>' . PHP_EOL;
        $xml .= '        <lastmod>' . $now . '</lastmod>' . PHP_EOL;
        $xml .= '        <changefreq>' . $r['freq'] . '</changefreq>' . PHP_EOL;
        $xml .= '        <priority>' . $r['priority'] . '</priority>' . PHP_EOL;
        $xml .= '    </url>' . PHP_EOL;
    }

    foreach ($services as $service) {
        $date = $service->updated_at ? $service->updated_at->toAtomString() : $now;
        $xml .= '    <url>' . PHP_EOL;
        $xml .= '        <loc>' . htmlspecialchars($baseUrl . '/servicios/' . $service->slug) . '</loc>' . PHP_EOL;
        $xml .= '        <lastmod>' . $date . '</lastmod>' . PHP_EOL;
        $xml .= '        <changefreq>weekly</changefreq>' . PHP_EOL;
        $xml .= '        <priority>0.9</priority>' . PHP_EOL;
        $xml .= '    </url>' . PHP_EOL;
    }

    foreach ($posts as $post) {
        $date = $post->updated_at ? $post->updated_at->toAtomString() : ($post->post_date ? \Carbon\Carbon::parse($post->post_date)->toAtomString() : $now);
        $postIdentifier = $post->slug ?: $post->id;
        $xml .= '    <url>' . PHP_EOL;
        $xml .= '        <loc>' . htmlspecialchars($baseUrl . '/blog/' . $postIdentifier) . '</loc>' . PHP_EOL;
        $xml .= '        <lastmod>' . $date . '</lastmod>' . PHP_EOL;
        $xml .= '        <changefreq>weekly</changefreq>' . PHP_EOL;
        $xml .= '        <priority>0.8</priority>' . PHP_EOL;
        $xml .= '    </url>' . PHP_EOL;
    }

    $xml .= '</urlset>';

    return response($xml, 200, ['Content-Type' => 'application/xml; charset=utf-8']);
});

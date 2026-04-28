<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\AdController;
use Illuminate\Support\Facades\Route;

// Admin
use App\Http\Controllers\ItemVariantController;
use App\Http\Controllers\Admin\AboutusController as AdminAboutusController;
use App\Http\Controllers\Admin\GalleryController as AdminGalleryController;
use App\Http\Controllers\Admin\ServicesController as AdminServicesController;
use App\Http\Controllers\Admin\IndicatorController as AdminIndicatorController;
use App\Http\Controllers\Admin\ShippingCostController as AdminShippingCostController;
use App\Http\Controllers\Admin\MessageController as AdminMessageController;
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
use App\Http\Controllers\Admin\AdController as AdminAdController;
use App\Http\Controllers\Admin\BundleController as AdminBundleController;
use App\Http\Controllers\Admin\ItemColorController as AdminItemColorController;
use App\Http\Controllers\Admin\InstagramPostController as AdminInstagramPostsController;
use App\Http\Controllers\Admin\ItemSizeController as AdminItemSizeController;
use App\Http\Controllers\Admin\CouponController as AdminCouponController;
use App\Http\Controllers\Admin\FaqController as AdminFaqController;
use App\Http\Controllers\Admin\FormulaController as AdminFormulaController;
use App\Http\Controllers\Admin\FragranceController as AdminFragranceController;
use App\Http\Controllers\Admin\ItemController as AdminItemController;
use App\Http\Controllers\Admin\RenewalController as AdminRenewalController;
use App\Http\Controllers\Admin\SaleController as AdminSaleController;
use App\Http\Controllers\Admin\HomeController as AdminHomeController;
use App\Http\Controllers\Admin\SaleStatusController as AdminSaleStatusController;
use App\Http\Controllers\Admin\SupplyController as AdminSupplyController;
use App\Http\Controllers\Admin\UserController as AdminUserController;

// Customer
use App\Http\Controllers\Customer\UserFormulasController as CustomerUserFormulasController;
use App\Http\Controllers\Customer\ProfileController as CustomerProfileController;
use App\Http\Controllers\Customer\SaleController as CustomerSaleController;

// Public
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CoreValueController;
use App\Http\Controllers\ItemColorController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\CoverController;
use App\Http\Controllers\CulqiController;
use App\Http\Controllers\FragranceController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\InstagramPostsController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ItemImageController;
use App\Http\Controllers\MailingController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\ShippingCostController;
use App\Http\Controllers\StrengthController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\SupplyController;
use App\Http\Controllers\TestimonyController;
use App\Http\Controllers\UnifiedImportController;
use App\Http\Controllers\UserFormulasController;
use App\Models\Department;
use App\Models\District;
use App\Models\InstagramPost;
use App\Models\Province;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
/*NUEVOS */

Route::get('/generals/get-socials', [GeneralController::class, 'getSocials']);
Route::get('/generals/get-benefits', [GeneralController::class, 'getBenefits']);
Route::get('/generals/get-aboutuses', [GeneralController::class, 'getAboutuses']);
Route::get('/generals/get-session', [GeneralController::class, 'getSession']);

//Shipping
// Cambia esto en tu api.php:
Route::post('/shipping/calculate', [ShippingCostController::class, 'calculate']);


Route::prefix('/ubigeo')->group(function () {
    Route::get('/departments', function () {
        return Department::where('active', true)->get();
    });

    Route::get('/provinces/{department_id}', function ($department_id) {
        return Province::where('department_id', $department_id)->where('active', true)->get();
    });

    Route::get('/districts/{province_id}', function ($province_id) {
        return District::where('province_id', $province_id)->where('active', true)->get();
    });
});


// Unified Import API
Route::post('/unified-import', [UnifiedImportController::class, 'import']);
Route::post('/unified-import/preview', [UnifiedImportController::class, 'preview']);
Route::get('/unified-import/field-mappings', [UnifiedImportController::class, 'getFieldMappings']);

Route::get('/items/get-destacados', [ItemController::class, 'getDestacados']);
Route::get('/items/get-testimonies', [TestimonyController::class, 'getTestimonies']);
/*OTROS */
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::get('/sliders/media/{uuid}', [AdminSliderController::class, 'media']);
Route::get('/aboutus/media/{uuid}', [AdminAboutusController::class, 'media']);
Route::get('/services/media/{uuid}', [AdminServicesController::class, 'media']);
Route::get('/category/media/{uuid}', [AdminCategoryController::class, 'media']);
Route::get('/testimonies/media/{uuid}', [AdminTestimonyController::class, 'media']);
Route::get('/posts/media/{uuid}', [AdminPostController::class, 'media']);
Route::get('/items/media/{uuid}', [ItemController::class, 'media']);
Route::get('/item_images/media/{uuid}', [ItemImageController::class, 'media']);
Route::get('/supplies/media/{uuid}', [SupplyController::class, 'media']);
//Route::get('/colors/media/{uuid}', [ColorController::class, 'media']);
Route::get('/instagram_post/media/{uuid}', [InstagramPostsController::class, 'media']);
Route::get('/fragrances/media/{uuid}', [FragranceController::class, 'media']);
Route::get('/ads/media/{uuid}', [AdController::class, 'media']);
Route::get('/strength/media/{uuid}', [StrengthController::class, 'media']);
Route::get('/core_value/media/{uuid}', [AdminCoreValueController::class, 'media']);
Route::get('/instagram_post/media/{uuid}', [InstagramPostsController::class, 'media']);
Route::get('/generals/media/{uuid}', [AdminGeneralController::class, 'media']);

Route::get('/mailing/media/{uuid}', [MailingController::class, 'media']);

Route::post('/posts/paginate', [PostController::class, 'paginate']);
Route::post('/items/paginate', [ItemController::class, 'paginate']);
Route::post('/supplies/paginate', [SupplyController::class, 'paginate']);

Route::post('/messages', [MessageController::class, 'save']);
Route::post('/subscriptions', [SubscriptionController::class, 'save']);

Route::get('/cover/{uuid}', [CoverController::class, 'full']);
Route::get('/cover/thumbnail/{uuid}', [CoverController::class, 'thumbnail']);

Route::post('/user-formulas', [UserFormulasController::class, 'save']);

Route::post('/coupons', [CouponController::class, 'save']);
Route::post('/coupons/is-first', [CouponController::class, 'isFirst']);

Route::post('/items/verify-stock', [ItemController::class, 'verifyStock']);



Route::prefix('/culqi')->group(function () {
    Route::post('/order', [CulqiController::class, 'order']);
    Route::post('/token', [CulqiController::class, 'token']);
    Route::post('/webhook', [CulqiController::class, 'webhook']);
});

Route::get('/sales/notify/{code}', [SaleController::class, 'notify']);
Route::post('/sales/transfer', [SaleController::class, 'transferCheckout']);

Route::middleware('auth')->group(function () {
    Route::delete('logout', [AuthController::class, 'destroy'])
        ->name('logout');
    // Variantes de producto (pivot)
    Route::post('/item-variants/save', [ItemVariantController::class, 'save']);
    Route::delete('/item-variants/{id}', [ItemVariantController::class, 'delete']);
    Route::get('/item-variants/by-item/{itemId}', [ItemVariantController::class, 'byItem']);


    Route::middleware('can:Admin')->prefix('admin')->group(function () {

        // Listar colores y tallas por item
        Route::post('/colors/list', [AdminItemColorController::class, 'list']);
        Route::post('/sizes/list', [AdminItemSizeController::class, 'list']);

        Route::get('/sales/{id}', [AdminSaleController::class, 'get']);
        Route::post('/sales', [AdminSaleController::class, 'save']);
        Route::post('/sales/paginate', [AdminSaleController::class, 'paginate']);
        Route::patch('/sales/status', [AdminSaleController::class, 'status']);
        Route::patch('/sales/{field}', [AdminSaleController::class, 'boolean']);
        Route::delete('/sales/{id}', [AdminSaleController::class, 'delete']);

        Route::get('/sale-statuses/by-sale/{id}', [AdminSaleStatusController::class, 'bySale']);

        Route::post('/posts', [AdminPostController::class, 'save']);
        Route::post('/posts/paginate', [AdminPostController::class, 'paginate']);
        Route::patch('/posts/status', [AdminPostController::class, 'status']);
        Route::patch('/posts/{field}', [AdminPostController::class, 'boolean']);
        Route::delete('/posts/{id}', [AdminPostController::class, 'delete']);

        Route::post('/items', [AdminItemController::class, 'save']);
        Route::post('/items/paginate', [AdminItemController::class, 'paginate']);
        Route::patch('/items/status', [AdminItemController::class, 'status']);
        Route::patch('/items/{field}', [AdminItemController::class, 'boolean']);
        Route::delete('/items/{id}', [AdminItemController::class, 'delete']);

        Route::post('/colors', [AdminItemColorController::class, 'save']);
        Route::post('/colors/paginate', [AdminItemColorController::class, 'paginate']);
        Route::patch('/colors/status', [AdminItemColorController::class, 'status']);
        Route::patch('/colors/{field}', [AdminItemColorController::class, 'boolean']);
        Route::delete('/colors/{id}', [AdminItemColorController::class, 'delete']);

        Route::post('/instagram_posts', [AdminInstagramPostsController::class, 'save']);
        Route::post('/instagram_posts/paginate', [AdminInstagramPostsController::class, 'paginate']);
        Route::patch('/instagram_posts/status', [AdminInstagramPostsController::class, 'status']);
        Route::patch('/instagram_posts/{field}', [AdminInstagramPostsController::class, 'boolean']);
        Route::delete('/instagram_posts/{id}', [AdminInstagramPostsController::class, 'delete']);

        Route::post('/sizes', [AdminItemSizeController::class, 'save']);
        Route::post('/sizes/paginate', [AdminItemSizeController::class, 'paginate']);
        Route::patch('/sizes/status', [AdminItemSizeController::class, 'status']);
        Route::patch('/sizes/{field}', [AdminItemSizeController::class, 'boolean']);
        Route::delete('/sizes/{id}', [AdminItemSizeController::class, 'delete']);

        Route::post('/supplies', [AdminSupplyController::class, 'save']);
        Route::post('/supplies/paginate', [AdminSupplyController::class, 'paginate']);
        Route::patch('/supplies/status', [AdminSupplyController::class, 'status']);
        Route::patch('/supplies/{field}', [AdminSupplyController::class, 'boolean']);
        Route::delete('/supplies/{id}', [AdminSupplyController::class, 'delete']);

        Route::post('/formulas', [AdminFormulaController::class, 'save']);
        Route::post('/formulas/paginate', [AdminFormulaController::class, 'paginate']);
        Route::patch('/formulas/status', [AdminFormulaController::class, 'status']);
        Route::patch('/formulas/{field}', [AdminFormulaController::class, 'boolean']);
        Route::delete('/formulas/{id}', [AdminFormulaController::class, 'delete']);

        Route::post('/fragrances', [AdminFragranceController::class, 'save']);
        Route::post('/fragrances/paginate', [AdminFragranceController::class, 'paginate']);
        Route::patch('/fragrances/status', [AdminFragranceController::class, 'status']);
        Route::patch('/fragrances/{field}', [AdminFragranceController::class, 'boolean']);
        Route::delete('/fragrances/{id}', [AdminFragranceController::class, 'delete']);

        Route::post('/ads', [AdminAdController::class, 'save']);
        Route::post('/ads/paginate', [AdminAdController::class, 'paginate']);
        Route::patch('/ads/status', [AdminAdController::class, 'status']);
        Route::patch('/ads/{field}', [AdminAdController::class, 'boolean']);
        Route::delete('/ads/{id}', [AdminAdController::class, 'delete']);

        Route::post('/renewals', [AdminRenewalController::class, 'save']);
        Route::post('/renewals/paginate', [AdminRenewalController::class, 'paginate']);
        Route::patch('/renewals/status', [AdminRenewalController::class, 'status']);
        Route::patch('/renewals/{field}', [AdminRenewalController::class, 'boolean']);
        Route::delete('/renewals/{id}', [AdminRenewalController::class, 'delete']);

        Route::post('/bundles', [AdminBundleController::class, 'save']);
        Route::post('/bundles/paginate', [AdminBundleController::class, 'paginate']);
        Route::patch('/bundles/status', [AdminBundleController::class, 'status']);
        Route::patch('/bundles/{field}', [AdminBundleController::class, 'boolean']);
        Route::delete('/bundles/{id}', [AdminBundleController::class, 'delete']);

        Route::post('/coupons', [AdminCouponController::class, 'save']);
        Route::post('/coupons/paginate', [AdminCouponController::class, 'paginate']);
        Route::patch('/coupons/status', [AdminCouponController::class, 'status']);
        Route::patch('/coupons/{field}', [AdminCouponController::class, 'boolean']);
        Route::delete('/coupons/{id}', [AdminCouponController::class, 'delete']);

        Route::post('/messages', [AdminMessageController::class, 'save']);
        Route::post('/messages/paginate', [AdminMessageController::class, 'paginate']);
        Route::patch('/messages/status', [AdminMessageController::class, 'status']);
        Route::patch('/messages/{field}', [AdminMessageController::class, 'boolean']);
        Route::delete('/messages/{id}', [AdminMessageController::class, 'delete']);

        Route::post('/subscriptions/paginate', [AdminSubscriptionController::class, 'paginate']);
        Route::patch('/subscriptions/status', [AdminSubscriptionController::class, 'status']);
        Route::delete('/subscriptions/{id}', [AdminSubscriptionController::class, 'delete']);

        Route::post('/aboutus', [AdminAboutusController::class, 'save']);
        Route::post('/aboutus/paginate', [AdminAboutusController::class, 'paginate']);
        Route::patch('/aboutus/status', [AdminAboutusController::class, 'status']);
        Route::patch('/aboutus/{field}', [AdminAboutusController::class, 'boolean']);
        Route::delete('/aboutus/{id}', [AdminAboutusController::class, 'delete']);

        Route::post('/services', [AdminServicesController::class, 'save']);
        Route::post('/services/paginate', [AdminServicesController::class, 'paginate']);
        Route::patch('/services/status', [AdminServicesController::class, 'status']);
        Route::patch('/services/{field}', [AdminServicesController::class, 'boolean']);
        Route::delete('/services/{id}', [AdminServicesController::class, 'delete']);

        Route::post('/indicators', [AdminIndicatorController::class, 'save']);
        Route::post('/indicators/paginate', [AdminIndicatorController::class, 'paginate']);
        Route::patch('/indicators/status', [AdminIndicatorController::class, 'status']);
        Route::patch('/indicators/{field}', [AdminIndicatorController::class, 'boolean']);
        Route::delete('/indicators/{id}', [AdminIndicatorController::class, 'delete']);

        Route::post('/shipping', [AdminShippingCostController::class, 'save']);
        Route::post('/shipping/paginate', [AdminShippingCostController::class, 'paginate']);
        Route::patch('/shipping/status', [AdminShippingCostController::class, 'status']);
        Route::patch('/shipping/{field}', [AdminShippingCostController::class, 'boolean']);
        Route::delete('/shipping/{id}', [AdminShippingCostController::class, 'delete']);
        Route::post('/shipping/available-districts', [AdminShippingCostController::class, 'getAvailableDistricts']);

        Route::post('/sliders', [AdminSliderController::class, 'save']);
        Route::post('/sliders/paginate', [AdminSliderController::class, 'paginate']);
        Route::patch('/sliders/status', [AdminSliderController::class, 'status']);
        Route::patch('/sliders/{field}', [AdminSliderController::class, 'boolean']);
        Route::delete('/sliders/{id}', [AdminSliderController::class, 'delete']);

        Route::post('/testimonies', [AdminTestimonyController::class, 'save']);
        Route::post('/testimonies/paginate', [AdminTestimonyController::class, 'paginate']);
        Route::patch('/testimonies/status', [AdminTestimonyController::class, 'status']);
        Route::patch('/testimonies/{field}', [AdminTestimonyController::class, 'boolean']);
        Route::delete('/testimonies/{id}', [AdminTestimonyController::class, 'delete']);

        Route::post('/categories', [AdminCategoryController::class, 'save']);
        Route::post('/categories/paginate', [AdminCategoryController::class, 'paginate']);
        Route::patch('/categories/status', [AdminCategoryController::class, 'status']);
        Route::patch('/categories/{field}', [AdminCategoryController::class, 'boolean']);
        Route::delete('/categories/{id}', [AdminCategoryController::class, 'delete']);

        Route::post('/subcategories', [AdminSubcategoryController::class, 'save']);
        Route::post('/subcategories/paginate', [AdminSubcategoryController::class, 'paginate']);
        Route::patch('/subcategories/status', [AdminSubcategoryController::class, 'status']);
        Route::patch('/subcategories/{field}', [AdminSubcategoryController::class, 'boolean']);
        Route::delete('/subcategories/{id}', [AdminSubcategoryController::class, 'delete']);

        Route::post('/faqs', [AdminFaqController::class, 'save']);
        Route::post('/faqs/paginate', [AdminFaqController::class, 'paginate']);
        Route::patch('/faqs/status', [AdminFaqController::class, 'status']);
        Route::patch('/faqs/{field}', [AdminFaqController::class, 'boolean']);
        Route::delete('/faqs/{id}', [AdminFaqController::class, 'delete']);

        Route::post('/strengths', [AdminStrengthController::class, 'save']);
        Route::post('/strengths/paginate', [AdminStrengthController::class, 'paginate']);
        Route::patch('/strengths/status', [AdminStrengthController::class, 'status']);
        Route::patch('/strengths/{field}', [AdminStrengthController::class, 'boolean']);
        Route::delete('/strengths/{id}', [AdminStrengthController::class, 'delete']);

        Route::post('/core_values', [AdminCoreValueController::class, 'save']);
        Route::post('/core_values/paginate', [AdminCoreValueController::class, 'paginate']);
        Route::patch('/core_values/status', [AdminCoreValueController::class, 'status']);
        Route::patch('/core_values/{field}', [AdminCoreValueController::class, 'boolean']);
        Route::delete('/core_values/{id}', [AdminCoreValueController::class, 'delete']);

        Route::post('/socials', [AdminSocialController::class, 'save']);
        Route::post('/socials/paginate', [AdminSocialController::class, 'paginate']);
        Route::patch('/socials/status', [AdminSocialController::class, 'status']);
        Route::patch('/socials/{field}', [AdminSocialController::class, 'boolean']);
        Route::delete('/socials/{id}', [AdminSocialController::class, 'delete']);

        Route::post('/generals', [AdminGeneralController::class, 'save']);
        Route::post('/generals/paginate', [AdminGeneralController::class, 'paginate']);
        Route::patch('/generals/status', [AdminGeneralController::class, 'status']);
        Route::patch('/generals/{field}', [AdminGeneralController::class, 'boolean']);
        Route::delete('/generals/{id}', [AdminGeneralController::class, 'delete']);

        Route::post('/users', [AdminUserController::class, 'save']);
        Route::post('/users/paginate', [AdminUserController::class, 'paginate']);
        Route::patch('/users/status', [AdminUserController::class, 'status']);
        Route::patch('/users/{field}', [AdminUserController::class, 'boolean']);
        Route::delete('/users/{id}', [AdminUserController::class, 'delete']);

        Route::get('/profile/{uuid}', [AdminProfileController::class, 'full']);
        Route::get('/profile/thumbnail/{uuid}', [AdminProfileController::class, 'thumbnail']);
        Route::post('/profile', [AdminProfileController::class, 'saveProfile']);
        Route::patch('/profile', [AdminProfileController::class, 'save']);

        Route::patch('/account/email', [AdminAccountController::class, 'email']);
        Route::patch('/account/password', [AdminAccountController::class, 'password']);

        Route::post('/gallery', [AdminGalleryController::class, 'save']);
    });

    Route::middleware('can:Customer')->prefix('customer')->group(function () {

        Route::get('/sales/{id}', [CustomerSaleController::class, 'get']);
        Route::post('/sales/paginate', [CustomerSaleController::class, 'paginate']);
        Route::delete('/sales/{id}', [CustomerSaleController::class, 'delete']);

        Route::post('/user-formulas', [CustomerUserFormulasController::class, 'save']);
        Route::patch('/profile', [CustomerProfileController::class, 'save']);
    });
});

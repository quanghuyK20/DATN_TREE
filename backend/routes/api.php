<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderStatusController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductDetailController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\TransportController;
use App\Http\Controllers\VerifyStateController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\OrderReceiversController;
use App\Http\Controllers\ShipperController;
use App\Http\Controllers\ShippingUnitController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserVoucherController;
use App\Http\Controllers\VerifyController;
use App\Http\Controllers\VoucherController;
use App\Models\ShippingUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function(){

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::group(['middleware' => ['admin']], function () {

        Route::post('/roles', [RoleController::class, 'store']);
        Route::put('/roles/{id}', [RoleController::class, 'update']);
        Route::delete('/roles/{id}', [RoleController::class, 'destroy']);

        Route::post('/order-status', [OrderStatusController::class, 'store']);
        Route::put('/order-status/{id}', [OrderStatusController::class, 'update']);
        Route::delete('/order-status/{id}', [OrderStatusController::class, 'destroy']);

        Route::post('/transports', [TransportController::class, 'store']);
        Route::patch('/transports/{id}', [TransportController::class, 'update']);
        Route::delete('/transports/{id}', [TransportController::class, 'destroy']);

        Route::post('/product-categories', [ProductCategoryController::class, 'store']);
        Route::patch('/product-categories/{id}', [ProductCategoryController::class, 'update']);
        Route::delete('/product-categories/{id}', [ProductCategoryController::class, 'destroy']);

        Route::post('/verify-states', [VerifyStateController::class, 'store']);
        Route::patch('/verify-states/{id}', [VerifyStateController::class, 'update']);
        Route::delete('/verify-states/{id}', [VerifyStateController::class, 'destroy']);

        //User
        Route::get('/user-by-auth',[UserController::class,'getUserByAuth']);
        // Route::post('/users',[UserController::class,'store']);
        Route::get('/user-admin/{id}',[UserController::class,'getUserByIdAdmin']);

        // huy lq adding new logic
        Route::get('/shop-admin/{id}',[UserController::class,'getStoreByIdAdmin']);

        Route::patch('/user-admin/{id}', [UserController::class, 'updateUser']);
        // Route::delete('/delete-by-admin/{id}', [UserController::class, 'destroyUser']);

        // Route::get('/users',[UserController::class,'index']);
        Route::delete('/users/delete-by-admin/{id}', [UserController::class, 'softDeleteById']);
        Route::post('/users',[UserController::class,'store']);
        Route::patch('/users/{id}',[UserController::class,'updateById']);

        // cmt tam de lam task
        // Route::get('/users/{id}',[UserController::class,'getUserById']);



        // Product
        Route::get('/products-sold', [ProductController::class, 'getProductsSold']);
        Route::delete('/products/delete-by-admin/{id}', [ProductController::class, 'softDeleteById']);
        Route::post('/products', [ProductController::class, 'createProduct']);
        Route::patch('/products/{id}', [ProductController::class, 'update']);


        //Feedback
        Route::get('/feedback', [FeedbackController::class, 'index']);
        Route::get('/feedbacks-by-admin',[FeedbackController::class, 'getAllByAdmin']);
        Route::get('/feedbacks/{id}',[FeedbackController::class, 'getFeedbackById']);
        Route::patch('/feedbacks/{id}',[FeedbackController::class, 'update']);
        Route::delete('/feedbacks/{id}',[FeedbackController::class, 'destroy']);
        Route::post('/feedbacks',[FeedbackController::class, 'store']);

        //Order
        Route::get('/orders-by-admin',[OrderController::class, 'getAllByAdmin']);
        //Show feedback by Store_id
        Route::get('/feedback/{id}', [FeedbackController::class, 'getFeedbacksByStoreId']);

        //OrderReceivers
        Route::delete('/delete-order-receiver-admin/{id}', [OrderReceiversController::class, 'destroyOrderReceiverAdmin']);

        //Verify
        Route::get('/stores-not-verify', [VerifyController::class, 'getStoresNotYetVerify']);
        Route::get('/shipping-units-not-verify', [VerifyController::class, 'getShippingUnitsNotYetVerify']);
        Route::post('/stores-verify/{id}', [VerifyController::class, 'verifyStore']);
        Route::post('/shipping-units-verify/{id}', [VerifyController::class, 'verifyShippingUnit']);

        //shipper
        Route::get('/shippers', [ShipperController::class, 'index']);

    });

    Route::group(['middleware' => ['seller']], function () {

        //Product detail
        Route::patch('/products-details/{id}', [ProductDetailController::class, 'update']);

         //Product
        Route::patch('/products/{id}', [ProductController::class, 'update']);
        Route::delete('/delete-product-by-owner/{id}', [ProductController::class, 'deleteProductByOwner']);
        Route::post('/products', [ProductController::class, 'createProduct']);

        //Order
        Route::get('/orders-by-seller',[OrderController::class, 'getAllByAdmin']);

        //Feedback
        Route::get('/feedbacks-by-shop',[FeedbackController::class, 'getAllByAdmin']);

        //Voucher
        Route::get('/vouchers-by-shop',[VoucherController::class, 'getAllByAdmin']);
        Route::post('/vouchers', [VoucherController::class, 'createVoucher']);
        Route::patch('/vouchers/{id}',[VoucherController::class,'updateVoucher']);
        Route::delete('/vouchers/{id}',[VoucherController::class,'destroyVoucher']);

        //Seller
        Route::patch('/order-update-by-seller/{id}',[OrderController::class, 'update']);

    });

    Route::group(['middleware' => ['shipping-unit']], function () {
        //shipper
        Route::get('/shippers', [ShipperController::class, 'index']);
        Route::get('/shipper-not-verify', [VerifyController::class, 'getListShipperNotYetVerify']);
        Route::get('/shippers-by-shipping-unit/{id}',[ShipperController::class, 'getShipperByShippingUnit']);
        //order
        Route::get('/orders-by-shipping-unit',[OrderController::class, 'getAllByAdmin']);
        Route::patch('/order-update-by-shipping-unit/{id}',[OrderController::class, 'update']);
    });

    Route::group(['middleware' => ['shipper']], function () {
        //order
        Route::get('/orders-by-shipper',[OrderController::class, 'getAllByAdmin']);
        Route::patch('/order-update-by-shipper/{id}',[OrderController::class, 'update']);
    });

    //OrderReceiversf
    Route::post('/order-receivers',[OrderReceiversController::class,'store']);
    Route::get('/order-receivers_id/{id}',[OrderReceiversController::class,'getOrderReceiverById']);
    Route::get('/order-receivers-by-user_id/{id}',[OrderReceiversController::class,'getOrderReceiverByUserId']);
    Route::patch('/order-receivers/{id}', [OrderReceiversController::class, 'update']);
    Route::delete('/delete-order-receiver-customer/{id}', [OrderReceiversController::class, 'destroyOrderReceiverSelf']);

    //Feedback
    Route::post('/feedback-create', [FeedbackController::class, 'store']);
    Route::patch('/feedback-update', [FeedbackController::class, 'update']);


    Route::get('/roles', [RoleController::class, 'index']);
    Route::get('/roles/{id}', [RoleController::class, 'show']);


    Route::get('/order-status', [OrderStatusController::class, 'index']);
    Route::get('/order-status/{id}', [OrderStatusController::class, 'show']);

    Route::get('/transports', [TransportController::class, 'index']);
    Route::get('/transports/{id}', [TransportController::class, 'show']);


    Route::get('/product-categories/{id}', [ProductCategoryController::class, 'show']);


    Route::get('/verify-states', [VerifyStateController::class, 'index']);
    Route::get('/verify-states/{id}', [VerifyStateController::class, 'show']);

    // Store
    Route::patch('/stores/{id}', [StoreController::class, 'update']);
    Route::patch('/stores-deleted_at/{id}', [StoreController::class, 'destroy']);

    //Carts
    Route::get('/carts', [CartController::class, 'index']);
    Route::get('/carts-by-user_id', [CartController::class, 'getProductOfCartByUserID']);
    Route::post('/add-product-carts', [CartController::class, 'addProductToCart']);
    Route::post('/carts-update/{id}', [CartController::class, 'updateCountProduct']);
    Route::patch('/update-amount-product', [CartController::class, 'updateAmountProductToCart']);
    Route::delete('/delete-product-carts/{id}', [CartController::class, 'destroyProductByCart']);

    //Order
    Route::get('/orders',[OrderController::class,'index']);
    Route::get('/orders/{id}',[OrderController::class,'show']);
    Route::post('/orders',[OrderController::class,'store']);
    Route::patch('/orders/{id}', [OrderController::class, 'update']);

    Route::get('/products-orders',[OrderController::class,'getProductsOrderByUser']);


    //Email
    Route::get('/send-mail', [MailController::class,'sendEmail']);
    // Order email
    Route::post('/mail-order', [MailController::class, 'mailOrder']);


    //User
    Route::get('/user-self',[UserController::class,'getUserByIdSelf']);
    Route::patch('/user-self/{id}', [UserController::class, 'updateUserSelf']);


    Route::post('/change-password',[AuthController::class, 'changePassword']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/auth/get-authenticated-user', [AuthController::class, 'getAuthenticatedUser']);

    //Follow
    Route::get('/follow-by-user-id',[FollowController::class,'getFollowByUserId']);
    Route::post('/follows',[FollowController::class,'store']);
    Route::delete('/follows-destroy',[FollowController::class,'destroy']);

    //UserVoucher
    Route::get('/user-vouchers-by-user',[UserVoucherController::class,'getUserVoucherByUserId']);
    Route::post('/user-vouchers', [UserVoucherController::class, 'store']);

    //Feedback by customer
    Route::post('/feedbacks',[FeedbackController::class, 'store']);

});
//Follow
Route::get('/follows-by-user-id/{id}',[FollowController::class,'getListFollowByUserId']);

// Product category

Route::post('/product-categories/getByName', [ProductCategoryController::class, 'showByName']);

// Product of Store
Route::get('/products-store_id/{id}', [ProductController::class, 'getProductsByStoreId']);


//Product
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products-by-admin', [ProductController::class, 'getAllByAdmin']);
Route::get('/products-by-params', [ProductController::class, 'getProductsByParams']);
Route::get('/products/{id}', [ProductController::class, 'show']);

//Feedback by Product_id
Route::get('/feedbacks-by-product_id/{id}', [FeedbackController::class, 'getFeedbacksByProductId']);


// Store
Route::get('/stores-by-admin', [StoreController::class, 'index']);
Route::get('/stores', [StoreController::class, 'getListStoreHome']);
Route::post('/stores', [StoreController::class, 'store']);
Route::get('/stores/{id}', [StoreController::class, 'show']);
Route::get('/stores/info/{id}',[StoreController::class, 'getInfoStoreById']);
Route::get('/stores/owner/{id}',[StoreController::class, 'getStoreByOwnerId']);


//OrderReceiver
Route::get('/order-receivers',[OrderReceiversController::class,'index']);

// Login - register
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/login-google', [AuthController::class,'googleLogin']);

Route::get('/auth/get-authenticated-user/{id}',[UserController::class,'getUserByIdAdmin']);

// cart
Route::get('/carts', [CartController::class, 'index']);

Route::get('/product-categories', [ProductCategoryController::class, 'index']);


// Upload router destroy
Route::post('/upload/avatar/user/{id}',[UploadController::class,'updateAvatarById']);
Route::post('/upload/product/{id}',[UploadController::class,'updateImgProductById']);
Route::post('/upload/feedback/{id}',[UploadController::class,'updateImgFeedbackById']);
Route::post('/upload/voucher/{id}',[UploadController::class,'updateImgVoucherById']);
Route::post('/upload/store/{id}',[UploadController::class,'updateImgStoreById']);
Route::post('/upload/shipper-unit/{id}',[UploadController::class,'updateImgShipperUnitById']);

//Voucher
Route::get('/vouchers/{id}',[VoucherController::class,'getVoucherByStoreId']);


// tam de lam task message
Route::get('/users/{id}',[UserController::class,'getUserById']);
Route::get('/users',[UserController::class,'index']);

//Shipping Unit
Route::get('shipping-units-by-home',[ShippingUnitController::class,'getListStoreHome']);
Route::get('shipping-units',[ShippingUnitController::class, 'index']);
Route::post('shipping-units',[ShippingUnitController::class, 'store']);

//Shipper
Route::post('shippers',[ShipperController::class, 'store']);

//Mail
Route::post('/mailRegister', [MailController::class, 'mailRegister']);
Route::post('/mail-verify', [MailController::class, 'mailVerify']);

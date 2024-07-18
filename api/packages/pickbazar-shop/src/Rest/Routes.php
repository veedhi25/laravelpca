<?php

use Illuminate\Http\Response;
use PickBazar\Enums\Permission;
use Illuminate\Support\Facades\Route;
use PickBazar\Http\Controllers\TagController;
use PickBazar\Http\Controllers\TaxController;
use PickBazar\Http\Controllers\BillController;
use PickBazar\Http\Controllers\ShopController;
use PickBazar\Http\Controllers\TypeController;
use PickBazar\Http\Controllers\UserController;
use PickBazar\Http\Controllers\OfferController;
use PickBazar\Http\Controllers\OrderController;
use PickBazar\Http\Controllers\CouponController;
use PickBazar\Http\Controllers\ReviewController;
use PickBazar\Http\Controllers\SMSLogController;
use PickBazar\Http\Controllers\AddressController;
use PickBazar\Http\Controllers\ContactController;
use PickBazar\Http\Controllers\ProductController;
use PickBazar\Http\Controllers\CategoryController;
use PickBazar\Http\Controllers\DeliveryController;
use PickBazar\Http\Controllers\FeedbackController;
use PickBazar\Http\Controllers\QuestionController;
use PickBazar\Http\Controllers\SettingsController;
use PickBazar\Http\Controllers\ShippingController;
use PickBazar\Http\Controllers\WishlistController;
use PickBazar\Http\Controllers\WithdrawController;
use PickBazar\Http\Controllers\AttributeController;

use PickBazar\Http\Controllers\AttachmentController;
// use PickBazar\Http\Controllers\RefundController;
use PickBazar\Http\Controllers\BillDetailsController;
use PickBazar\Http\Controllers\BillPaymentController;
use PickBazar\Http\Controllers\OrderStatusController;
use PickBazar\Http\Controllers\ShopCategoryController;
use PickBazar\Http\Controllers\AbusiveReportController;
use PickBazar\Http\Controllers\MasterProductController;
use PickBazar\Http\Controllers\AttributeValueController;
use PickBazar\Http\Controllers\UtilityPaymentController;
use PickBazar\Http\Controllers\TermLifeInsuranceController;
use PickBazar\Http\Controllers\QuizController;
use PickBazar\Http\Controllers\SwipeController;
use PickBazar\Http\Controllers\LikesController;
use PickBazar\Http\Controllers\ChatController;
use PickBazar\Http\Controllers\MessagesController;
use PickBazar\Http\Controllers\UserImagesController;
use PickBazar\Http\Controllers\UserProfileController;
use PickBazar\Http\Controllers\AuthBrandController;
use PickBazar\Http\Controllers\RetailerBrandController;
use PickBazar\Http\Controllers\CoursesController;
use PickBazar\Http\Controllers\ExamController;
use PickBazar\Http\Controllers\SectionController;
use PickBazar\Http\Controllers\QuestionTypeController;
use PickBazar\Http\Controllers\ExamAttemptsController;
use PickBazar\Http\Controllers\ExamAttemptsAnswersController;
use PickBazar\Http\Controllers\ExamAttemptAnswersController;
use PickBazar\Http\Controllers\StudentClassController;
use PickBazar\Http\Controllers\BatchController;
use PickBazar\Http\Controllers\StudyMaterialController;
use PickBazar\Http\Controllers\TimeZoneController;

//route for findByDateRange in order controller
Route::get('/find-by-date-range/{start_date}/{end_date}', 'PickBazar\Http\Controllers\OrderController@findByDateRange');
// Route::get('/find-by-date-range', 'PickBazar\Http\Controllers\OrderController@findByDateRange');
 
Route::put('/user-status/{user}', 'PickBazar\Http\Controllers\UserController@updateOnlineStatus');


//Patanjali Career Academy
Route::post('/courses', 'PickBazar\Http\Controllers\CoursesController@store');
Route::get('/courses', 'PickBazar\Http\Controllers\CoursesController@index');
Route::get('/courses/{id}', 'PickBazar\Http\Controllers\CoursesController@show');
Route::put('/courses/{id}', 'PickBazar\Http\Controllers\CoursesController@update');
 
Route::get('/exams', 'PickBazar\Http\Controllers\ExamController@index'); 
Route::get('/exams/{examId}', 'PickBazar\Http\Controllers\ExamController@show');
Route::post('/exams', 'PickBazar\Http\Controllers\ExamController@store');
Route::put('/exams/{examId}', 'PickBazar\Http\Controllers\ExamController@update');
Route::get('/exams/{courseId}', 'PickBazar\Http\Controllers\CourseController@getCourseExams');
 
Route::get('/exam_students', 'PickBazar\Http\Controllers\UserController@getExamStudents');
 
Route::get('/marking-schemes/{id}', 'PickBazar\Http\Controllers\MarkingSchemeController@show');
Route::get('/marking-schemes', 'PickBazar\Http\Controllers\MarkingSchemeController@index');
Route::post('/marking-schemes', 'PickBazar\Http\Controllers\MarkingSchemeController@store');
Route::put('/marking-schemes/{markingScheme}', 'PickBazar\Http\Controllers\MarkingSchemeController@update');
Route::put('/marking-scheme/{id}' , 'PickBazar\Http\Controllers\MarkingSchemeController@delete');

Route::get('/exam-sections/{id}', 'PickBazar\Http\Controllers\SectionController@show');
Route::get('/exam-sections', 'PickBazar\Http\Controllers\SectionController@index');
Route::post('/exam-sections', 'PickBazar\Http\Controllers\SectionController@store');
Route::put('/exam-sections/{id}', 'PickBazar\Http\Controllers\SectionController@update');


Route::get('/question-type/{id}', 'PickBazar\Http\Controllers\QuestionTypeController@show');
Route::get('/question-type', 'PickBazar\Http\Controllers\QuestionTypeController@index');
Route::post('/question-type', 'PickBazar\Http\Controllers\QuestionTypeController@store');
Route::put('/question-type/{id}', 'PickBazar\Http\Controllers\QuestionTypeController@update');
Route::get('/exam-questions/{id}', 'PickBazar\Http\Controllers\ExamQuestionsController@show');
Route::get('/paginated-exam-questions', 'PickBazar\Http\Controllers\ExamQuestionsController@paginatedExamQuestions');
Route::get('/exam-questions', 'PickBazar\Http\Controllers\ExamQuestionsController@index');

Route::post('/exam-questions', 'PickBazar\Http\Controllers\ExamQuestionsController@store');
Route::put('/exam-questions/{id}', 'PickBazar\Http\Controllers\ExamQuestionsController@update');
Route::post('/exam-question-search', 'PickBazar\Http\Controllers\ExamQuestionsController@filterQuestions');
Route::get('/exam-attempt-status/{examId}/{userId}', 'PickBazar\Http\Controllers\ExamAttemptsController@isExamSubmitted');

// Route for retrieving a specific exam attempt details
Route::get('/exam-attempts/{examId}', 'PickBazar\Http\Controllers\ExamAttemptsController@show');
Route::get('/exam-attempt-answers/{attemptId}', 'PickBazar\Http\Controllers\ExamAttemptAnswersController@getExamAttemptAnswers');
Route::get('/user-exam-attempts/{userId}', 'PickBazar\Http\Controllers\ExamAttemptsController@getUsersAttemptedCourseExams');
Route::get('/user-exam-attempts/{userId}/{examId}', 'PickBazar\Http\Controllers\ExamAttemptsController@showUserExamAttempts');
Route::get('/user-all-attempted-exams/{userId}', 'PickBazar\Http\Controllers\ExamAttemptsController@showUserAllExamAttempts');

// Route for retrieving all exam attempts (possibly for an admin dashboard or something similar)
Route::get('/exam-attempts', 'PickBazar\Http\Controllers\ExamAttemptsController@index');
Route::get('/user-attempted-exams/{userId}/{courseId}', 'PickBazar\Http\Controllers\ExamAttemptsController@getUserAttemptedExamsByCourse');
Route::get('/user-attempted-courses/{userId}', 'PickBazar\Http\Controllers\ExamAttemptsController@getUserAttemptedCourses');
 
// Route for starting a new exam attempt
Route::post('/exam-attempts', 'PickBazar\Http\Controllers\ExamAttemptsController@startAttempt');

// Route for ending an exam attempt and adding responses
Route::put('/exam-attempts/{id}/end', 'PickBazar\Http\Controllers\ExamAttemptsController@endAttempt');

// If you have any other updates for an exam attempt (which might be rare), you can keep this route
Route::put('/exam-attempts/{id}', 'PickBazar\Http\Controllers\ExamAttemptsController@update');

Route::get('/courses-with-exams-attempts', 'PickBazar\Http\Controllers\ExamAttemptsController@getAllCoursesWithExamsAndAttempts');
Route::get('/courses-with-exams-attempts/{userId}', 'PickBazar\Http\Controllers\ExamAttemptsController@getUsersAttepmtedExamCourses');

//classes
Route::get('/class', 'PickBazar\Http\Controllers\StudentClassController@index');
Route::post('/class', 'PickBazar\Http\Controllers\StudentClassController@store');
Route::get('/class/{classId}', 'PickBazar\Http\Controllers\StudentClassController@show');
Route::put('/class/{classId}', 'PickBazar\Http\Controllers\StudentClassController@update');
Route::delete('/class/{classId}', 'PickBazar\Http\Controllers\StudentClassController@destroy');

//leaderboard
Route::get('/leader-board/{userId}', 'PickBazar\Http\Controllers\ExamAttemptsController@showUserLastFiveExamAttempts');


// batches
Route::get('/batch', 'PickBazar\Http\Controllers\BatchController@index');
Route::post('/batch', 'PickBazar\Http\Controllers\BatchController@store');
Route::get('/batch/{batchId}', 'PickBazar\Http\Controllers\BatchController@show');
Route::put('/batch/{batchId}', 'PickBazar\Http\Controllers\BatchController@update');
Route::delete('/batch/{batchId}', 'PickBazar\Http\Controllers\BatchController@destroy');

//books
Route::get('/book', 'PickBazar\Http\Controllers\BooksController@index');
Route::post('/book', 'PickBazar\Http\Controllers\BooksController@store');
Route::get('/book/{bookId}', 'PickBazar\Http\Controllers\BooksController@show');
Route::put('/book/{bookId}', 'PickBazar\Http\Controllers\BooksController@update');
Route::delete('/book/{bookId}', 'PickBazar\Http\Controllers\BooksController@destroy');

//study material
Route::get('/study-material', 'PickBazar\Http\Controllers\StudyMaterialController@index');
Route::post('/study-material', 'PickBazar\Http\Controllers\StudyMaterialController@store');
Route::get('/study-material/{studyMaterialId}', 'PickBazar\Http\Controllers\StudyMaterialController@show');
Route::put('/study-material/{studyMaterialId}', 'PickBazar\Http\Controllers\StudyMaterialController@update');
Route::delete('/study-material/{studyMaterialId}', 'PickBazar\Http\Controllers\StudyMaterialController@destroy');

// For Class Streams
Route::get('/class-streams', 'PickBazar\Http\Controllers\ClassStreamController@index');
Route::post('/class-streams', 'PickBazar\Http\Controllers\ClassStreamController@store');
Route::get('/class-streams/{streamId}', 'PickBazar\Http\Controllers\ClassStreamController@show');
Route::put('/class-streams/{streamId}', 'PickBazar\Http\Controllers\ClassStreamController@update');
Route::delete('/class-streams/{streamId}', 'PickBazar\Http\Controllers\ClassStreamController@destroy');



// get Indian time 
Route::get('/get-time', 'PickBazar\Http\Controllers\TimeZoneController@getIndianTime');

Route::apiResource('tags', TagController::class, [
    'only' => ['index', 'show']
]);

Route::apiResource('tags', TagController::class, [
    'only' => ['store', 'update', 'destroy']
]);

Route::resource('question-options', QuestionOptionController::class)->only(['index', 'store']);

Route::any('/buylowcal-text-search',
'PickBazar\Http\Controllers\PlacesApiController@textSearch');


Route::any('/buylowcal-text-search-all',
'PickBazar\Http\Controllers\PlacesApiController@textSearchAll');

// Route::get('buylowcal-text-search', 'PickBazar\Http\Controllers\AnalyticsController@totalUsers');
Route::get('/buylowcal-place-details',
'PickBazar\Http\Controllers\PlacesApiController@placeDetails');

Route::get('/buylowcal-place-photos',
'PickBazar\Http\Controllers\PlacesApiController@placePhotos');

Route::get('/ip-location',
'PickBazar\Http\Controllers\LogController@ipAddress');

 
Route::post('/register', 'PickBazar\Http\Controllers\UserController@register');

Route::post('/otp-register', 'PickBazar\Http\Controllers\UserController@otpRegister');

Route::post('/token', 'PickBazar\Http\Controllers\UserController@token');
Route::post('/forget-password', 'PickBazar\Http\Controllers\UserController@forgetPassword');
Route::post('/stored-licenses', 'PickBazar\Http\Controllers\UserController@licenseStore');
Route::get('/resend-code/{id}', 'PickBazar\Http\Controllers\UserController@resendCode');
Route::post('/user-verify', 'PickBazar\Http\Controllers\UserController@userVerify');
Route::put('users/{id}', 'PickBazar\Http\Controllers\UserController@update');
Route::post('/otp-token', 'PickBazar\Http\Controllers\UserController@otpToken');
Route::post('/verify-otp-token', 'PickBazar\Http\Controllers\UserController@verifyOtpToken');

Route::put('/all-shop/{id}/distributer', 'PickBazar\Http\Controllers\ShopController@toggleDistributer');

Route::post('/verify-forget-password-token', 'PickBazar\Http\Controllers\UserController@verifyForgetPasswordToken');

Route::post('/reset-password', 'PickBazar\Http\Controllers\UserController@resetPassword');
Route::put('/update-password', 'PickBazar\Http\Controllers\UserController@updatePassword');


// Route::post('/contact', 'PickBazar\Http\Controllers\UserController@contactAdmin');
Route::post('/social-login-token', 'PickBazar\Http\Controllers\UserController@socialLogin');

Route::get('/signup-offer','PickBazar\Http\Controllers\SignupOfferController@show');

Route::post('/signup-offer','PickBazar\Http\Controllers\SignupOfferController@store');
#---------------------whatsapp api  start----------------------------#

Route::post('/track/user', 'PickBazar\Http\Controllers\WhatsappController@trackUser');

Route::post('/track/event', 'PickBazar\Http\Controllers\WhatsappController@trackEvent');


 
Route::apiResource('products', ProductController::class, [
    'only' => ['index', 'show']
]);

Route::apiResource('reviews', ReviewController::class, [
    'only' => ['index', 'show'],
]);

Route::apiResource('questions', QuestionController::class, [
    'only' => ['index', 'show'],
]);

Route::apiResource('feedbacks', FeedbackController::class, [
    'only' => ['index', 'show'],
]);

Route::apiResource('reviews', ReviewController::class, [
    'only' => ['store', 'update']
]);

Route::apiResource('questions', QuestionController::class, [
    'only' => ['store'],
]);

Route::apiResource('feedbacks', FeedbackController::class, [
    'only' => ['store'],
]);

Route::apiResource('abusive_reports', AbusiveReportController::class, [
    'only' => ['store'],
]);

Route::get('my-questions', [QuestionController::class, 'myQuestions']);
Route::get('my-reports', [AbusiveReportController::class, 'myReports']);
Route::post('wishlists/toggle', [WishlistController::class, 'toggle']);
Route::apiResource('wishlists', WishlistController::class, [
    'only' => ['index', 'store', 'destroy'],
]);

//total users
Route::get('total-users', 'PickBazar\Http\Controllers\AnalyticsController@totalUsers');
Route::get('wishlists/in_wishlist/{product_id}', [WishlistController::class, 'in_wishlist']);
Route::get('my-wishlists', [ProductController::class, 'myWishlists']);


Route::apiResource('questions', QuestionController::class, [
    'only' => ['update'],
]);

Route::get('ip','PickBazar\Http\Controllers\LogController@ip_AddressLocation');

Route::apiResource('reviews', ReviewController::class, [
    'only' => ['destroy']
]);

Route::apiResource('questions', QuestionController::class, [
    'only' => ['destroy'],
]);

Route::apiResource('feedbacks', QuestionController::class, [
    'only' => ['update', 'destroy'],
]);
Route::apiResource('abusive_reports', AbusiveReportController::class, [
    'only' => ['index', 'show', 'update', 'destroy'],
]);
Route::post('abusive_reports/accept', [AbusiveReportController::class, 'accept']);
Route::post('abusive_reports/reject', [AbusiveReportController::class, 'reject']);

Route::apiResource('master-products', MasterProductController::class, [
    'only' => ['index', 'show']
]);
Route::apiResource('types', TypeController::class, [
    'only' => ['index', 'show']
]);
Route::apiResource('attachments', AttachmentController::class, [
    'only' => ['index', 'show']
]);
Route::apiResource('categories', CategoryController::class, [
    'only' => ['index', 'show']
]);
Route::apiResource('shop-categories', ShopCategoryController::class, [
    'only' => ['index', 'show']
]);
Route::apiResource('offers', OfferController::class, [
    'only' => ['index', 'show']
]);
 

Route::get('fetch-parent-category',  'PickBazar\Http\Controllers\CategoryController@fetchOnlyParent');

Route::get('fetch-shop-category',    'PickBazar\Http\Controllers\ShopCategoryController@fetchCategories');

Route::get('select-shop-categories', 'PickBazar\Http\Controllers\ShopCategoryController@selectShopCategories');

Route::get('fetch-home-categories',  'PickBazar\Http\Controllers\ShopCategoryController@fetchHomeCateogries');

Route::get('fetch-offers', 'PickBazar\Http\Controllers\ProductController@fetchOffers');

Route::get('fetch-brand-offers', 'PickBazar\Http\Controllers\ProductController@fetchBrandOffers');

// Route::get('fetch-offers', 'PickBazar\Http\Controllers\OfferController@fetchHomeOffers');

Route::get('shop-availability', 'PickBazar\Http\Controllers\ShopController@shopAvailability');

Route::get('fetch-feature-shops', 'PickBazar\Http\Controllers\ShopController@fetchFeatureShops');

Route::get('fetch-feature-stores', 'PickBazar\Http\Controllers\ShopController@fetchFeatureStores');

Route::get('/admin-shop','PickBazar\Http\Controllers\ShopController@getAdminShop');

Route::get('fetch-feature-products', 'PickBazar\Http\Controllers\ProductController@fetchFeatureProducts');

Route::get('search/{slug}', 'PickBazar\Http\Controllers\ProductController@search');

// Route::get('search-salon/{slug}', 'PickBazar\Http\Controllers\ProductController@searchSalon');
Route::get('search-salon-shop/${slug}','PickBazar\Http\Controllers\ShopController@salonShops');

Route::get('/master-product/migrate', 'PickBazar\Http\Controllers\MasterProductController@migrate');

Route::post('/store-master-product','PickBazar\Http\Controllers\MasterProductController@storeShopProduct');

Route::get('/pagination-master-products','PickBazar\Http\Controllers\MasterProductController@paginationProduct');

Route::get('/created-master-products','PickBazar\Http\Controllers\MasterProductController@createdMasterProducts');

Route::get('/customer/getfeedApi/{app_id}','PickBazar\Http\Controllers\SettingsController@homeFeedApi');

Route::get('product-offers','PickBazar\Http\Controllers\ProductController@product_offers');

Route::get('product-brand-offers','PickBazar\Http\Controllers\ProductController@product_brand_offers');

Route::put('products-commission/{shop_id}','PickBazar\Http\Controllers\ProductController@product_commission');

Route::put('shop-commission/{shop_id}','PickBazar\Http\Controllers\ShopController@shop_commission');

Route::put('shop-commission-type/{shop_id}','PickBazar\Http\Controllers\ShopController@shop_commission_type');

Route::put('update-referral-commission','PickBazar\Http\Controllers\ShopController@updateReferralCommission');

Route::get('get-referral-commission','PickBazar\Http\Controllers\ShopController@getReferralCommission');

Route::post('shop-delivery-status','PickBazar\Http\Controllers\ShopController@shopDeliveryStatus');

Route::post('shop-delivery-config','PickBazar\Http\Controllers\ShopController@shopDeliveryConfig');

Route::get('get-wallet-commission','PickBazar\Http\Controllers\InviteController@getWalletCommission');

Route::get('get-user-wallet-details/{id}','PickBazar\Http\Controllers\InviteController@getUserWalletDetails');
Route::get('get-user-referral-network/{id}','PickBazar\Http\Controllers\InviteController@getUserReferralNetwork');

Route::get('referral-network','PickBazar\Http\Controllers\InviteController@referral_network');


Route::any('order/success','PickBazar\Http\Controllers\GatewayResponse@process_response');
Route::any('utility-payment/success','PickBazar\Http\Controllers\GatewayResponse@processResponseUtilityPayment');
Route::any('utility-payment/failed','PickBazar\Http\Controllers\GatewayResponse@processResponseUtilityPaymentFailed');
Route::any('utility-payment/payment-status','PickBazar\Http\Controllers\GatewayResponse@rechargeStatus');


Route::any('upi-payment/success/{order_id}','PickBazar\Http\Controllers\GatewayResponse@upi_payment_response');


Route::post('import-products', 'PickBazar\Http\Controllers\ProductController@importProducts');
Route::post('import-variation-options', 'PickBazar\Http\Controllers\ProductController@importVariationOptions');
Route::get('export-products/{shop_id}', 'PickBazar\Http\Controllers\ProductController@exportProducts');
Route::get('export-variation-options/{shop_id}', 'PickBazar\Http\Controllers\ProductController@exportVariableOptions');
Route::post('import-attributes', 'PickBazar\Http\Controllers\AttributeController@importAttributes');
Route::get('export-attributes/{shop_id}', 'PickBazar\Http\Controllers\AttributeController@exportAttributes');

Route::get('export-all-products', 'PickBazar\Http\Controllers\ProductController@exportAllProducts');
Route::post('import-all-products', 'PickBazar\Http\Controllers\ProductController@importAllProducts');

Route::get('export-all-variation-options', 'PickBazar\Http\Controllers\ProductController@exportAllVariableOptions');
Route::post('import-all-variation-options', 'PickBazar\Http\Controllers\ProductController@importAllVariationOptions');


Route::get('export-master-products', 'PickBazar\Http\Controllers\MasterProductController@exportMasterProducts');
Route::post('import-master-products', 'PickBazar\Http\Controllers\MasterProductController@importMasterProducts');

Route::get('export-master-variation-options', 'PickBazar\Http\Controllers\MasterProductController@exportMasterVariableOptions');
Route::post('import-master-variation-options', 'PickBazar\Http\Controllers\MasterProductController@importMasterVariationOptions');

Route::put('status-master-product/{id}',"PickBazar\Http\Controllers\MasterProductController@updateProductStatus");

Route::get('export-shops', 'PickBazar\Http\Controllers\ShopController@exportShop');
Route::post('import-shops', 'PickBazar\Http\Controllers\ShopController@importShop');

Route::get('export-orders/{start_date}/{end_date}', 'PickBazar\Http\Controllers\OrderController@exportOrder');
Route::get('export-shop-orders/{start_date}/{end_date}', 'PickBazar\Http\Controllers\OrderController@exportShopOrder');

Route::post('logs', 'PickBazar\Http\Controllers\LogController@store');
Route::get('logs', 'PickBazar\Http\Controllers\LogController@fetchLogs');
Route::delete('logs/{id}', 'PickBazar\Http\Controllers\LogController@destory');

Route::any('cashfree', 'PickBazar\Http\Controllers\CashFreeController@cashFree');



 

// busineesId, mobile, ParentBusinees Id
Route::apiResource('coupons', CouponController::class, [
    'only' => ['index', 'show']
]);

Route::apiResource('contact', ContactController::class, [
    'only' => ['index', 'store']
]);

Route::apiResource('quiz', QuizController::class, [
    'only' => ['index', 'store']
]);

Route::apiResource('/term-life-insurance', TermLifeInsuranceController::class, [
    'only' => ['index', 'store']
]);


Route::post('coupons/verify', 'PickBazar\Http\Controllers\CouponController@verify');


Route::apiResource('order_status', OrderStatusController::class, [
    'only' => ['index', 'show']
]);

Route::apiResource('attributes', AttributeController::class, [
    'only' => ['index', 'show']
]);

Route::apiResource('all-shop', ShopController::class, [
    'only' => ['index', 'show']
]);

Route::get('all-salon-shops','PickBazar\Http\Controllers\ShopController@salonShops');


Route::apiResource('attribute-values', AttributeValueController::class, [
    'only' => ['index', 'show']
]);

Route::apiResource('settings', SettingsController::class, [
    'only' => ['index']
]);

Route::post('/upi-payment', 'PickBazar\Http\Controllers\UpiPaymentController@createPayment');

Route::any('delivery/success','PickBazar\Http\Controllers\GatewayResponse@process_delivery_response');

Route::get('/delivery/payment','PickBazar\Http\Controllers\DeliveryController@returnToPayment');

Route::group(['middleware' => ['auth:sanctum']], function ()  {
    Route::post('profile', 'PickBazar\Http\Controllers\UserProfileController@store');
    Route::get('profile', 'PickBazar\Http\Controllers\UserProfileController@index');
    Route::get('profile/{id}', 'PickBazar\Http\Controllers\UserProfileController@show');
    Route::put('update-profile/{id}', 'PickBazar\Http\Controllers\UserProfileController@update');
});

Route::group(['middleware' => ['can:' . Permission::CUSTOMER, 'auth:sanctum']], function () {
    Route::post('/logout', 'PickBazar\Http\Controllers\UserController@logout');
    Route::apiResource('orders', OrderController::class, [
        'only' => ['index', 'show', 'store']
    ]);

    Route::apiResource('sms-log', SMSLogController::class, [
        'only' => ['index', 'show', 'store']
    ]);

    Route::apiResource('utility-payment', UtilityPaymentController::class, [
        'only' => ['index', 'show', 'store']
    ]);
    
    Route::get('orders/tracking_number/{tracking_number}', 'PickBazar\Http\Controllers\OrderController@findByTrackingNumber');

    Route::apiResource('attachments', AttachmentController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);


    Route::post('store-license-attachment', 'PickBazar\Http\Controllers\AttachmentController@storeLicenseAttachment');
    Route::post('bill-attachment', 'PickBazar\Http\Controllers\AttachmentController@storeBillAttachment');
    Route::post('image-upload-attachment', 'PickBazar\Http\Controllers\AttachmentController@storeUserImageAttachment');

    Route::post('/cart-list','PickBazar\Http\Controllers\CartController@index');
    Route::post('/cart-add','PickBazar\Http\Controllers\CartController@store');
    Route::post('/cart-remove','PickBazar\Http\Controllers\CartController@remove');
    
    Route::post('checkout/verify', 'PickBazar\Http\Controllers\CheckoutController@verify');
    Route::get('me', 'PickBazar\Http\Controllers\UserController@me');
    Route::put('users/{id}', 'PickBazar\Http\Controllers\UserController@update');
    Route::get('users/{id}', 'PickBazar\Http\Controllers\UserController@show');
    Route::post('/Change Password', 'PickBazar\Http\Controllers\UserController@changePassword');
    Route::get('students-list', 'PickBazar\Http\Controllers\UserController@studentsList');

    Route::apiResource('address', AddressController::class, [
        'only' => ['destroy']
    ]);
    });
    Route::get('image-upload/{user_id}', [UserImagesController::class, 'getImagesByUserId']);
    Route::delete('delete-image/{id}', [UserImagesController::class, 'destroy']);


    Route::resource('image-upload',UserImagesController::class);
    Route::resource('bill',BillController::class);
    Route::resource('contact',ContactController::class);
    Route::resource('quiz',QuizController::class);
    Route::resource('/term-life-insurance',TermLifeInsuranceController::class);
    Route::post('approve-bill','PickBazar\Http\Controllers\BillController@approveBill');
    Route::post('bill-reward','PickBazar\Http\Controllers\BillController@billReward');
    Route::get('bill-reward','PickBazar\Http\Controllers\BillController@getbillReward');


    Route::group(
        ['middleware' => ['permission:' . Permission::STAFF . '|' . Permission::STORE_OWNER, 'auth:sanctum']],
        function () {
            Route::get('analytics', 'PickBazar\Http\Controllers\AnalyticsController@analytics');
            Route::apiResource('products', ProductController::class, [
                'only' => ['store', 'update', 'destroy']
            ]);
            Route::apiResource('master-products', MasterProductController::class, [
                'only' => ['store', 'update', 'destroy']
            ]);
            Route::apiResource('attributes', AttributeController::class, [
                'only' => ['store', 'update', 'destroy']
            ]);
            Route::apiResource('attribute-values', AttributeValueController::class, [
                'only' => ['store', 'update', 'destroy']
            ]);
            Route::apiResource('orders', OrderController::class, [
                'only' => ['update', 'destroy']
            ]);
            Route::get('popular-products', 'PickBazar\Http\Controllers\AnalyticsController@popularProducts');
        }
    );

    Route::put('status-product/{id}',"PickBazar\Http\Controllers\ProductController@updateProductStatus");

    Route::group(
    ['middleware' => ['permission:' . Permission::STORE_OWNER, 'auth:sanctum']],
    function () {
        Route::apiResource('all-shop', ShopController::class, [
            'only' => ['store', 'update', 'destroy']
        ]);
        Route::apiResource('withdraws', WithdrawController::class, [
            'only' => ['store', 'index', 'show']
        ]);

        Route::post('users/add-staff', 'PickBazar\Http\Controllers\ShopController@addStaff');
        Route::post('users/remove-staff', 'PickBazar\Http\Controllers\ShopController@removeStaff');
        Route::get('staffs', 'PickBazar\Http\Controllers\UserController@staffs');
        Route::get('my-shops', 'PickBazar\Http\Controllers\ShopController@myShops');
    }
);

// Route::group(['middleware' => ['permission:' . Permission::SUPER_ADMIN . '|' . Permission::CUSTOMER, 'auth:sanctum']], function () {

//     Route::apiResource('users', UserController::class);
//     });
    Route::apiResource('users', UserController::class);

Route::group(['middleware' => ['permission:' . Permission::SUPER_ADMIN]], function () {
    Route::apiResource('types', TypeController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);
    Route::apiResource('withdraws', WithdrawController::class, [
        'only' => ['update', 'destroy']
    ]);
    Route::apiResource('categories', CategoryController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);
    Route::apiResource('shop-categories', ShopCategoryController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);

    Route::apiResource('offers', OfferController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);

    Route::apiResource('brand-offers', BrandOfferController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);

    

    Route::apiResource('coupons', CouponController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);

    Route::apiResource('order_status', OrderStatusController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);

    Route::apiResource('settings', SettingsController::class, [
        'only' => ['store']
    ]);

    
    Route::post('users/ban-user', 'PickBazar\Http\Controllers\UserController@banUser');
    Route::post('users/active-user', 'PickBazar\Http\Controllers\UserController@activeUser');
    Route::apiResource('taxes', TaxController::class);
    Route::apiResource('shipping', ShippingController::class);
    Route::post('approve-shop', 'PickBazar\Http\Controllers\ShopController@approveShop');
    Route::post('disapprove-shop', 'PickBazar\Http\Controllers\ShopController@disApproveShop');
    Route::post('approve-withdraw', 'PickBazar\Http\Controllers\WithdrawController@approveWithdraw');
});
     

    Route::get('all-taxes', 'PickBazar\Http\Controllers\TaxController@all_taxes');
    Route::get('user-withdraws', 'PickBazar\Http\Controllers\WithdrawController@fetchUserWithdraws');
    Route::post('user-withdraws', 'PickBazar\Http\Controllers\WithdrawController@storeUserWithdraws');
    Route::get('sluggify','PickBazar\Http\Controllers\LogController@sluggify');


    Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::apiResource('delivery', DeliveryController::class, [
        'only' => ['store', 'index', 'show']
    ]);
    Route::post('/delivery/payment','PickBazar\Http\Controllers\DeliveryController@payment');
    Route::get('/admin/delivery','PickBazar\Http\Controllers\DeliveryController@fetchAdminDeliverys');
    Route::post('/approve-delivery','PickBazar\Http\Controllers\DeliveryController@approveDelivery');
    Route::post('/delivery-cost ','PickBazar\Http\Controllers\DeliveryController@storeDeliveryCost');
    Route::get('/delivery-cost','PickBazar\Http\Controllers\DeliveryController@fetchDeliveryCost');

});


//by saurav for class name

//    Routes::post('/')



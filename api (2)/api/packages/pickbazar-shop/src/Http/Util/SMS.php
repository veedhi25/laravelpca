<?php

namespace PickBazar\Http\Util;

use Exception;
use GuzzleHttp\Client;
use PickBazar\Database\Models\Order;
use PickBazar\Database\Models\SMSLog;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

class SMS
{
    private static $key="857ba560-8f7d-11eb-a9bc-0200cd936042";

    private static function random($size)
    {
        $permitted_chars = '1234567890';
        return substr(str_shuffle($permitted_chars), 0, $size);
    }

    public static function sendOTP($phone_number)
    {
        $phone_number=SMS::formate_number($phone_number);

        $client = new Client();

        $otp=SMS::random(5);
        $key=SMS::$key;

        $url = "https://2factor.in/API/V1/$key/SMS/$phone_number/$otp";

        $response = $client->request('GET', "$url");

        if ($response->getStatusCode() == 200) {
            return $otp;
        }else{
            //dd('not sent');
        }
    } 
      
    
    private static function formate_number($phone_number)
    {
        $phone_number=str_replace("(","",$phone_number);
        $phone_number=str_replace(")","",$phone_number);
        $phone_number=str_replace(" ","",$phone_number);

        return $phone_number;
    }

    
    public static function welcome($phone_number,$username)
    {
        $phone_number=SMS::formate_number($phone_number);
        $key=SMS::$key;
        $client = new Client();

        $template="LowcalRegister";
        $url = "https://2factor.in/API/R1/?module=TRANS_SMS&apikey=$key&to=$phone_number&from=LOWCAL&templatename=$template&var1=$username&var2=$username";

        $response = $client->request('GET', "$url");

        if ($response->getStatusCode() == 200) {
            return "Success";
        }else{
            //dd('not sent');
        }
    }


     function inviteFriend($phone_number,$username)
    {
        $phone_number=SMS::formate_number($phone_number);
        $key=SMS::$key;
        $client = new Client();

        $template="LowcalInvite";
        $url = "https://2factor.in/API/R1/?module=INVITE_SMS&apikey=$key&to=$phone_number&from=LOWCAL&templatename=$template&var1=$username&var2=$username";

        $response = $client->request('GET', "$url");

        if ($response->getStatusCode() == 200) {
            return "Success";
        }else{
            //dd('not sent');
        }
    }
    

    public static function customerPurchase($phone_number,$username, $shop_name="")
    {
        if(!$phone_number){
            return;
        }

        $phone_number=SMS::formate_number($phone_number);
        $key=SMS::$key;
        $client = new Client();
        
        $template="CustomerPurchasing";
        $url = "https://2factor.in/API/R1/?module=TRANS_SMS&apikey=$key&to=$phone_number&from=LOWCAL&templatename=$template&var1=$username&var2=$shop_name";

        $response = $client->request('GET', "$url");

        if ($response->getStatusCode() == 200) {
            return "Success";
        }else{
            //dd('not sent');
        }
    }

    
  
    public static function purchaseToVendor($phone_number,$username)
    {
        if(!$phone_number){
            return;
        }

        $phone_number=SMS::formate_number($phone_number);
        $key=SMS::$key;
        $client = new Client();
        
        $template="PurchaseToVendor";
        $url = "https://2factor.in/API/R1/?module=TRANS_SMS&apikey=$key&to=$phone_number&from=LOWCAL&templatename=$template&var1=$username&var2=$username";

        $response = $client->request('GET', "$url");

        if ($response->getStatusCode() == 200) {
            return "Success";
        }else{
            //dd('not sent');
        }
    }



    public static function orderStatusChanged($phone_number,$username,$order_tracking_number,$status)
    {
        // Schema::dropIfExists('s_m_s_logs');

        // Schema::create('s_m_s_logs', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('phone_number');
        //     $table->string('order_tracking_number');
        //     $table->unsignedBigInteger('customer_id');
        //     $table->unsignedBigInteger('order_id')->nullable();
        //     $table->string('status')->nullable();
        //     $table->string('username');
        //     $table->text('categories');
        //     $table->foreign('customer_id')->references('id')->on('users');
        //     $table->timestamps();
        // });
        try{
            $order=Order::where('tracking_number',$order_tracking_number)->first();
            $categories=[];
            foreach($order->products as $product){
                foreach($product->categories as $category){
                    $categories[]=$category->name;
                }
            }
    
            SMSLog::create([
                'phone_number'=>$phone_number,
                'order_tracking_number'=>$order_tracking_number,
                'order_id'=>$order->id,
                'status'=>$status,
                'username'=>$username,
                'categories'=>json_encode($categories),
                'customer_id'=>$order->customer_id,
            ]);
        }catch(Exception $e){
            
        }
        if(!$phone_number){
            return;
        }
        
        
        $phone_number=SMS::formate_number($phone_number);
        $key=SMS::$key;
        $client = new Client();
        
        $template="OrderstatusLowcal";
        $url = "https://2factor.in/API/R1/?module=TRANS_SMS&apikey=$key&to=$phone_number&from=LOWCAL&templatename=$template&var1=$username&var2=$order_tracking_number&var3=$status";
        
        $response = $client->request('GET', "$url");
        
        if ($response->getStatusCode() == 200) {
            
            return "Success";

        }else{
            //dd('not sent');
        }
    }

    public static function userInvite($phone_number,$username,$invitee)
    {
        if(!$phone_number){
            return;
        }

        $phone_number=SMS::formate_number($phone_number);
        $key=SMS::$key;
        $client = new Client();

        $template="UserInvite";
        $url = "https://2factor.in/API/R1/?module=TRANS_SMS&apikey=$key&to=$phone_number&from=LOWCAL&templatename=$template&var1=$username&var2=$invitee";

        $response = $client->request('GET', "$url");

        if ($response->getStatusCode() == 200) {
            return "Success";
        }else{
            //dd('not sent');
        }
    }
}


// Insert value list does not match column list:
//    1136 Column count doesn't match value count at row 2 (SQL: 
//    insert into `order_product` 
//    (`created_at`, 
//    `order_id`,
//     `order_quantity`,
//     `product_id`, 
//     `subtotal`, 
//     `unit_price`, 
//     `updated_at`) values 

//     (2021-12-21 11:39:46,
//      1001,
//      1,
//      7845,
//      89, 
//      89, 
//      2021-12-21 11:39:46), 
//     (2021-12-21 11:39:46,
//      1001,
//      1, 
//      7822, 
//      199, 
//      199, 
//      2021-12-21 11:39:46, 
//      473))

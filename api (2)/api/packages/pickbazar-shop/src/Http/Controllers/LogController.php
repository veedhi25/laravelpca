<?php

namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use PickBazar\Database\Models\Log;
use PickBazar\Database\Models\Product;
use PickBazar\Database\Models\Shop;
use PickBazar\Database\Repositories\LogRepository;
use Cviebrock\EloquentSluggable\Services\SlugService;
use PickBazar\Helpers\InteraktHelper;


class LogController extends CoreController
{
    public $repository;

    public function __construct(LogRepository $repository)
    {
        $this->repository = $repository;
    }

    public function fetchLogs(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->with('user')->with('order')->with('shop')->paginate($limit);
    }

    public static function ipAddress(Request $request){

        $ip = $request->ip();
        $api_key = 'efa82abc72a10a98a0d3377f0d3a1666';
        // $ip ='125.17.177.162';
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'http://api.ipstack.com/'.$ip.'?access_key='.$api_key,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return $response;

    }


   public  function  ip_AddressLocation(Request $request) {

        $ip = $request->ip();
       
        // $ip ='103.81.156.163';
    
        $data = \Location::get($ip);
    
        //  dd($data);
         return $data;
    
    }

    public function createWhatsappShopVisitorEvent($payload)
    {
        $CURLOPT_POSTFIELDS = $payload;
        
        $endpoint = 'track/events/';

        $response = InteraktHelper::interaktApi(json_encode($CURLOPT_POSTFIELDS),$endpoint);

        return $response;
    }

    public function store(Request $request)
    {

        
        
        $location=$request->location;
        $search=$request->search;
        $user=$request->user();
        $product=$request->product;
        $shop=$request->shop;

        date_default_timezone_set('Asia/Kolkata'); 

        $date = date('d-m-Y g:i:s');

        $newDate = date('d-m-Y g:i a', strtotime($date));
    
        // $date= new Date();
        // $dt2=date("Y-m-d H:i a");
        // $ip_location=$this->ip_AddressLocation($request);

        if($request->type=="item-removed"){
            $product=Product::find($product["id"]);
            Log::create([
                "user_id"=>($user)?$user->id:NULL,
                "ip_address"=>$request->ip(),
                'ip_location'=>$ip_location,
                "location"=>$location,
                "products"=>$product['name'],
                "shop_id"=>$product->shop_id,
                "type"=>"item-removed",
            ]);
        }
        
        else if($request->type=="item-added"){
            $product=Product::find($product["id"]);
            Log::create([
                "user_id"=>($user)?$user->id:NULL,
                "ip_address"=>$request->ip(),
                'ip_location'=>$ip_location,
                "location"=>$location,
                "products"=>$product['name'],
                "shop_id"=>$product->shop_id,
                "type"=>"item-added",
            ]);
        }


        else if($request->type=="shop-visited"){
            $shop=Shop::find($shop["id"]);
            Log::create([
                "user_id"=>($user)?$user->id:NULL,
                "ip_address"=>$request->ip(),
            
                // 'ip_location'=>$ip_location,
                "location"=>$location,
                // "shop_name"=>$shop['name'],
                "shop_id"=>$shop->id,
                "type"=>"shop-visited",
                'visited_on'=> $newDate,
            ]);
        }

        //item-added-to-wishlist
        else if($request->type=="item-added-to-wishlist"){
            $product=Product::find($product["id"]);
            Log::create([
                "user_id"=>($user)?$user->id:NULL,
                "ip_address"=>$request->ip(),
                'ip_location'=>$ip_location,
                "location"=>$location,
                "products"=>$product['name'],
                "shop_id"=>$product->shop_id,
                "type"=>"item-added-to-wishlist",
            ]);
        }

        //item-removed-from-wishlist
        else if($request->type=="item-removed-from-wishlist"){
            $product=Product::find($product["id"]);
            Log::create([
                "user_id"=>($user)?$user->id:NULL,
                "ip_address"=>$request->ip(),
                'ip_location'=>$ip_location,
                "location"=>$location,
                "products"=>$product['name'],
                "shop_id"=>$product->shop_id,
                "type"=>"item-removed-from-wishlist"
            ]);
        }

        else if($search)
        {
            Log::create([
                "user_id"=>($user)?$user->id:NULL,
                "ip_address"=>$request->ip(),
                // 'ip_location'=>$ip_location,
                "location"=>$location,
                "search_item"=>$search,
                "type"=>"search_item"
            ]);
        }
        else if($location)
        {
            Log::create([
                "user_id"=>($user)?$user->id:NULL,
                "ip_address"=>$request->ip(),
                'ip_location'=>$ip_location,
                "location"=>$location,
                "type"=>"location"
            ]);
        }

        $dob = date('d-m-Y', strtotime($user->date_of_birth));

        $payload = array(
            "userId"=> $user->id,
            "phoneNumber"=> $shop->settings['contact'],
            // 'phone_number'=>$user->phone_number,
            'userName'=> $user->name,
            // 'shop_owner_phone_number'=>$order->shop->settings,
            // 'shop_owner_name'=>$product->shop->name,
            "countryCode"=> "+91",
            "event"=> "Shop Visitor",
            "traits"=> [
                // "productDetail"=> json_encode($request->products),
                // "productDetail"=> json_encode($request->products->unit_price
                //     ->map(function($item){
                //         return $item->unit_price;
                //     })),
                'userName'=> $user->name,
                'email'=>$user->email,
                'user_phone_number'=>$user->phone_number,
                'date_of_birth'=>$dob,
                'visited_on'=>date('Y-m-d H:i:s'),
                 
                'shop_name'=> $shop->name,
                // get all the product names in array
                // 'product_name'=> $product->name,
                // 'product_name'=> $product->name,
                'shop_owner_phone_number'=>$shop->settings['contact'],
                'shop_owner_name'=>$shop->name,
                // "price"=> $request->amount,
                // "orderId"=> $request->tracking_number,
                // "delivery_time"=> $request->delivery_time,
                // 'description'=> $request->description,
                // "payment_gateway"=> $request->payment_gateway,
                // "currency"=>"INR"
            ],
            "createdAt"=> date('Y-m-d H:i:s')
        );

        $interkt_response = $this->createWhatsappShopVisitorEvent($payload);
        // $logs->interakt_response = $interkt_response;
        return $interkt_response;

        // return 1;
    }

    public function destory($id){
        $log=Log::find($id);
        $log->delete();

        return 1;
    }


    public function sluggify(){
        $products=Product::select('id')->get();    
        foreach($products as $p){
            $product=Product::find($p->id);
            if($product){
                $product->slug=$product->slug.$product->id;
                $product->save();
            }
        }

        return "done";
    }
}

<?php


namespace PickBazar\Database\Repositories;

use Exception;
use Carbon\Carbon;
use Illuminate\Support\Str;
use PickBazar\Http\Util\SMS;
use App\Models\ReferralEarning;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use PickBazar\Database\Models\Log;
use PickBazar\Database\Models\Shop;
use PickBazar\Database\Models\User;
use PickBazar\Database\Models\Coupon;
use PickBazar\Helpers\InteraktHelper;
use PickBazar\Database\Models\Balance;
use PickBazar\Database\Models\Product;
use Illuminate\Support\Facades\Request;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Database\Models\UtilityPayment;
use Prettus\Repository\Criteria\RequestCriteria;
use PickBazar\Database\Models\ReferralCommission;
use Prettus\Validator\Exceptions\ValidatorException;
use Prettus\Repository\Exceptions\RepositoryException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Ignited\LaravelOmnipay\Facades\OmnipayFacade as Omnipay;
use LoveyCom\CashFree\PaymentGateway\Order as CashFreeOrder;
use Illuminate\Support\Arr;


class UtilityPaymentRepository extends BaseRepository
{
    /**
     * @var string[]
     */
    
    protected $dataArray = [
        'tracking_number',
        'customer_id',
        'customer_contact',
        'circle',
        'usertx',
        'operator',
        'operator_code',
        'status',
        'amount',
        'total',
        'coupon_id',
        "isPayedByCustomer",
        'discount',
        'payment_id',
        'payment_gateway',
        'status',
        'customer_id',
    ];

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }


    /**
     * Configure the Model
     **/
    public function model()
    {
        return UtilityPayment::class;
    }

    /**
     * @param $request
     * @return LengthAwarePaginator|JsonResponse|Collection|mixed
     */

    public function recharge($data){
        
        $mobileOperator = [
            [
                'id' => 1,
                'name' => 'Airtel',
                'OperatorCode' => 'AT',
                'label' => 'Airtel',
            ],
            [
                'id' => 2,
                'name' => 'BSNL',
                'OperatorCode' => 'BS',
                'label' => 'BSNL',
            ],
            [
                'id' => 3,
                'name' => 'Jio',
                'OperatorCode' => 'JIO',
                'label' => 'Jio',
            ],
            [
                'id' => 4,
                'name' => 'Vodafone Idea',
                'OperatorCode' => 'VI',
                'label' => 'Vi',
            ],
            [
                'id' => 5,
                'name' => 'MTNL',
                'OperatorCode' => 'MT',
                'label' => 'MTNL',
            ],
        ];
         
        $member_id = 'EZ929952';
        $pin = 'C019FB28E2';
        $number= $data->customer_contact;
        $operator=$data->operator;
        $usertx=Str::random(35);
        $circle=$data->circle;
        $amount=$data->amount;
        $operator_code = Arr::first(array_filter($mobileOperator, function ($op) use ($operator) {
            return $op['name'] === $operator;
        }))['OperatorCode'];

        $curl = curl_init();

        $URL='https://ezulix.in/api/recharge.aspx?memberid='.$member_id.'&pin='.$pin.'&number='.$number.'&operator='.$operator_code.'&circle='.$circle.'&usertx='.$usertx.'&amount='.$amount;

        curl_setopt_array($curl, array(
            CURLOPT_URL => $URL,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            // CURLOPT_POSTFIELDS =>  json_encode($data),
            CURLOPT_HTTPHEADER => array(
                'Content-Type: text/plain',
                'Content-Length: 500'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        return  $usertx;

    }

   
    /**
     * @param $request
     * @return LengthAwarePaginator|JsonResponse|Collection|mixed
     */

   private function sendSMS($order){

        try{
            
            if($order){
                if($order->shop_id){
                    $shop=Shop::find($order->shop_id);
                    $customer=$order->customer;
                    $phone_number=$this->clearStr($order->customer_contact);
                    SMS::customerPurchase($phone_number,$customer->name,$shop->name);

                    // enable msg to vendor
                    if(isset($shop)){
                        $user=$shop->owner;
                        
                            // SMS::purchaseToVendor('7018265262', $user->name);
                            SMS::purchaseToVendor('9056147024', $user->name); 
                            $products = $order->products;

                            foreach($order->childrens as $child){
                                $product_name = $child->name;
                                $product_price = $child->price;
                                $shop_name = $child->shop->name;
                                $price = $child->price;
                                $phone_number =$child->shop->settings['contact'];
                                $delivery_time = $child->delivery_time;
                            }
                            // foreach($products as $product){
                            //    $product_name = $product->name;
                            //      $product_price = $product->price;
                            //      $shop_name = $product->shop->name;
                            //      $price = $product->price;
                            //      $phone_number = $this->clearStr($product->shop->owner->phone_number);
                            // }

                            $payload = array(
                                "userId"=> $product->shop->owner_id,
                                "phoneNumber"=> $phone_number,
                               
                                "countryCode"=> "+91",
                                "event"=> "UtilityPayment Recieved By Vendor",
                                "traits"=> [
                                    "productDetail"=> json_encode($request->products),
                                   
                                    'shop_name'=> $shop_name,
                                    'product_name'=> $product_name,
                                    'shop_owner_phone_number'=>$phone_number,
                                    'shop_owner_name'=>$shop_name,
                                    'delivery_time'=> $delivery_time,
                                    
                                    'order_id'=> $order->tracking_number,
                                    // "price"=> $request->amount,
                                    // "orderId"=> $request->tracking_number,
                                    // "delivery_time"=> $request->delivery_time,
                                    // 'description'=> $request->description,
                                    // "payment_gateway"=> $request->payment_gateway,
                                    "currency"=>"INR"
                                ],
                                "createdAt"=> date('Y-m-d H:i:s')
                            );
                    }
                }    

                $interkt_response = $this->createWhatsappVendorUtilityPaymentEvent($payload);     
            }

            $order->interakt_response = $interkt_response;

            return $order;

        } catch(Exception $e) {

        }
           
    }

    private function clearStr($str){
        
        $str=str_replace("(","",$str);
        $str=str_replace(")","",$str);
        $str=str_replace(" ","",$str);
        return $str;
    }
    /**
     * @param $request
     * @return mixed
     */
    protected function capturePayment($request)
    {
        $card = Omnipay::creditCard($request['card']);
        $amount = $request['paid_total'];
        $currency = 'INR';
        $transaction =
            Omnipay::purchase(array(
                'amount'   => $amount,
                'currency' => $currency,
                'card'     => $card,
            ));
        return $transaction->send();
    }


    private function formattedAddress($order)
    {
        $location=json_decode(json_encode($order->shop->settings["location"]));
        if($location){
            $location->formattedAddress;
        }
        return NULL;
    }













    public function getDeliveryCharges($request,$shop_id){
        $shop=Shop::find($shop_id);
        if($request['delivery_fee']>0){
            return $shop->delivery_charges;
        }
        return 0;
    }

    public function createWhatsappUtilityPaymentEvent($payload)
    {
        $CURLOPT_POSTFIELDS = $payload;
        
        $endpoint = 'track/events/';

        $response = InteraktHelper::interaktApi(json_encode($CURLOPT_POSTFIELDS),$endpoint);

        return $response;
    }

    public function createWhatsappVendorUtilityPaymentEvent($payload2)
    {
        $CURLOPT_POSTFIELDS = $payload2;
        
        $endpoint = 'track/events/';

        $response = InteraktHelper::interaktApi(json_encode($CURLOPT_POSTFIELDS),$endpoint);

        return $response;
    }
}

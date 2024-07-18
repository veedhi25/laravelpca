<?php

namespace PickBazar\Http\Controllers;

use Exception;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use PickBazar\Http\Util\SMS;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use PickBazar\Database\Models\User;
use PickBazar\Database\Models\Order;
use PickBazar\Database\Models\UpiPayment;
use PickBazar\Database\Models\Delivery;
use PickBazar\Exceptions\PickbazarException;
use Prettus\Validator\Exceptions\ValidatorException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use PickBazar\Database\Models\UtilityPayment;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Illuminate\Support\Arr;

class GatewayResponse extends CoreController

{
    public function process_response(Request $request)

    {
        $response = request()->all();

        $order_id = $response['orderId'] ?? null;
        $orderAmount = $response['orderAmount'] ?? null;
        $referenceId = $response['referenceId'] ?? null;
        $txStatus = $response['txStatus'] ?? null;
        $paymentMode = $response['paymentMode'] ?? null;
        $txMsg = $response['txMsg'] ?? null;
        $txTime = $response['txTime'] ?? null;
        $signature = $response['signature'] ?? null;

        $parent_orderid = Order::where('tracking_number', $order_id)->first()->id;
        if ($txStatus != "SUCCESS") {
            Order::where('tracking_number', $order_id)->update(['status' => 8]);
            Order::where('parent_id', $parent_orderid)->update(['status' => 8]);
        }

        Order::where('id', $parent_orderid)->update(['gateway_response' => json_encode(request()->all())]);

        // $url = \Config::get('app.shop_url')."/orders/".$order_id;
        $url = "https: //retailunnati.com/orders/" . $order_id;

        return redirect()->away($url);
    }

    public function upi_payment_response(Request $request)

    {
        
        $response = request()->all();

        return $response ;

        $order_id = $response['orderId'] ?? null;
        $orderAmount = $response['orderAmount'] ?? null;
        $referenceId = $response['referenceId'] ?? null;
        $txStatus = $response['txStatus'] ?? null;
        $paymentMode = $response['paymentMode'] ?? null;
        $txMsg = $response['txMsg'] ?? null;
        $txTime = $response['txTime'] ?? null;
        $signature = $response['signature'] ?? null;

        $parent_orderid = UpiPayment::where('transaction_id', $order_id)->first()->id;

        // if ($txStatus != "SUCCESS") {
        //     UpiPayment::where('transaction_id', $order_id)->update(['status' => 8]);
        //     UpiPayment::where('parent_id', $parent_orderid)->update(['status' => 8]);
        // }

        // Order::where('id', $parent_orderid)->update(['gateway_response' => json_encode(request()->all())]);

        // $url = \Config::get('app.shop_url')."/orders/".$order_id;
        $url = "https: //retailunnati.com/upi-payment/?" . $response;

        return redirect()->away($url);
    }

    /**
     * @param $request
     * @return LengthAwarePaginator|JsonResponse|Collection|mixed
     */


     public function recharge($data) {
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
      $usertx=$data->usertx;
      $circle=$data->circle;
      $amount=$data->amount;
      $operator_code = Arr::first(array_filter($mobileOperator, function ($op) use ($operator) {
        return $op['name'] === $operator;
    }))['OperatorCode'];
    
      $URL = 'https://ezulix.in/api/recharge.aspx?memberid='.$member_id.'&pin='.$pin.'&number='.$number.'&operator='.$operator_code.'&circle='.$circle.'&usertx='.$usertx.'&amount='.$amount;
      $http = new \GuzzleHttp\Client;
      $response = $http->post($URL, []);
      $code = $response->getStatusCode();
      $result = $response->getBody();
      return  $code;
  }
  


    public function rechargeStatus($trans_id) {

        $member_id = 'EZ929952';
        $pin = 'C019FB28E2';
        
      
        $curl = curl_init();
      
        $url = 'https://ezulix.in/api/rechargestatus.aspx?memberid='.$member_id.'&pin='.$pin.'&transid='.$trans_id;
      
        curl_setopt_array($curl, [
          CURLOPT_URL => $url,
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'GET',
        ]);
      
        $response = curl_exec($curl);
      
        curl_close($curl);
        $data=explode(',',$response);
        if(isset($data[0])){
          return $data[0];
        }
        return $response;
      }

    public function processResponseUtilityPayment(Request $request){

        $response = request()->all();

        $txStatus = $response['txStatus'] ?? null;
        $order_id = $response['orderId'] ?? null;
        
        if($txStatus == "SUCCESS") {

            UtilityPayment::where('tracking_number', $order_id)->update(['isPayedByCustomer' => 1]);
            $utility_payment=UtilityPayment::where('tracking_number', $order_id)->first();
            $code=$this->recharge($utility_payment);

            $recharge_status = $this->rechargeStatus($order_id);
            // $recharge_api_txid = $recharge_status[1];

            if ($code==200 && $recharge_status=="Success"){
              UtilityPayment::where('tracking_number', $order_id)->update(['status' => 'APPROVED']);
            } else if ($code==200 && $recharge_status=="Pending"){
              UtilityPayment::where('tracking_number', $order_id)->update(['status' => 'PENDING']);
            } else {
              UtilityPayment::where('tracking_number', $order_id)->update(['status' => 'FAILED']);
            }

            // $url = "https: //retailunnati.com/user/utility-payments";
            $callback_url="https: //retailunnati.com/callback?status=$recharge_status&txid=$order_id&mytxid=aPITransID&optxid=$utility_payment->operator_code&mobileno=$utility_payment->customer_contact";

            return redirect()->away($callback_url);

        }

    //     return redirect()->away("https: //retailunnati.com");        

    // }

    // public function processResponseUtilityPayment(Request $request){

    //     $response = request()->all();
      
    //     $txStatus = $response['txStatus'] ?? null;
    //     $order_id = $response['orderId'] ?? null;
      
    //     if($txStatus == "SUCCESS") {
      
    //       UtilityPayment::where('tracking_number', $order_id)->update(['isPayedByCustomer' => 1]);
    //       $utility_payment=UtilityPayment::where('tracking_number', $order_id)->first();
    //       $code=$this->recharge($utility_payment);
      
    //       // Use the statusApi function to get the status of the recharge
    //       $recharge_status = $this->statusApi($utility_payment->trans_id);
      
    //       // Extract the relevant information from the response array
    //       $status = $recharge_status[1];
    //       $error_code = $recharge_status[2];
    //       $operator_ref = $recharge_status[3];
    //       $time = $recharge_status[4];
      
    //       // Update the status of the recharge based on the response
    //       if ($status == 'SUCCESS') {
    //         UtilityPayment::where('tracking_number', $order_id)->update(['status' => 'APPROVED']);
    //       } else {
    //         UtilityPayment::where('tracking_number', $order_id)->update(['status' => 'FAILED']);
    //       }
      
    //       // Use the callback URL provided by the API provider as the redirect URL
    //       $callback_url = "https: //retailunnati.com/callback?status=Success&txid=TransID&mytxid=aPITransID&optxid=OPeratorID&mobileno=Mobile";
      
    //       return redirect()->away($callback_url);
      
    //     }
      
    //     return redirect()->away("https: //retailunnati.com");
      
    //   }
        }
      
    
    
    public function process_delivery_response(Request $request)
    {

        $response = request()->all();

        $order_id = $response['orderId'] ?? null;
        $orderAmount = $response['orderAmount'] ?? null;
        $referenceId = $response['referenceId'] ?? null;
        $txStatus = $response['txStatus'] ?? null;
        $paymentMode = $response['paymentMode'] ?? null;
        $txMsg = $response['txMsg'] ?? null;
        $txTime = $response['txTime'] ?? null;
        $signature = $response['signature'] ?? null;
        

        $id = Delivery::where('tracking_number', $order_id)->first()->id;

        if ($txStatus != "SUCCESS") {
            $delivery = Delivery::where('id', $id)->update(['is_approved' => 1]);
            $user = User::find($delivery->user_id);
            $delivery->is_approved = 1;
            $delivery->save();
            // $url = \Config::get('app.shop_url')."/orders/".$order_id;
            try {
                SMS::customerPurchase($delivery->sender_phone_number, $user->name);
            } catch(Exception $e) {

            }

            $url = "https: //retailunnati.com/user/delivery";

            return redirect()->away($url);
        }
    }

}

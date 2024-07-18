<?php

namespace PickBazar\Database\Repositories;

use PickBazar\Database\Models\UpiPayment;
use Illuminate\Support\Str;

class UpiPaymentRepository extends BaseRepository

{

   // ...

    /**
     * Specify Model class name
     *
     * @return string
     */

     public function model()
    {
        return UpiPayment::class;
    }


    public function storePayment($request)
    {

      // return $request;
        $user = $request->user();
        $request['transaction_id'] = Str::random(14);
        $request['id'] = $request->user()->id;
        $request['sender_name'] = $request->user()->name;
        $request['receiver_name'] = $request->reciever_name;
        $request['receiver_upi_id'] = $request->reciever_upi;
        $request['email_id'] = $request->user()->email;
        // $request['status'] = $request->status;
        $request['customer_contact'] = $request->user()->phone_number;

        $orderId = $request['transaction_id'];
        $orderAmount = $request['amount'];
        $orderNote = "Subscription";
        $customerPhone = $request->customer_contact;
        $customerName = $user->name;
        $customerId = '1234';
        $customerEmail = $user->email ?? "test@cashfree.com";
        $payment_methods = 'cc';
        $new = 'https: //retailunnati.com/upi-payment?order_id='.$orderId;
        $new2 = "https://127.0.0.1:8000/upi-payment/success?order_id=".$orderId;
        
        $returnUrl =  $new2;
        $notifyUrl =  $new2;

        $curl = curl_init();

        $postFields = array(
          "order_id" =>  $orderId,
          "order_amount" => $orderAmount,
          "order_currency" =>  'INR',
          "customer_details" => array(
            "customer_id" => $customerId,
            "customer_email" => $customerEmail,
            "customer_phone" => $customerPhone,
          ),
          "order_meta" => array(
            "return_url" => $returnUrl,
            "notify_url" => $notifyUrl,
          )

        );

        $data = [
          'customer_details' => [
              'customer_id' => $customerId,
              'customer_email' => $customerEmail,
              'customer_phone' => $customerPhone,
          ],
          'order_meta' => [
            // 'return_url' => url('upi-payment/success').'/'.$orderId,
              // 'return_url' => 'https://127.0.0.1:8000/upi-payment/success?order_id='.$orderId,
              // 'notify_url' => 'https://127.0.0.1:8000/upi-payment/success?order_id='.$orderId,
              'return_url'=> `https://api.retailunnati.com/upi-payment/success?order_id=$orderId`,
              // 'return_url' => 'https: //retailunnati.com/order_id={order_id}',
              'notify_url' => 'https://api.retailunnati.com/upi-payment/success?order_id=$orderId'
          ],

          'order_id' => $orderId,
          'order_amount' => $orderAmount,
          
          'order_currency' => 'INR'
      ];

        // return $postFields;
          $postFields = json_encode($data);
          
          curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.cashfree.com/pg/orders',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $postFields,
            // CURLOPT_POSTFIELDS =>  "{\"customer_details\":{\"customer_id\":\"7112AAA812234\",\"customer_email\":\"john@cashfree.com\",\"customer_phone\":\"9908734801\"},\"order_meta\":{\"return_url\":\"https://b8af79f41056.eu.ngrok.io?order_id={order_id}\",\"notify_url\":\"https://b8af79f41056.eu.ngrok.io/webhook.php\"},\"order_id\":\"awsdfvbngfbdsc\",\"order_amount\":10.15,\"order_currency\":\"INR\"}",

            CURLOPT_HTTPHEADER => array(
              'Content-Type: application/json',
              'x-api-version: 2022-09-01',
              'x-client-id: 13353224f34e6b8d5dec4c7c13235331',
              'x-client-secret: 5cc5c4adb74168906d10b82bf7820a69dc23634a'
            ),
          ));

          
        
          $response = curl_exec($curl);
        
          curl_close($curl);
       
        // $type = gettype($response);
        $response = json_decode($response, true);
        if(isset($response['payment_session_id'])) {
          $payment_session_id = $response['payment_session_id'];
      } else {
        return $response;
           
      }

        // return $response;
      
        // $payment_session_id = 'werdfdrge3ewrfd';

        // return $response;

        $upi_curl = curl_init();

        $post_Fields = array(
            'payment_session_id' => $payment_session_id,
            'payment_method' => array(
              'upi' => array(
                'channel' => 'link',
               )
            )
            );


        $post_Fields = json_encode($post_Fields);
        
        curl_setopt_array($upi_curl, [
          CURLOPT_URL => "https://api.cashfree.com/pg/orders/sessions",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_POSTFIELDS => $post_Fields,
          CURLOPT_HTTPHEADER => [
            "accept: application/json",
            "content-type: application/json",
          ],
        ]);
        
        $upi_response = curl_exec($upi_curl);
        $err = curl_error($upi_curl);
        
        curl_close($upi_curl);
        
      return $upi_response;

    }

    // public function getPaymentById($id)
    // {

    //   $user = $request->user();
    //   $request[''] = Str::random(24);

    // }

    // public function getAllPayments()
    // {
    //     return UpiPayment::all();
    // }
}

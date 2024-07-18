<?php 

namespace PickBazar\Helpers;

use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;




class InteraktHelper

{

    public static function interaktApi($CURLOPT_POSTFIELDS, $endpoint)
    {
        $api_key    = 'ejBmYUl2RktGTWtBVHJPcGxDa0k4X1BqWndRdjVFSW81X2JIZmdKdlRXazo=';
        $api_header =   array(
                            'Content-Type: application/json',
                            'Authorization: Basic ejBmYUl2RktGTWtBVHJPcGxDa0k4X1BqWndRdjVFSW81X2JIZmdKdlRXazo=',
                            'Cookie: ApplicationGatewayAffinity=a8f6ae06c0b3046487ae2c0ab287e175; ApplicationGatewayAffinityCORS=a8f6ae06c0b3046487ae2c0ab287e175'
                        );
        $api_url    = 'https://api.interakt.ai/v1/public/'.$endpoint;
        
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => $api_url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS =>$CURLOPT_POSTFIELDS,
        CURLOPT_HTTPHEADER => $api_header,
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        return $response;
    }
}

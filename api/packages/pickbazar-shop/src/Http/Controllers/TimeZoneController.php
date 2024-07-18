<?php

namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;

class TimeZoneController extends CoreController
{
    public function getIndianTime()
    {
        $url = 'http://worldtimeapi.org/api/timezone/Asia/Kolkata';

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            return response()->json(['status' => 'error', 'message' => 'Request failed: ' . curl_error($ch)], 500);
        }

        curl_close($ch);

        $data = json_decode($response, true);

        return response()->json([
            'status' => 'success',
            'dateTime' => $data['datetime'],
            'timezone' => $data['timezone']
        ]);
    }
}

<?php

return [
    
    //These are for the Marketplace
    'appID' => '',
    'secretKey' => '',
    'testURL' => 'https://ces-gamma.cashfree.com',
    'prodURL' => 'https://ces-api.cashfree.com',
    'maxReturn' => 100, //this is for request pagination
    'isLive' => false,

    //For the PaymentGateway.
    //live: appID: 13353224f34e6b8d5dec4c7c13235331
    //live: secretKey: 5cc5c4adb74168906d10b82bf7820a69dc23634a
    'PG' => [
        //  live keys
        'appID' => '13353224f34e6b8d5dec4c7c13235331',
        'secretKey' => '5cc5c4adb74168906d10b82bf7820a69dc23634a',

        //  test keys 
        // 'appID' => '86476b28568df28cc6b9dc11567468',
        // 'secretKey' => 'e437a64b56d62b71638e8dd4957e268409a7b6ba',
        'testURL' => 'https://test.cashfree.com',
        'prodURL' => 'https://api.cashfree.com',
        'isLive' => true
    ]
];

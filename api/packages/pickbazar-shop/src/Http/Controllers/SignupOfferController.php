<?php

namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use PickBazar\Database\Models\SignupOffer;

class SignupOfferController extends CoreController
{
    public function show()
    {
        return SignupOffer::find(1);
    }

    public function store(Request $request)
    {
        $singup_offer=SignupOffer::find(1);
        if($singup_offer){
            $singup_offer->update($request->all());
            return 1;
        }
        SignupOffer::create($request->all());
        return 1;
    }
}

<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
// use PickBazar\Database\Models\Class;
 
class classController extends Controller
{
   

    public function formsubmit(Request $res)
    {     
       
        $class = new Customer;
        $class->name = $res['name'];
        
        $class->save();

        

    }

    // public function customer()
    // {
       
    //     $customers  = Customer::all();

    //     $data = compact('customers');

    //     return view('table')->with($data);

    // }

    // public function delete($id)
    // {
    //  $customer = Customer::find($id)->delete();
    //  return redirect('/register/data');
    // }
}

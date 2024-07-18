<?php


namespace PickBazar\Database\Repositories;

use PickBazar\Database\Models\Delivery;
use PickBazar\Database\Models\DeliveryConfig;
use Illuminate\Support\Facades\Request;
use Prettus\Repository\Criteria\RequestCriteria;
use Illuminate\Support\Str;
use Prettus\Repository\Exceptions\RepositoryException;

class DeliveryRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'shop_id',
        'user_id'
    ];

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    public function storeDelivery($request){
        

        $user=$request->user();
        $data=$request->all();
        $data['pickup_location']=json_encode($request->pickup_location);
        $data['drop_location']=json_encode($request->drop_location);
        $data['tracking_number'] = Str::random(12);
        $data['distance']=$this->getTimeAndDistance($request);
        $data['user_id']=$user->id;
        $config=DeliveryConfig::find(1);
        if($data['distance']<5){
            $data['amount']=$config->cost_upto_5km;
        }else{
            $cost_distance=$data['distance']-5;
            $data['amount']=($config->cost_per_km*$cost_distance)+$config->cost_upto_5km;
        }

        $delivery=$this->create($data);
        
        return $delivery;
        
    }


    public function getTimeAndDistance($request){
        $http = new \GuzzleHttp\Client;
        

        try {

            $response = $http->get('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='
                        .$request->pickup_location['lat'].','.$request->pickup_location['lng']
                        .'&destinations='
                        .$request->drop_location["lat"].','
                        .$request->drop_location["lng"].'&key=AIzaSyAhN31rb1mb4ejPcZiAqqjtrjOly3l960g');
            $data=json_decode($response->getBody());
            $meters=$data->rows[0]->elements[0]->distance->value;
            $kilometer=round($meters/1000,1);

            return $kilometer;

        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            return response()->json([
                "data"=>$e
            ]);
        }
    }


    /**
     * Configure the Model
     **/
    public function model()
    {
        return Delivery::class;
    }
}

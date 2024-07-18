<?php


namespace PickBazar\Database\Repositories;

use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\Balance;
use PickBazar\Database\Models\Shop;
use PickBazar\Database\Models\ShopCategory;
use PickBazar\Enums\Permission;
use PickBazar\Exceptions\PickbazarException;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;
use Prettus\Validator\Exceptions\ValidatorException;

class ShopRepository extends BaseRepository
{

    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name'        => 'like',
        'is_active',
        'categories.slug',
    ];

    /**
     * @var array
     */
    protected $dataArray = [
        'name',
        'description',
        'cover_image',
        'logo',
        'is_active',
        'sector',
        'address',
        'settings',
        "is_featured",
        "gst_number",
        "gst_certificate",
        "fssai_number",
        "fssai_certificate",
        "cancelled_cheque",
        "tan_number",
        "pan_number"
    ];
    // gst_certificate
    // fssai_certificate
    // cancelled_cheque

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
        return Shop::class;
    }

    public function storeShop($request)
    {
        
        try {
            
            $data = $request->only($this->dataArray);
            $data['owner_id'] = $request->user()->id;
            $data["gst_certificate"]=($data["gst_certificate"]==[])?NULL:json_encode($data["gst_certificate"]);
            $data["fssai_certificate"]=($data["fssai_certificate"]==[])?NULL:json_encode($data["fssai_certificate"]);
            $data["cancelled_cheque"]=($data["cancelled_cheque"]==[])?NULL:json_encode($data["cancelled_cheque"]);

            $shop = $this->create($data);
            if (isset($request['categories'])) {
                $shop->categories()->attach($request['categories']);
            }
            if(count($request->shop_categories)){
                $shop->shop_categories=$request['shop_categories'];
                $shop->save();
            }
            
            if (isset($request['balance']['payment_info'])) {
                $shop->balance()->create($request['balance']);
            }
            $shop->categories = $shop->categories;
            $shop->staffs = $shop->staffs;
            return $shop;
        } catch (ValidatorException $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }

    public function updateShop($request, $id)
    {

        try {
            $shop = $this->findOrFail($id);
            if (isset($request['categories'])) {
                $shop->categories()->sync($request['categories']);
            }
            if($request->shop_categories){
                $shop->shop_categories=$request->shop_categories;
            }
            if (isset($request['balance'])) {
                if (isset($request['balance']['admin_commission_rate']) && $shop->balance->admin_commission_rate !== $request['balance']['admin_commission_rate']) {
                    if ($request->user()->hasPermissionTo(Permission::SUPER_ADMIN)) {
                        $this->updateBalance($request['balance'], $id);
                    }
                } else {
                    $this->updateBalance($request['balance'], $id);
                }
            }
            // $data=$request->all();

            // $request->gst_certificate=($data["gst_certificate"]==[])?"":json_encode($data["gst_certificate"]);
            // $request->fssai_certificate=($data["fssai_certificate"]==[])?"":json_encode($data["fssai_certificate"]);
            // $request->cancelled_cheque=($data["cancelled_cheque"]==[])?"":json_encode($data["cancelled_cheque"]);
            
            $shop->update($request->only($this->dataArray));
            $shop->categories = $shop->categories;
            $shop->staffs = $shop->staffs;
            $shop->balance = $shop->balance;
            return $shop;
        } catch (ValidatorException $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }

    public function updateBalance($balance, $shop_id)
    {
        if (isset($balance['id'])) {
            Balance::findOrFail($balance['id'])->update($balance);
        } else {
            $balance['shop_id'] = $shop_id;
            Balance::create($balance);
        }
    }

    public static function getSortedShops($search,$shops_ids=[])
    {
        $shops=(count($shops_ids)) ? Shop::whereIn("id",$shops_ids)->get() : Shop::all();
        $sorted_shops=[];

        foreach($shops as $shop){
            if(!isset($shop->settings["location"])){
                continue;
            }

            $location=json_decode(json_encode($shop->settings["location"]));
            if($location){
                $lat2=$location->lat;
                $lng2=$location->lng;
                $distance=ShopRepository::getDistance($search->lat,$search->lng,$lat2,$lng2);
                $shop->distance=$distance;
                if($distance<100){
                    array_push($sorted_shops,$shop);
                }
            }
        }

        $sorted_shops=ShopRepository::quick_sort($sorted_shops);
        $shops_array=[];
        foreach($sorted_shops as $shop)
        {
            $shops_array[]=$shop->id;
        }
        return $shops_array;
    }

    private static function quick_sort($arr)
    {
        if(count($arr) <= 1){
            return $arr;
        }
        else{
            $pivot = $arr[0];
            $left = array();
            $right = array();
            for($i = 1; $i < count($arr); $i++)
            {
                if($arr[$i]->distance < $pivot->distance){
                    $left[] = $arr[$i];
                }
                else{
                    $right[] = $arr[$i];
                }
            }
            return array_merge(ShopRepository::quick_sort($left), array($pivot), ShopRepository::quick_sort($right));
        }
    }

    private static function getDistance($lat1, $lon1, $lat2, $lon2) {

        $pi80 = M_PI / 180;
        $lat1 *= $pi80;
        $lon1 *= $pi80;
        $lat2 *= $pi80;
        $lon2 *= $pi80;
    
        $r = 6372.797; // mean radius of Earth in km
        $dlat = $lat2 - $lat1;
        $dlon = $lon2 - $lon1;
        $a = sin($dlat / 2) * sin($dlat / 2) + cos($lat1) * cos($lat2) * sin($dlon / 2) * sin($dlon / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        $km = $r * $c;
    
        //echo '<br/>'.$km;
        return $km;
    }
}

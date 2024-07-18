<?php


namespace PickBazar\Database\Repositories;

use Exception;
use Illuminate\Support\Str;
use PickBazar\Http\Util\SMS;
use App\Models\ReferralEarning;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use PickBazar\Database\Models\Log;
use PickBazar\Events\OrderCreated;
use PickBazar\Database\Models\Shop;
use PickBazar\Database\Models\User;
use PickBazar\Database\Models\Order;
use PickBazar\Database\Models\Coupon;
use PickBazar\Database\Models\Balance;
use PickBazar\Database\Models\Product;
use PickBazar\Exceptions\PickbazarException;
use Prettus\Repository\Criteria\RequestCriteria;
use PickBazar\Database\Models\ReferralCommission;
use Prettus\Validator\Exceptions\ValidatorException;
use Prettus\Repository\Exceptions\RepositoryException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Ignited\LaravelOmnipay\Facades\OmnipayFacade as Omnipay;
use LoveyCom\CashFree\PaymentGateway\Order as CashFreeOrder;
use PickBazar\Helpers\InteraktHelper;
use Carbon\Carbon;


class MobileRechargeRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'mobile_number'  => 'like',
        "operator",
        "circle",
        "plan",
        "plan_description",
        "amount",
        "user_id",
        "status",
        "order_id",
        "transaction_id",
        "payment_method",
        "payment_status",
        "payment_response",
        "payment_date",
        "created_at",

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
        return MobileRecharge::class;
    }

    /**
     * @param array $data
     * @return mixed
     * @throws PickbazarException
     */
    public function create(array $data)
    {
        try {
            $data['order_id'] = Str::random(10);
            $data['status'] = 'pending';
            $data['payment_status'] = 'pending';
            $data['payment_method'] = 'cashfree';
            $data['payment_date'] = Carbon::now();
            $data['payment_response'] = '';
            $data['transaction_id'] = '';
            $data['amount'] = $data['amount'];
            $data['user_id'] = auth()->user()->id;
            $data['mobile_number'] = $data['mobile_number'];
            $data['operator'] = $data['operator'];
            $data['circle'] = $data['circle'];
            $data['plan'] = $data['plan'];
            $data['plan_description'] = $data['plan_description'];
            $data['user_id'] = auth()->user()->id;
        }
        catch (Exception $e) {
            throw new PickbazarException($e->getMessage());
        }
        return parent::create($data);
    }

    /**
     * @param array $data
     * @param $id
     * @return mixed
     * @throws PickbazarException
     */

    public function update(array $data, $id)
    {
        try {
            $data['order_id'] = Str::random(10);
            $data['status'] = 'pending';
            $data['payment_status'] = 'pending';
            $data['payment_method'] = 'cashfree';
            $data['payment_date'] = Carbon::now();
            $data['payment_response'] = '';
            $data['transaction_id'] = '';
            $data['amount'] = $data['amount'];
            $data['user_id'] = auth()->user()->id;
            $data['mobile_number'] = $data['mobile_number'];
            $data['operator'] = $data['operator'];
            $data['circle'] = $data['circle'];
            $data['plan'] = $data['plan'];
            $data['plan_description'] = $data['plan_description'];
            $data['user_id'] = auth()->user()->id;
        }
        catch (Exception $e) {
            throw new PickbazarException($e->getMessage());
        }
        return parent::update($data, $id);
    }

    /**
     * @param $id
     * @return mixed
     * @throws PickbazarException
     */

    public function delete($id)
    {
        try {
            $data['status'] = 'cancelled';
            $data['payment_status'] = 'cancelled';
            $data['payment_method'] = 'cashfree';
            $data['payment_date'] = Carbon::now();
            $data['payment_response'] = '';
            $data['transaction_id'] = '';
            $data['amount'] = $data['amount'];
            $data['user_id'] = auth()->user()->id;
            $data['mobile_number'] = $data['mobile_number'];
            $data['operator'] = $data['operator'];
            $data['circle'] = $data['circle'];
            $data['plan'] = $data['plan'];
            $data['plan_description'] = $data['plan_description'];
            $data['user_id'] = auth()->user()->id;
        }
        catch (Exception $e) {
            throw new PickbazarException($e->getMessage());
        }
        return parent::update($data, $id);
    }

    /**
     * @param $id
     * @return mixed
     * @throws PickbazarException
     */

    public function cancel($id)

    {
        try {
            $data['status'] = 'cancelled';
            $data['payment_status'] = 'cancelled';
            $data['payment_method'] = 'cashfree';
            $data['payment_date'] = Carbon::now();
            $data['payment_response'] = '';
            $data['transaction_id'] = '';
            $data['amount'] = $data['amount'];
            $data['user_id'] = auth()->user()->id;
            $data['mobile_number'] = $data['mobile_number'];
            $data['operator'] = $data['operator'];
            $data['circle'] = $data['circle'];
            $data['plan'] = $data['plan'];
            $data['plan_description'] = $data['plan_description'];
            $data['user_id'] = auth()->user()->id;
        }
        catch (Exception $e) {
            throw new PickbazarException($e->getMessage());
        }
        return parent::update($data, $id);
    }

    /**
     * @param $id
     * @return mixed
     * @throws PickbazarException
     */

    public function success($id)
    {
        try {
            $data['status'] = 'success';
            $data['payment_status'] = 'success';
            $data['payment_method'] = 'cashfree';
            $data['payment_date'] = Carbon::now();
            $data['payment_response'] = '';
            $data['transaction_id'] = '';
            $data['amount'] = $data['amount'];
            $data['user_id'] = auth()->user()->id;
            $data['mobile_number'] = $data['mobile_number'];
            $data['operator'] = $data['operator'];
            $data['circle'] = $data['circle'];
            $data['plan'] = $data['plan'];
            $data['plan_description'] = $data['plan_description'];
            $data['user_id'] = auth()->user()->id;
        }
        catch (Exception $e) {
            throw new PickbazarException($e->getMessage());
        }
        return parent::update($data, $id);
    }

    /**
     * @param $id
     * @return mixed
     * @throws PickbazarException
     */

    public function fail($id)

    {
        try {
            $data['status'] = 'failed';
            $data['payment_status'] = 'failed';
            $data['payment_method'] = 'cashfree';
            $data['payment_date'] = Carbon::now();
            $data['payment_response'] = '';
            $data['transaction_id'] = '';
            $data['amount'] = $data['amount'];
            $data['user_id'] = auth()->user()->id;
            $data['mobile_number'] = $data['mobile_number'];
            $data['operator'] = $data['operator'];
            $data['circle'] = $data['circle'];
            $data['plan'] = $data['plan'];
            $data['plan_description'] = $data['plan_description'];
            $data['user_id'] = auth()->user()->id;
        }
        catch (Exception $e) {
            throw new PickbazarException($e->getMessage());
        }
        return parent::update($data, $id);
    }

    /**
     * @param $id
     * @return mixed
     * @throws PickbazarException
     */

    public function refund($id)
    {
        try {
            $data['status'] = 'refunded';
            $data['payment_status'] = 'refunded';
            $data['payment_method'] = 'cashfree';
            $data['payment_date'] = Carbon::now();
            $data['payment_response'] = '';
            $data['transaction_id'] = '';
            $data['amount'] = $data['amount'];
            $data['user_id'] = auth()->user()->id;
            $data['mobile_number'] = $data['mobile_number'];
            $data['operator'] = $data['operator'];
            $data['circle'] = $data['circle'];
            $data['plan'] = $data['plan'];
            $data['plan_description'] = $data['plan_description'];
            $data['user_id'] = auth()->user()->id;
        }
        catch (Exception $e) {
            throw new PickbazarException($e->getMessage());
        }
        return parent::update($data, $id);
    }

    /**
     * @param $id
     * @return mixed
     * @throws PickbazarException
     */

    public function pending($id)

    {
        try {
            $data['status'] = 'pending';
            $data['payment_status'] = 'pending';
            $data['payment_method'] = 'cashfree';
            $data['payment_date'] = Carbon::now();
            $data['payment_response'] = '';
            $data['transaction_id'] = '';
            $data['amount'] = $data['amount'];
            $data['user_id'] = auth()->user()->id;
            $data['mobile_number'] = $data['mobile_number'];
            $data['operator'] = $data['operator'];
            $data['circle'] = $data['circle'];
            $data['plan'] = $data['plan'];
            $data['plan_description'] = $data['plan_description'];
            $data['user_id'] = auth()->user()->id;
        }
        catch (Exception $e) {
            throw new PickbazarException($e->getMessage());
        }
        return parent::update($data, $id);
    }

    /**
     * @param $id
     * @return mixed
     * @throws PickbazarException
     */

}

     
             
          
           
<?php


namespace PickBazar\Database\Repositories;

use PickBazar\Database\Models\SMSLog;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;

class SMSLogRepository extends BaseRepository
{
    /**
     * @var string[]
     */
    
    protected $dataArray = [
        'phone_number',
        'order_tracking_number',
        'order_id',
        'status',
        'customer_id',
        'username',
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
        return SMSLog::class;
    }
}

<?php


namespace PickBazar\Database\Repositories;



use PickBazar\Database\Models\Log;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;



class LogRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name'        => 'like',
        "ip_address",
        "search_item",
        'ip_location',
        "products"
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
        return Log::class;
    }
}

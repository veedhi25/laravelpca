<?php


namespace PickBazar\Database\Repositories;


use PickBazar\Database\Models\Tag;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;
 


class TagRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name'        => 'like',
        
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
        return Tag::class;
    }
}

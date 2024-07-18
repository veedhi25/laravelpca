<?php

namespace PickBazar\Database\Repositories;

use Exception;
use Illuminate\Database\Eloquent\Model;
use PickBazar\Database\Models\Like;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Exceptions\RepositoryException;
use Illuminate\Support\Facades\DB;

class LikesRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'user_id',
        'liked_by',
        'status',
        'user_name',
        'chat_id',
        'created_at',
        'updated_at',
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Like::class;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  array  $attributes
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Exception
     */

    public function store(array $attributes): Model
    {
        // try {
            $like = new Like();
            $like->fill($attributes);
            $like->save();
            return $like;
        // } catch (Exception $e) {
            // throw new Exception('An error occurred while saving the like.', 500);
        // }
    }
    

    public function getLikesByUserId($userId)
    {
        return DB::table('likes')
            ->where('liked_by', $userId)
            ->get();
    }

    public function getAllLikes()
    {
        return $this->model->all();
    }

}

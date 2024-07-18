<?php

namespace PickBazar\Database\Repositories;

use PickBazar\Database\Models\Quiz;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;

class QuizRepository extends BaseRepository
{
    /**
     * @var array
     */

    protected $fieldSearchable = [
        "name" => 'like',
        "email"=> 'like',
        "campaign_name" => 'like',
        "right_answers",
        "phone_number",
        'q1',    
        "q2",
        "q3",
        "q4",
        "q5",
      
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
        return Quiz::class;
    }

}

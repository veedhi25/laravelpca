<?php

namespace PickBazar\Database\Repositories;

use PickBazar\Database\Models\Contact;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;

class ContactRepository extends BaseRepository
{
    /**
     * @var array
     */

    protected $fieldSearchable = [
        'name'     => 'like',
        "email",
        "subject",
        "description",
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
        return Contact::class;
    }

}

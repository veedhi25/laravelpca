<?php

namespace PickBazar\Database\Repositories;

use PickBazar\Database\Models\TermLifeInsurance;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;


class TermLifeInsuranceRepository extends BaseRepository
{
    /**
     * @var array
    */

    protected $fieldSearchable = [
        'name'  => 'like',
        "date_of_birth",
        "is_tobacco_user",
        "annual_income",
        "education",
        "occupation",
        "pin_code",
        "mobile_number"
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
        return TermLifeInsurance::class;
    }

}

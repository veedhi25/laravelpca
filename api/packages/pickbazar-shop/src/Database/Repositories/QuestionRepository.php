<?php


namespace PickBazar\Database\Repositories;

use App\Events\QuestionAnswered;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use PickBazar\Database\Models\Question;
use PickBazar\Exceptions\PickBazarException;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;
use Prettus\Validator\Exceptions\ValidatorException;


class QuestionRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'shop_id',
        'product_id',
        'question' => 'like',
        'answer'
    ];
    /**
     * @var array[]
     */
    protected $dataArray = [
        'product_id',
        'shop_id',
        'user_id',
        'question',
        'answer'
    ];

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
            //
        }
    }


    /**
     * Configure the Model
     **/
    public function model()
    {
        return Question::class;
    }

    /**
     * @param $request
     * @return LengthAwarePaginator|JsonResponse|Collection|mixed
     */
    public function storeQuestion($request)
    {
        try {
            $request['user_id'] = $request->user()->id;
            $questionInput = $request->only($this->dataArray);
            return $this->create($questionInput);
        } catch (Exception $e) {
            throw new PickBazarException('SOMETHING_WENT_WRONG');
        }
    }

    public function updateQuestion($request, $id)
    {
        try {
            $question = $this->findOrFail($id);

            $question->update($request->only($this->dataArray));

            if(!empty($question->answer)) {
                event(new QuestionAnswered($question));
            }

            return $question;
        } catch (ValidatorException $e) {
            throw new PickBazarException('SOMETHING_WENT_WRONG');
        }
    }
}

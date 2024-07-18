<?php


namespace PickBazar\Http\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\Review;
use PickBazar\Database\Models\Settings;
use PickBazar\Database\Repositories\QuestionRepository;
use PickBazar\Database\Repositories\ReviewRepository;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Http\Requests\FeedbackCreateRequest;
use PickBazar\Http\Requests\QuestionCreateRequest;
use PickBazar\Http\Requests\QuestionUpdateRequest;
use PickBazar\Http\Requests\ReviewCreateRequest;
use PickBazar\Http\Requests\ReviewUpdateRequest;
use Prettus\Validator\Exceptions\ValidatorException;


class QuestionController extends CoreController
{
    public $repository;

    public function __construct(QuestionRepository $repository)
    {
        $this->repository = $repository;
    }


    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Review[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ? $request->limit : 15;
        if (isset($request['product_id']) && !empty($request['product_id'])) {
            if (null !== $request->user()) {
                $request->user()->id;
            }
            return $this->repository->where('product_id', $request['product_id'])->where('answer', '!=', null)->paginate($limit);
        }
        if (isset($request['answer']) && $request['answer'] === 'null') {
            return $this->repository->paginate($limit);
        }
        return $this->repository->where('answer', '!=', null)->paginate($limit);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param QuestionCreateRequest $request
     * @return mixed
     * @throws ValidatorException
     */
    public function store(QuestionCreateRequest $request)
    {

        try {
            $settings = Settings::first();
            $maximumQuestionLimit = $settings['options']['maximumQuestionLimit'];
        } catch (\Throwable $th) {
            $maximumQuestionLimit = 5;
        }
        // rate limit
        if($this->repository->where('product_id', $request['product_id'])->where('user_id', $request->user()->id)->where('shop_id', $request['shop_id'])->count() <= $maximumQuestionLimit) {
            return $this->repository->storeQuestion($request);
        }
        throw new PickbazarException('MAXIMUM_QUESTION_LIMIT_EXCEEDED');
    }

    public function show($id)
    {
        try {
            return $this->repository->findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('NOT_FOUND');
        }
    }

    public function update(QuestionUpdateRequest $request, $id)
    {

        $request->id = $id;
        return $this->updateQuestion($request, $id);
    }

    public function updateQuestion(Request $request)
    {
        // if ($this->repository->hasPermission($request->user(), $request->shop_id)) {
            $id = $request->id;
            return $this->repository->updateQuestion($request, $id);
        // } else {
        //     throw new PickbazarException('NOT_AUTHORIZED');
        // }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            return $this->repository->findOrFail($id)->delete();
        } catch (\Exception $e) {
            throw new PickbazarException('NOT_FOUND');
        }
    }

    /**
     * Display a listing of the resource for authenticated user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function myQuestions(Request $request) {
        
        $limit = $request->limit ? $request->limit : 15;

        return $this->repository->where('user_id', auth()->user()->id)->with('product')->paginate($limit);

        // return $this->repository->where('user_id', auth()->user()->id)->with('product')->paginate($limit);
    }
}

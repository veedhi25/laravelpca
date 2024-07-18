<?php

namespace PickBazar\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use PickBazar\Enums\Permission;
use PickBazar\Database\Models\Contact;
use PickBazar\Enums\WithdrawStatus;
use Illuminate\Support\Facades\Schema;
use PickBazar\Database\Models\Balance;
use Illuminate\Database\Schema\Blueprint;
use PickBazar\Exceptions\PickbazarException;
use Illuminate\Database\Migrations\Migration;
use PickBazar\Database\Repositories\ContactRepository;


class ContactController extends CoreController

{
    public $repository;

    public function __construct(ContactRepository $repository)
    {
        $this->repository = $repository;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * 
     */

    public function index(Request $request)
    {
        $limit = $request->limit ?  $request->limit : 25;
        $contact = $this->repository;
        return $contact->paginate($limit);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return mixed
     * @throws ValidatorException
     */

    public function store(Request $request)
    {
        return $this->repository->create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */


    public function show(Request $request, $id)
    {
        $request->id = $id;
        return $this->fetchSingleContact($request);
    }


    public function fetchSingleContact(Request $request)
    {
        $id = $request->id;
        try {
            $contact = $this->repository->findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
        return $contact;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */

    public function update(Request $request, $id)
    {
        throw new PickbazarException('PICKBAZAR_ERROR.ACTION_NOT_VALID');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */

    public function destroy(Request $request, $id)
    {
        if ($request->user() && $request->user()->hasPermissionTo(Permission::SUPER_ADMIN)) {
            try {
                return $this->repository->findOrFail($id)->delete();
            } catch (\Exception $e) {
                throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
            }
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

}

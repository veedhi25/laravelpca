<?php


namespace PickBazar\Http\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use PickBazar\Database\Models\Attachment;
use PickBazar\Database\Repositories\AttachmentRepository;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Http\Requests\AttachmentRequest;
use Prettus\Validator\Exceptions\ValidatorException;


class AttachmentController extends CoreController
{
    public $repository;

    public function __construct(AttachmentRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Attachment[]
     */
    public function index(Request $request)
    {
        return $this->repository->paginate();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param AttachmentRequest $request
     * @return mixed
     * @throws ValidatorException
     */
    public function store(AttachmentRequest $request)
    {
        $urls = [];
        foreach ($request->attachment as $media) {
            $attachment = new Attachment;
            $attachment->save();
            
            $path = $this->storeImage($media); // This should return something like /images/64e4932457ddd.jpeg
    
            // Update the Attachment record with the path
            $attachment->url = $path;
            $attachment->save();
    
            $converted_url = [
                'thumbnail' => url($path),
                'original' => url($path),
                'id' => $attachment->id
            ];
    
            $urls[] = $converted_url;
        }
        return $urls;
    }
    
    


    protected function storeImage($image){
        $image_name = uniqid().'.'.$image->getClientOriginalExtension();
        $destinationPath=public_path(). '/images/';
        $image->move($destinationPath, $image_name);
        $path='/images/'.$image_name;

        return $path;
    }

    public function storeUserImageAttachment(Request $request)
    {
        try {
            $urls = [];
            foreach ($request->attachment as $media) {
                $attachment = new Attachment;
                $attachment->save();
                $path = $this->storeUserImage($media);
    
                $converted_url = [
                    'thumbnail' => url('/') . $path,
                    'original' => url('/') . $path,
                    'id' => $attachment->id
                ];
                $urls[] = $converted_url;
            }
            return $urls;
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
    


    protected function storeUserImage($image)
    {
        try {
            $image_name = uniqid() . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path() . '/images/';
            $image->move($destinationPath, $image_name);
            $path = '/images/' . $image_name;
    
            return $path;
        } catch (\Exception $e) {
            throw new \Exception("An error occurred while storing the user image.");
        }
    }
    

    public function storeBillAttachment(AttachmentRequest $request){
        $urls = [];
        foreach ($request->attachment as $media) {
            $attachment = new Attachment;
            $attachment->save();
            $path=$this->storeBill($media);

                $converted_url = [
                    'thumbnail' => url('/').$path,
                    'original' => url('/').$path,
                    'id' => $attachment->id
                ];
            $urls[] = $converted_url;
        }
        return $urls;
    }



    protected function storeBill($bill){
        $bill_name = uniqid().'.'.$bill->getClientOriginalExtension();
        $destinationPath=public_path(). '/bills/';
        $bill->move($destinationPath, $bill_name);
        $path='/bills/'.$bill_name;

        return $path;
    }


    public function storeLicenseAttachment(AttachmentRequest $request)
    {

        $urls = [];
        foreach ($request->attachment as $media) {
            $attachment = new Attachment;
            $attachment->save();
            $path=$this->storeAttachment($media);

                $converted_url = [
                    'thumbnail' => url('/').$path,
                    'original' => url('/').$path,
                    'id' => $attachment->id
                ];
            $urls[] = $converted_url;
        }
        return $urls;
    }

    protected function storeAttachment($attachment){
        $attachment_name = uniqid().'.'.$attachment->getClientOriginalExtension();
        $destinationPath=public_path(). '/licenses/';
        $attachment->move($destinationPath, $attachment_name);
        $path='/licenses/'.$attachment_name;

        return $path;
    }
    
    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show($id)
    {
        try {
            $this->repository->findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param AttachmentRequest $request
     * @param int $id
     * @return bool
     */
    public function update(AttachmentRequest $request, $id)
    {
        return false;
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
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }


}

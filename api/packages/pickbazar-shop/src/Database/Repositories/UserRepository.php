<?php

namespace PickBazar\Database\Repositories;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use PickBazar\Database\Models\User;
use Prettus\Validator\Exceptions\ValidatorException;
use Spatie\Permission\Models\Permission;
use PickBazar\Enums\Permission as UserPermission;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;
use PickBazar\Mail\ForgetPassword;
use Illuminate\Support\Facades\Mail;
use PickBazar\Database\Models\Address;
use PickBazar\Database\Models\Profile;
use PickBazar\Database\Models\Shop;
use PickBazar\Exceptions\PickbazarException;


class UserRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name' => 'like',
        'email' => 'like',
        'phone_number'=> 'like',
        
        'occupation' => 'like',
        'created_at' => 'like',
    ];

    /**
     * @var array
     */
    protected $dataArray = [
        'name',
        'guardian_name',
        'email',
        'phone_number',
        'date_of_birth',
        'gender',
        'current_location',
        'student_class_id',
        'stream_id',
        'parents_email',
        'batch_id',
        'permanent_address',
        'guardian_relation_id',
        'parent_phone_number',
        // Add any other fields you need to update
    ];
    

    /**
     * Configure the Model
     **/
    public function model()
    {
        return User::class;
    }

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    public function storeUser($request)
    {
        
        try {
            $user = $this->create([
                'name'     => $request->name,
                'email'    => $request->email,
                'phone_number'=> $request->phone_number,
                'password' => Hash::make($request->password),
                'student_class_id' => $request->class_id,
                'stream_id' => $request->stream_id,
                'batch_id' => $request->batch_id,
                'profile_img_id'=> $request->image_id,
                'guardian_relation_id' => $request->guardian_relation_id,
                'parents_email' => $request->parents_email,
                'parent_phone_number' => $request->parents_phone_number,
                'current_location' => $request->current_location,
                'gender'=> $request->gender,
                'date_of_birth' => $request->date_of_birth,
                'is_active'=>1,
                'role'=> $request->permissions[0]->name,
            ]);

            $user->givePermissionTo(UserPermission::CUSTOMER);
           
            if (isset($request['profile'])) {
                $user->profile()->create($request['profile']);
            }
            $user->profile = $user->profile;
        
            return $user;
        } catch (ValidatorException $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }
    
    public function updateUser($request, $user)
    {
        try {
            // Log the incoming request data
            Log::info('Update User Request:', ['request' => $request->all()]);
    
            // Prepare the data for updating the user
            $updateData = $request->only($this->dataArray);
            $updateData['current_location'] = $request->current_location ? json_encode($request->current_location) : null;
    
            // Log the data that will be used for updating
            Log::info('Data for User Update:', ['updateData' => $updateData]);
    
            // Update the user with the prepared data
            $user->update($updateData);
    
            // Reload the user from the database to ensure it reflects the latest state
            $user->refresh();
    
            // Log the updated user data
            Log::info('Updated User:', ['user' => $user]);
    
            return $user;
        } catch (ValidationException $e) {
            // Log validation exception details
            Log::error('Validation Exception in updateUser:', ['error' => $e->getMessage()]);
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        } catch (\Exception $e) {
            // Log any other types of exceptions
            Log::error('Exception in updateUser:', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            throw new PickbazarException('PICKBAZAR_ERROR.UNEXPECTED_ERROR');
        }
    }
    
    
    

    public function sendResetEmail($email, $token)
    {
        try {
            Mail::to($email)->send(new ForgetPassword($token));
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}

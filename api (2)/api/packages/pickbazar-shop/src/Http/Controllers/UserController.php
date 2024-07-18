<?php

namespace PickBazar\Http\Controllers;

use Exception;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use PickBazar\Http\Util\SMS;
use Illuminate\Http\Response;
use PickBazar\Enums\Permission;
use PickBazar\Mail\ContactAdmin;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use PickBazar\Database\Models\Invite;
use App\Http\Resources\UserCollection;
use PickBazar\Database\Models\Balance;
use Laravel\Socialite\Facades\Socialite;
use PickBazar\Exceptions\PickbazarException;
use Illuminate\Validation\ValidationException;
use PickBazar\Database\Models\License;
use PickBazar\Http\Requests\UserCreateRequest;
use PickBazar\Http\Requests\OtpUserCreateRequest;
use PickBazar\Http\Requests\UserUpdateRequest;
use PickBazar\Http\Requests\ChangePasswordRequest;
use PickBazar\Database\Repositories\UserRepository;
use PickBazar\Database\Models\Permission as ModelsPermission;
use PickBazar\Database\Models\SignupOffer;
use PickBazar\Helpers\InteraktHelper;



class UserController extends CoreController
{
    public $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */ 
    public function index(Request $request)
    {
        $limit = $request->limit ? $request->limit : 15;
        $users = $this->repository->with([
            'batch',
            'courses',
            'classStream',
            'guardianRelation',
            'profileImage', // Assuming this is the name of the relationship for the profile image.
            'examAttempts' => function ($query) {
                $query->take(5);
            },
            'examAttempts.answers', 
            'examAttempts.answers.question', 
            'examAttempts.answers.selectedOption',
        ])->paginate($limit);
    
        // Transform the users collection to include related names and profile image URL
        $users->transform(function ($user) {
            if ($user->batch) {
                $user->batch_name = $user->batch->name;
            }
            if ($user->classStream) {
                $user->class_stream_name = $user->classStream->name;
            }
            if (!$user->relationLoaded('profileImage') && $user->profile_img_id) {
                $user->load('profileImage');
            }
        
            // Add the profile image URL
            if ($user->profileImage) {
                $user->profile_image_url = $user->profileImage->url;
            }
        
            // Explicitly load the guardianRelation relationship if not already loaded
            if (!$user->relationLoaded('guardianRelation') && $user->guardian_relation_id) {
                $user->load('guardianRelation');
            }
        
            // Add the guardian relation name
            if ($user->guardianRelation) {
                $user->guardian_relation_name = $user->guardianRelation->name;
            }
            return $user;
        });
    
        \Log::info('Fetched users:', $users->toArray());
    
        return $users;
    }
    


    public function studentsList(Request $request)
    {
        $limit = $request->limit ? $request->limit : 15;
        // Load the required relationships
        $users = $this->repository->with([
            'courses',
            'batch',
            'studentClass',
            'classStream',
            'guardianRelation', // Relationship for guardian relation
            'profileImage',     // Relationship for profile image
        ])->paginate($limit);
    
        // Transform the collection to include the necessary attributes
        $users->transform(function ($user) {
            // Add the student class name
            if ($user->studentClass) {
                $user->student_class_name = $user->studentClass->name;
            }
            // Add the class stream name
            if ($user->classStream) {
                $user->class_stream_name = $user->classStream->name;
            }
            // Add the batch name
            if ($user->batch) {
                $user->batch_name = $user->batch->name;
            }
            // Add the guardian relation name
            if ($user->guardianRelation) {
                $user->guardian_relation_name = $user->guardianRelation->name;
            }
            // Add the profile image URL
            if ($user->profileImage) {
                $user->profile_image_url = $user->profileImage->url;
            }
            return $user;
        });
    
        \Log::info('Fetched users:', $users->toArray());
    
        return $users;
    }
    


   

    /**
     * Store a newly created resource in storage.
     *Í
     * @param UserCreateRequest $request
     * @return bool[]
     */
    public function store(UserCreateRequest $request)
    {
        return $this->repository->storeUser($request);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return array
     */
    public function show($id)
    {
        try {
            $user = $this->repository->with([
                'batch',
                'courses',
                'studentClass',
                'classStream',
                'guardianRelation',
                'profileImage',
                // 'examAttempts' => function ($query) {
                //     $query->take(5);
                // },
                // 'examAttempts.answers',
                // 'examAttempts.answers.question',
                // 'examAttempts.answers.selectedOption',
            ])->findOrFail($id);
    
            // Log::info('Fetched user: ' . json_encode($user));
            return $user;
        } catch (Exception $e) {
            // Log::error("Error fetching user with ID ${id}: " . $e->getMessage());
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param UserUpdateRequest $request
     * @param int $id
     * @return array
     */

     public function getExamStudents(Request $request)
     {
         // Validate the request to ensure that exam_id is provided
         $request->validate([
             'exam_id' => 'required|integer',
         ]);
 
         $examId = $request->input('exam_id');
 
         // Query the users based on the exam_id
         $users = User::whereHas('examAttempts', function ($query) use ($examId) {
             $query->where('exam_id', $examId);
         })->get();
 
         // Return the list of users as a JSON response
         return response()->json($users);
     }

     public function update(UserUpdateRequest $request, $id)
     {
         if ($request->user()) {
             $user = $this->repository->findOrFail($id);
             return $this->repository->updateUser($request, $user);
         } elseif ($request->user()->id == $id) {
             $user = $request->user();
             return $this->repository->updateUser($request, $user);
         } else {
             // Handle unauthorized access
             return response()->json(['error' => 'Unauthorized'], 403);
         }
     }
     

    public function updateOnlineStatus(Request $request, $user)
    {
        $isOnline = $request->input('is_online');

        // Validate the input data, e.g., check if is_online is a boolean
        $validatedData = $request->validate([
            'is_online' => 'required|boolean',
        ]);

        // Update the user's online status
        $updatedUser = User::where('id', $user)->update(['is_online' => $isOnline]);

        // Return a response indicating success or failure
        if ($updatedUser) {
            return response()->json(['message' => 'User online status updated successfully.'], 200);
        } else {
            return response()->json(['message' => 'Failed to update user online status.'], 400);
        }
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return array
     */
    public function destroy($id)
    {
        try {
            return $this->repository->findOrFail($id)->delete();
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    public function me(Request $request)
    {
        $user = $request->user();
        
        if (isset($user)) {
            return $this->repository->with([
                'examAttempts' => function ($query) {
                    $query->take(5); // limit to 5 examAttempts
                }, 
                // 'examAttempts.exam', 
                // 'examAttempts.exam.exam_questions', 
                // 'examAttempts.exam.exam_questions.exam_association', 
                'examAttempts.answers', 
                'examAttempts.answers.question', 
                'examAttempts.answers.selectedOption',
                // 'student_class.name'
            ])->find($user->id);
        }
        throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
    }
    

    public function token(Request $request)
    {
         $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->where('is_active', true)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return ["token" => null, "permissions" => []];
        }
        return ["token" => $user->createToken('auth_token')->plainTextToken, "permissions" => $user->getPermissionNames()];
    }

    public function updatePassword(Request $request)
 {
    // Validate the request data
    $request->validate([
        'old_password'      => 'required',
        'new_password'      => 'required|string|',
        'new_password_confirmation' => 'required',
    ]);

    // Get the currently authenticated user
    $user = auth()->user();

    // Check if the old password matches
    if (!Hash::check($request->old_password, $user->password)) {
        return response()->json(['message' => 'The old password does not match.'], 400);
    }

    // Update the password
    $user->password = Hash::make($request->new_password);
    $user->save();

    // Return a success response
    return response()->json(['message' => 'Password updated successfully.']);
 }


    

    public function logout(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return true;
        }
        return $request->user()->currentAccessToken()->delete();
    }

    public function register(UserCreateRequest $request)
    {
        DB::beginTransaction();

        try {
        $notAllowedPermissions = [Permission::SUPER_ADMIN];
        if ((isset($request->permission->value) && in_array($request->permission->value, $notAllowedPermissions)) || (isset($request->permission) && in_array($request->permission, $notAllowedPermissions))) {
            throw new PickbazarException('NOT_AUTHORIZED');
        }
        $permissions = [Permission::CUSTOMER];
        if (isset($request->permission)) {
            $permissions[] = isset($request->permission->value) ? $request->permission->value : $request->permission;
        }
        // $country_code = '+91';
        // $phone_number = $country_code.$request->phone_number;
        // $code=SMS::sendOTP($phone_number);
        //user permissions
        $user = $this->repository->create([
          
                'name'   => $request->name,
                'email'  => $request->email,
                'phone_number'=> $request->phone_number,
                'password' => Hash::make($request->password),
                'student_class_id' => $request->student_class_id,
                'stream_id' => $request->stream_id,
                'batch_id' => $request->batch_id,
                'profile_img_id'=> $request->profile_img_id,
                'guardian_relation_id' => $request->guardian_relation_id,
                'parents_email' => $request->parents_email,
                'parent_phone_number' => $request->parent_phone_number,
                'current_location' => $request->current_location,
                'gender'=> $request->gender,
                'date_of_birth' => $request->date_of_birth,
                'is_active'=>1,
           
        ]);

        $user->givePermissionTo($permissions);

        if ($request->has('courses_id')) {
            $courseId = $request->input('courses_id');
            // Attach the course to the user
            $user->courses()->attach($courseId, [
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        // If everything is successful, commit the transaction
        DB::commit();

        return [
            "token" => $user->createToken('auth_token')->plainTextToken,
            "permissions" => $user->getPermissionNames()
        ];
    } catch (\Exception $e) {
        // If there is any error, rollback the transaction and handle the exception
        DB::rollback();
        // You can log the error if needed
        Log::error($e->getMessage());
        // Then throw the exception to be handled by your global exception handler
        throw $e;
    }
}



    public function otpRegister(OtpUserCreateRequest $request)
    {
       

        $notAllowedPermissions = [Permission::SUPER_ADMIN];
        if ((isset($request->permission->value) && in_array($request->permission->value, $notAllowedPermissions)) || (isset($request->permission) && in_array($request->permission, $notAllowedPermissions))) {
            throw new PickbazarException('NOT_AUTHORIZED');
        }
        $permissions = [Permission::CUSTOMER];
        if (isset($request->permission)) {
            $permissions[] = isset($request->permission->value) ? $request->permission->value : $request->permission;
        }

        $country_code = '+91';
        $phone_number = $country_code.$request->phone_number;
        $code=SMS::sendOTP($phone_number);

        //user permissions
    

        $user = $this->repository->create([
            'name'     => $request->name ,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            // 'invited_by'=>$request->invited_by,
            'phone_number'=>$request->phone_number,
            // 'gender'=> $request->gender,
            // 'date_of_birth'=> $request->date_of_birth,
            // 'occupation'=> $request->occupation,
             'role'=> 'user',
             'current_location' => $request->current_location ? json_encode($request->current_location) : null,
            'is_active'=>0,
            'code'=>$code
        ]);
    
        
        // if($request->invited_by){
        //     Invite::create([
        //         "user_id"=>$request->invited_by,
        //         "invitee_id"=>$user->id,
        //         "invitee_name"=>'none'
        //     ]);

        //     $invited_by=User::find($request->invited_by);
        //     SMS::userInvite($invited_by->phone_number,$invited_by->name,$user->name);
            

        //     $signup_offer=SignupOffer::find(1);
        //     $Inviter_balance = Balance::firstOrNew(['user_id' => $request->invited_by]);
        //     $Inviter_balance->total_earnings= $Inviter_balance->total_earnings + $signup_offer->inviter_reward;
        //     $Inviter_balance->current_balance=$Inviter_balance->current_balance + $signup_offer->inviter_reward;
        //     $Inviter_balance->save();

        //     $Invitee_balance = Balance::firstOrNew(['user_id' => $user->id]);
        //     $Invitee_balance->total_earnings= $Invitee_balance->total_earnings + $signup_offer->invitee_reward;
        //     $Invitee_balance->current_balance=$Invitee_balance->current_balance + $signup_offer->invitee_reward;
        //     $Invitee_balance->save();

        // }

        $user->givePermissionTo($permissions);

        #--------------creating whatapp user-----------------#
        $CURLOPT_POSTFIELDS   = array(
                                        "userId"=> $user->id,
                                        "phoneNumber"=> $user->phone_number,
                                        "countryCode"=> $country_code,
                                        "traits"=> [
                                            "name"=>  $user->name ,
                                            "email"=> $user->email ,
                                            "user_role"=> $user->permissions[0]->name,
                                        ],
                                        "createdAt"=> date('Y-m-d H:i:s')
                                    );
    
        $endpoint = 'track/users/';

        $response = InteraktHelper::interaktApi(json_encode($CURLOPT_POSTFIELDS),$endpoint);
        #--------------creating whatapp user-----------------#
        
        #---------------------creating Register Event-----------------#
        $payload = array(
            "userId"=> $user->id,
            "phoneNumber"=> $user->phone_number,
            'gender'=> $user->gender,
            'date_of_birth'=> $user->date_of_birth,
            'occupation' => $user->occupation,
            "countryCode"=> "+91",
            "event"=> "User Registered",
            "traits"=> [
                "name"=> $user->name . '@gmail.com',
                "email"=> 'guest' . $user->id . '@gmail.com',
                "user_role" => $user->permissions[0]->name,
            ],
            "createdAt"=> date('Y-m-d H:i:s')
        );
        
        $endpoint_event = 'track/events/';

        $response_event   = InteraktHelper::interaktApi(json_encode($payload),$endpoint_event);
        #---------------------creating Register Event-----------------#

        return ["user"=>$user, 'interakt_response' => $response, 'interakt_event_response' => $response_event];

        return ["token" => $user->createToken('auth_token')->plainTextToken,"permissions" => $user->getPermissionNames(), 'interakt_response' => $response];
    }

    

    public function userVerify(Request $request)
    {
        
         $user=User::findOrFail($request->id);

        if($request->code==$user->code){
            SMS::welcome($user->phone_number,$user->name);
            $user->update([
                "is_active"=>1
            ]);

            if($request->inviter_id){
            Invite::create([
                "user_id"=>$request->inviter_id,
                "invitee_id"=>$user->id,
                "invitee_name"=>$user->name,
                // 'is_active'=> $user->is_active,
            ]);

            $inviter_id=User::find($request->inviter_id);
            SMS::userInvite($inviter_id->phone_number,$inviter_id->name,$user->name);
            

            $signup_offer=SignupOffer::find(1);
            $Inviter_balance = Balance::firstOrNew(['user_id' => $request->inviter_id]);
            $Inviter_balance->total_earnings= $Inviter_balance->total_earnings + $signup_offer->inviter_reward;
            $Inviter_balance->current_balance=$Inviter_balance->current_balance + $signup_offer->inviter_reward;
            $Inviter_balance->save();

            $Invitee_balance = Balance::firstOrNew(['user_id' => $user->id]);
            $Invitee_balance->total_earnings= $Invitee_balance->total_earnings + $signup_offer->invitee_reward;
            $Invitee_balance->current_balance=$Invitee_balance->current_balance + $signup_offer->invitee_reward;
            $Invitee_balance->save();

        }

            $user->givePermissionTo(Permission::CUSTOMER);
            
            return ["token" => $user->createToken('auth_token')->plainTextToken,"permissions" => $user->getPermissionNames()];
        }

        return ["message"=>"incorrect"];
    }

    

    public function resendCode($id)
    {
        $user=User::findOrFail($id);
        $code=SMS::sendOTP($user->phone_number);
        $user->update([
            "code"=>$code
        ]);
        return["message"=>"code resent"];
        
    }

    public function banUser(Request $request)
    {
        $user = $request->user();
        if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN) && $user->id != $request->id) {
            $banUser =  User::find($request->id);
            $banUser->is_active = false;
            $banUser->save();
            return $banUser;
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function activeUser(Request $request)
    {
        $user = $request->user();
        if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN) && $user->id != $request->id) {
            $activeUser =  User::find($request->id);
            $activeUser->is_active = true;
            $activeUser->save();
            return $activeUser;
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function otpToken(Request $request)
    {
        $request->validate([
            'phone_number'    => 'required',
        ]);

        $user = User::where('phone_number', $request->phone_number)->where('is_active', true)->first();

        
        
        $code=SMS::sendOTP($user->phone_number); 
        $user->update([
            "code"=>$code
        ]);
        if (!$user) {
            return ['message' => 'PICKBAZAR_MESSAGE.NOT_FOUND', 'success' => false];
        }
        
        $p=$user->phone_number;
        $stars=$this->getStars(strlen($p)-3-2);
        $phone_number=substr($p,0,3,).$stars.substr($p,strlen($p)-2,2);
        return [
            'message' => 'PICKBAZAR_MESSAGE.CHECK_INBOX_FOR_PASSWORD_RESET_EMAIL', 
            'success' => true,
            'phone_number'=>$phone_number
        ];
    }

    // verifyOtpToken
    public function verifyOtpToken(Request $request)
    {
        $user = User::where('phone_number', $request->phone_number)->where('code',$request->token)->first();

        if (!$user ) {
            return ["token" => null, "permissions" => []];
        }

        if ($user) {
            return ["token" => $user->createToken('auth_token')->plainTextToken, "permissions" =>$user->getPermissionNames()];
        } else {
            return ["token" => null, "permissions" => []];
        }
    }

    public function forgetPassword(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        
        if (!$user) {
            return ['message' => 'Invalid email id', 'success' => false];
        }
        
        // $tokenData = DB::table('password_resets')
        //     ->where('email', $request->email)->first();
        // if (!$tokenData) {
        //     // DB::table('password_resets')->insert([
        //     //     'email' => $request->email,
        //     //     'token' => Str::random(16),
        //     //     'created_at' => Carbon::now()
        //     // ]);
            
        //     $tokenData = DB::table('password_resets')
        //         ->where('email', $request->email)->first();
        // }
        
        $code=SMS::sendOTP($user->phone_number);
        $user->update([
            "code"=>$code
        ]);

        $p=$user->phone_number;
        $stars=$this->getStars(strlen($p)-3-2);
        $phone_number=substr($p,0,3,).$stars.substr($p,strlen($p)-2,2);
        return [
            'message' => 'PICKBAZAR_MESSAGE.CHECK_INBOX_FOR_PASSWORD_RESET_EMAIL', 
            'success' => true,
            'phone_number'=>$phone_number
        ];

        // if ($this->repository->sendResetEmail($request->email, $tokenData->token)) {
        //     return ['message' => 'PICKBAZAR_MESSAGE.CHECK_INBOX_FOR_PASSWORD_RESET_EMAIL', 'success' => true];
        // } else {
        //     return ['message' => 'PICKBAZAR_MESSAGE.SOMETHING_WENT_WRONG', 'success' => false];
        // }
    }

    private function getStars($size){
        $stars="";
        for($i=0;$i<$size;$i++){
            $stars=$stars."*";
        }

        return $stars;
    }
    
    public function verifyForgetPasswordToken(Request $request)
    {

        // $tokenData = DB::table('password_resets')->where('token', $request->token)->first();
        $user = User::where('email', $request->email)->where('code',$request->token)->first();
        // $user = $this->repository->findByField('email', $request->email);
        if (!$user) {
            return ['message' => 'PICKBAZAR_MESSAGE.INVALID_TOKEN', 'success' => false];
        }
        // if (!$user) {
        //     return ['message' => 'PICKBAZAR_MESSAGE.NOT_FOUND', 'success' => false];
        // }
        return ['message' => 'PICKBAZAR_MESSAGE.TOKEN_IS_VALID', 'success' => true];
    }
    public function resetPassword(Request $request)
    {
        try {
            $request->validate([
                'password' => 'required|string',
                'email' => 'email|required',
                'token' => 'required|string'
            ]);

            $user = $this->repository->where('email', $request->email)->first();
            $user->password = Hash::make($request->password);
            $user->save();

            DB::table('password_resets')->where('email', $user->email)->delete();

            return ['message' => 'PICKBAZAR_MESSAGE.PASSWORD_RESET_SUCCESSFUL', 'success' => true];
        } catch (\Exception $th) {
            return ['message' => 'PICKBAZAR_MESSAGE.SOMETHING_WENT_WRONG', 'success' => false];
        }
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        try {
            $user = $request->user();
            if (Hash::check($request->oldPassword, $user->password)) {
                $user->password = Hash::make($request->newPassword);
                $user->save();
                return ['message' => 'PICKBAZAR_MESSAGE.PASSWORD_RESET_SUCCESSFUL', 'success' => true];
            } else {
                return ['message' => 'PICKBAZAR_MESSAGE.OLD_PASSWORD_INCORRECT', 'success' => false];
            }
        } catch (\Exception $th) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }
    public function contactAdmin(Request $request)
       {
        try {
            $details = $request->only('subject', 'name', 'email', 'description');
            Mail::to(config('shop.admin_email'))->send(new ContactAdmin($details));
            return ['message' => 'PICKBAZAR_MESSAGE.EMAIL_SENT_SUCCESSFUL', 'success' => true];
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }

    public function fetchStaff(Request $request)
    {
        if (!isset($request->shop_id)) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
        if ($this->repository->hasPermission($request->user(), $request->shop_id)) {
            return $this->repository->with(['profile'])->where('shop_id', '=', $request->shop_id);
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function staffs(Request $request)
    {
        $query = $this->fetchStaff($request);
        $limit = $request->limit ?? 15;
        return $query->paginate($limit);
    }

    public function socialLogin(Request $request)
    {
        $provider = $request->provider;
        $token = $request->access_token;
        $validated = $this->validateProvider($provider);
        if (!is_null($validated)) {
            return $validated;
        }
        try {
            $user = Socialite::driver($provider)->userFromToken($token);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.INVALID_CREDENTIALS');
        }
        $userCreated = User::firstOrCreate(
            [
                'email' => $user->getEmail()
            ],
            [
                'email_verified_at' => now(),
                'name' => $user->getName(),
            ]
        );
        $userCreated->providers()->updateOrCreate(
            [
                'provider' => $provider,
                'provider_user_id' => $user->getId(),
            ]
        );

        $avatar = [
            'thumbnail' => $user->getAvatar(),
            'original' => $user->getAvatar(),
        ];

        $userCreated->profile()->updateOrCreate(
            [
                'avatar' => $avatar
            ]
        );

        if (!$userCreated->hasPermissionTo(Permission::CUSTOMER)) {
            $userCreated->givePermissionTo(Permission::CUSTOMER);
        }

        return ["token" => $userCreated->createToken('auth_token')->plainTextToken, "permissions" => $userCreated->getPermissionNames()];
    }

    protected function validateProvider($provider)
    {
        if (!in_array($provider, ['facebook', 'google'])) {
            throw new PickbazarException('PICKBAZAR_ERROR.PLEASE_LOGIN_USING_FACEBOOK_OR_GOOGLE');
        }
    }

    public function licenseStore(Request $request){
        $data=$request->all();
        $data['gst_certificate']=$this->storeAttachment($request->gst_certificate);
        $data['fssai_certificate']=$this->storeAttachment($request->fssai_certificate);
        $data['cancelled_cheque']=$this->storeAttachment($request->cancelled_cheque);
        if($request->user_id){
            License::create($data);

            $user=User::find($request->user_id);

            return ["user"=>$user];
        }

        return 1;
    }

    protected function storeAttachment($attachment){
        $attachment_name = uniqid().'.'.$attachment->getClientOriginalExtension();
        $destinationPath=public_path(). '/licenses/';
        $attachment->move($destinationPath, $attachment_name);
        $path='/licenses/'.$attachment_name;

        return $path;
    }
}

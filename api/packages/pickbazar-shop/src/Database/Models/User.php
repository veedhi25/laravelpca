<?php

namespace PickBazar\Database\Models;

use App\Enums\RoleType;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Builder;
use PickBazar\Enums\Permission;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    use Notifiable;
    use HasRoles;
    use HasApiTokens;


    protected $guard_name = 'api';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
   // User model
        protected $fillable = [
            'name', 'email', "phone_number", 'current_location', 'gender', 
            'date_of_birth', 'password', 'is_active', 'code', 'is_online', 'permanent_address',
            'batch_id', 'student_class_id', 'stream_id', 'profile_img_id', 'guardian_name',
            'parent_phone_number', 'parents_email', 'guardian_relation_id'
        ];

        protected $casts = [
            'email_verified_at' => 'datetime',
            'is_online' => 'boolean',
        ];


    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected static function boot()
    {
        parent::boot();
        // Order by updated_at desc
        static::addGlobalScope('order', function (Builder $builder) {
            $builder->orderBy('updated_at', 'desc');
        });
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_user', 'user_id', 'course_id');
    }

    public function examAttempts()
    {
        return $this->hasMany(ExamAttempt::class, 'user_id');
    }

    public function attemptedAnswers()
    {
        return $this->hasMany(ExamAttemptAnswer::class, 'exam_attempt_id');
    }

    public function question()
    {
        return $this->belongsTo(ExamQuestion::class, 'question_id');
    }


    public function selectedOption()
    {
        return $this->belongsTo(QuestionOption::class, 'option_id');
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class, 'exam_id');
    }

    public function coursesAsStudent()
    {
        return $this->belongsToMany(Course::class, 'course_user')
            ->withPivot('role_id')
            ->wherePivot('role_id', Role::STUDENT);
    }

    public function coursesAsTeacher()
    {
        return $this->belongsToMany(Course::class, 'course_user')
            ->withPivot('role_id')
            ->wherePivot('role_id', Role::TEACHER);
    }


    public function studentClass()
    {
        return $this->belongsTo(StudentClass::class, 'student_class_id');
    }

    

    public function classStream()
    {
        return $this->belongsTo(ClassStream::class, 'stream_id');
    }

    public function guardianRelation()
    {
        return $this->belongsTo(GuardianRelation::class, 'guardian_relation_id');
    }

    public function profileImage()
    {
        return $this->belongsTo(Attachment::class, 'profile_img_id');
    }


    public function batch()
    {
        return $this->belongsTo(Batch::class, 'batch_id');
    }


    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'customer_id')->with(['products.variation_options', 'status']);
    }

    public function providers(): HasMany
    {
        return $this->hasMany(Provider::class, 'user_id', 'id');
    }

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class, 'user_id');
    }


    public function role(){
        
        if($this->hasPermissionTo(Permission::SUPER_ADMIN)){
            $role="Super Admin";
        // }else if($this->hasPermissionTo(Permission::CUSTOMER)){
        //     $role="Customer";
        }else if($this->hasPermissionTo(Permission::STORE_OWNER)){
            $role="Store Owner";
        }else if($this->hasPermissionTo(Permission::TEACHER)){
            $role="teacher";
        }else if($this->hasPermissionTo(Permission::STUDENT)){
            $role="student";
        }else if($this->hasPermissionTo(Permission::STAFF))
        {
            $role="Staff";
        }else {
            $role="Customer";
        }
        
        return [
            "role"=>$role
        ];
    }
}

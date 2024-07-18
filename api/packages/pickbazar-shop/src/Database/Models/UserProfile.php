<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class UserProfile extends Model
{

    protected $table = 'profiles';

    use HasFactory;

    

    protected $fillable = [
        'user_id',
        'gender',
        'date_of_birth',
        'bio',
        'interests'
        // Add other profile fields here
    ];

    protected $casts = [
    'interests' => 'array',
    ];

    public function getDateOfBirthAttribute($value)
    {
        return Carbon::parse($value)->format('d-m-Y');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

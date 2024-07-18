<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = ['course_name', 'course_description'];
    
    public function students()
    {
        return $this->belongsToMany(User::class, 'course_user')
            ->withPivot('role_id')
            ->wherePivot('role_id', Role::STUDENT);
    }

    public function books() {
        return $this->hasMany(Books::class);
    }
    

    public function teachers()
    {
        return $this->belongsToMany(User::class, 'course_user')
            ->withPivot('role_id')
            ->wherePivot('role_id', Role::TEACHER);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'course_user');
    }


    public function exams()
    {
        return $this->hasMany(Exam::class, 'course_id');
    }
    
}


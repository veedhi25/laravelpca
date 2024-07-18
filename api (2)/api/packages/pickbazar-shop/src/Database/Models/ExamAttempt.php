<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamAttempt extends Model
{
    protected $fillable = ['exam_id', 'user_id', 'start_time', 'end_time', 'score', 'status', 'is_mock'];

    public function exam() {
        return $this->belongsTo(Exam::class, 'exam_id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function answers() {
        return $this->hasMany(ExamAttemptAnswer::class, 'exam_attempt_id');
    }
    
    public function timeSpentOnQuestions() {
        return $this->hasMany(ExamQuestionTimeSpent::class, 'exam_attempt_id');
    }

    // public function answers() {
    //     return $this->hasMany(ExamAttemptAnswer::class, 'exam_attempt_id');
    // }
    
    
  
    // In the ExamAttempt model

    public function timeSpentRecords()
    {
        return $this->hasMany(ExamQuestionTimeSpent::class);
    }

   
}

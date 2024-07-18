<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamAttemptAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_attempt_id', 
        'question_id', 
        'option_id', 
        'is_correct',
        'answer_text',
        'time',
        'is_saved',
    ];

    public function getTimeSpentAttribute()
    {
        return $this->timeSpent->time_spent ?? null;
    }

    public function question()
    {
        return $this->belongsTo(ExamQuestion::class, 'question_id');
    }
    
    public function selectedOption()
    {
        return $this->belongsTo(QuestionOption::class, 'option_id', 'id');
    }
    
    
    public function timeSpent()
    {
        return $this->hasOne(ExamQuestionTimeSpent::class, 'exam_question_id', 'question_id');
    }

    public function examAttempt()
    {
        return $this->belongsTo(ExamAttempt::class, 'exam_attempt_id');
    }
    
}

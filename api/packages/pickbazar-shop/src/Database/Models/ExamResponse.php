<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class ExamResponse extends Model
{
    protected $fillable = ['exam_attempt_id', 'question_id', 'option_id', 'is_correct'];

    public function examAttempt() {
        return $this->belongsTo(ExamAttempt::class);
    }

    public function question() {
        return $this->belongsTo(Question::class);  // Assuming you have a Question model
    }

    public function option() {
        return $this->belongsTo(QuestionOption::class);  // Assuming you have a QuestionOption model for MCQ options
    }
}

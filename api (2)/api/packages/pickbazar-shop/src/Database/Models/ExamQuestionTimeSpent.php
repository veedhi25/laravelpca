<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class ExamQuestionTimeSpent extends Model
{
    use HasFactory;

    protected $table = 'exam_question_time_spent';

    protected $fillable = [
        'exam_attempt_id',
        'exam_question_id',
        'time_spent',
    ];

    /**
     * Get the exam attempt that this time spent record belongs to.
     */
    public function examAttempt()
    {
        return $this->belongsTo(ExamAttempt::class, 'exam_attempt_id', 'id');
    }

    /**
     * Get the exam question that this time spent record is for.
     */
    public function examQuestion()
    {
        return $this->belongsTo(ExamQuestion::class, 'exam_question_id', 'id');
    }
}

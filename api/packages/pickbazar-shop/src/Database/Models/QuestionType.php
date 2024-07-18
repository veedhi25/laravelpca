<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionType extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
    ];

    protected $table = 'question_types';

    public function examQuestions()
    {
        return $this->hasMany(ExamQuestion::class, 'question_type_id');
    }

    public function questions() {
        return $this->hasMany(ExamQuestionAssoc::class);
    }
    
}

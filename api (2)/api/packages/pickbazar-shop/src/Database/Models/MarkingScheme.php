<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MarkingScheme extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'exam_id',
        'name',
        'section_id',
        'question_type_id',
        'marks',
        'negative_marks',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function exam_question() {
        return $this->belongsTo(ExamQuestion::class);
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function questionType()
    {
        return $this->belongsTo(QuestionType::class, 'question_type_id');
    }

}

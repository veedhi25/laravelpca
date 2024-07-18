<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ExamQuestionAssoc extends Model
{

    protected $fillable = [
        'exam_id',
        'question_id',
        'marks',
        'negative_marks',
        'sub_section',
        'question_subSection'
        // add any other fields that need to be mass assignable
    ];

    protected $appends = [
        'sub_section_details',
        // ... (any other appended attributes)
    ];

    public function getAssociatedQuestionTypeAttribute()
{
    return $this->question->questionType;
}


    protected $table = 'exam_question_assoc';

    // Relationship with the ExamQuestion model
    // public function question()
    // {
    //     return $this->belongsTo(ExamQuestion::class, 'question_id');
    // }

    // Relationship with the Section model
    public function section() {
        return $this->belongsTo(Section::class, 'section_id');
    }

    public function question() {
        return $this->belongsTo(ExamQuestion::class, 'question_id', 'id');
    }
    
    public function subsection() {
        return $this->belongsTo(SubSection::class, 'subsection_id');
    }

    public function questionSubSection() {
        return $this->belongsTo(ExamQuestionAssoc::class, 'question_subSection');
    }
    
    public function getSubSectionDetailsAttribute()
    {
        return $this->subsection;
    }
    
    // Relationship with the QuestionType model
    public function questionType()
    {
        return $this->belongsTo(QuestionType::class, 'question_type_id');
    }

    public function options()
    {
        return $this->hasMany(QuestionOption::class, 'question_id');
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function getSubSectionAttribute($value)
    {
        return json_decode($value, true);
    }

}

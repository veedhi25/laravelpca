<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;

    protected $casts = [
        'section_id' => 'array',
    ];
    

    protected $fillable = [
        'course_id',
        'exam_name',
        'negative_marking',
        'total_marks',
        'total_questions',
        'start_time',
        'end_time',
        'class_id',
    ];

    // public function courses()
    // {
    //     return $this->belongsToMany(Course::class, 'course_exam_pivot_table_name'); // Specify the pivot table name
    // }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    
    public function attempts()
    {
        return $this->hasMany(ExamAttempt::class);
    }

    

    public function sections()
    {
        return $this->belongsToMany(Section::class, 'exam_section');
    }

    public function classes()
    {
        return $this->belongsToMany(StudentClass::class, 'exam_class_assoc', 'exam_id', 'class_id');
    }



    public function questions() {
        return $this->belongsToMany(ExamQuestion::class, 'exam_question_assoc', 'exam_id', 'question_id');
    }

    public function exam_questions() {
        return $this->belongsToMany(ExamQuestion::class, 'exam_question_assoc', 'exam_id', 'question_id')
                    ->withPivot(['marks', 'negative_marks']); // Include both columns from the pivot table
    }
    
    // public function sections()
    // {
    //     return $this->hasMany(Section::class, 'exam_id', 'id');
    // }

    // public function sections() {
    //     return $this->hasMany(Section::class);
    // }
    
        public function questionAssociations()
    {
        return $this->hasMany(ExamQuestionAssoc::class);
    }


}

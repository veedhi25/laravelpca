<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamQuestion extends Model
{
    protected $fillable = ['name','course_id', 'question_type_id','question','section_instruction_img_id', 'section_id', 'correct_answer', 'question_tag_id', 'question_img_id'];
    
    protected $casts = [
        'tags_id' => 'array',
        'options' => 'array',
    ]; 

    protected $appends = ['question_img_url', 'correct_options', 'section_name'];
    
    public function getSectionNameAttribute()
    {
        return $this->section ? $this->section->name : null;
    }
    
    public function getCorrectOptionsAttribute()
    {
        return $this->correctOptions()->get();
    }
    
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function marking_scheme() {
        return $this->hasOne(MarkingScheme::class, 'exam_question_id', 'id');
    }
    

    public function getQuestionImgUrlAttribute()
    {
        $attachment = $this->attachment;
        return $attachment ? $attachment->url : null; // Adjust 'url' if your image path column in the attachment table is named differently.
    }

    // public function subsection()
    // {
    //     return $this->belongsTo(SubSection::class, 'subsection_id');
    // }

    public function exam_association() {
        return $this->hasOne(ExamQuestionAssoc::class, 'question_id', 'id');
    }
    
    public function attachment()
    {
        return $this->hasOne(Attachment::class, 'id', 'question_img_id');
    }

 

    public function exams() {
        return $this->belongsToMany(Exam::class, 'exam_question_assoc', 'question_id', 'exam_id');
    }

    public function correctOption()
    {
        return $this->belongsTo(QuestionOption::class, 'correct_option_id');
    }


    public function questionType()
    {
        return $this->belongsTo(QuestionType::class, 'question_type_id');
    }
    // In the ExamQuestion model

    public function timeSpentRecords()
    {
        return $this->hasMany(ExamQuestionTimeSpent::class);
    }

    public function correctOptions()
    {
        return $this->hasMany(QuestionOption::class, 'question_id')->where('is_correct', true);
    }

    public function options()
    {
        return $this->hasMany(QuestionOption::class, 'question_id');
    }

    public function examAssociations() {
        return $this->hasMany(ExamQuestionAssoc::class, 'question_id');
    }
    

    // public function exams() {
    //     return $this->belongsToMany(Exam::class, 'exam_question_assoc', 'question_id', 'exam_id');
    // }
    
    // public function exam()
    // {
    //     return $this->belongsTo(Exam::class);
    // }

    // public function subsection()
    // {
    //     return $this->belongsTo(Section::class, 'section_id');
    // }

    // In your ExamQuestion model

    public function section() {
        return $this->belongsTo(Section::class, 'section_id');
    }

    public function subsection() {
        return $this->belongsTo(SubSection::class, 'subsection_id');
    }

    public function questionSubSection() {
        return $this->hasMany(ExamQuestionAssoc::class, 'question_subSection');
    }


    public function tags()
    {
        // Assuming 'question_tags' is the pivot table and you want to keep the pivot data
        return $this->belongsToMany(Tag::class, 'question_tags', 'question_id', 'tag_id');
                    // ->withPivot('column1', 'column2');  // Replace 'column1', 'column2' with the columns you want from the pivot table

        // OR, if you want specific columns from tags table
        // return $this->belongsToMany(Tag::class, 'question_tags', 'question_id', 'tag_id')
        //             ->select('tags.id', 'tags.name');  // Replace 'name' with your actual column name(s) from tags table
    }
    
    public function image() {
        return $this->belongsTo(Attachment::class, 'question_image_id');
    }
    
}


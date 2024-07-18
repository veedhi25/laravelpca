<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionTag extends Model
{
    use HasFactory;

    protected $fillable = ['id',  'question_id', 'tag_id'];

     public function question() {
        return $this->belongsTo(ExamQuestion::class, 'question_id');
    }

    // In QuestionTag model
    public function tag() {
        return $this->belongsTo(Tag::class, 'tag_id');
    }



    
    
}

<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionOption extends Model
{
    use HasFactory;

    protected $fillable = ['value',  'question_id', 'is_correct','image_id'];
    protected $appends = ['option_image_url'];


    public function question() {
        return $this->belongsTo(ExamQuestion::class);
    }

    public function image() {
        return $this->belongsTo(Attachment::class, 'image_id');
    }

    public function attachment()
    {
        return $this->hasOne(Attachment::class, 'id', 'image_id');
    }

    public function getOptionImageUrlAttribute()
    {
        $attachment = $this->attachment;
        return $attachment ? $attachment->url : null; // Adjust 'url' if your image path column in the attachment table is named differently.
    }

}

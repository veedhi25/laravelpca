<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;


class Attachment extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $table = 'attachments';

    public $guarded = [];

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('thumbnail')
            ->width(368)
            ->height(232)
            ->nonQueued();
    }

    public function question() {
        return $this->hasOne(ExamQuestion::class, 'question_image_id', 'id');
    }
    
    public function option() {
        return $this->hasOne(QuestionOption::class, 'image_id', 'id');
    }

    public function examQuestion()
    {
        return $this->belongsTo(ExamQuestion::class, 'id', 'question_img_id');
    }

    public function questionOption()
    {
        return $this->belongsTo(QuestionOption::class, 'id', 'image_id');
    }
    
}

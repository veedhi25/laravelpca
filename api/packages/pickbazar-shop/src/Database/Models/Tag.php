<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Tag extends Model
{
    // use Sluggable;

    protected $table = 'tags';

    public $guarded = [];

    protected $casts = [
        'image' => 'json',
    ];

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function questions()
    {
        return $this->belongsToMany(ExamQuestion::class, 'question_tags');
    }

    public function examQuestions()
    {
        return $this->belongsToMany(ExamQuestion::class, 'question_tags', 'tag_id', 'question_id');
    }


    public function questionTags() {
        return $this->hasMany(QuestionTag::class, 'tag_id');
    }


    /**
     * @return BelongsTo
     */
   

    /**
     * @return BelongsToMany
     */
  
}

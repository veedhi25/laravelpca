<?php 
namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ExamSection extends Model

{

    protected $table = 'exam_section';
    public $timestamps = false;

    protected $fillable = [
        'exam_id, section_id', // Add other fields that you want to be fillable
    ];
    
    public function exams()
    {
        return $this->belongsToMany(Exam::class, 'exam_section');
    }
    

    public function sections()
    {
        return $this->belongsToMany(Section::class, 'exam_sections');
    }


    public function questions()
    {
        return $this->hasMany(ExamQuestion::class ,'section_id');
    }

    public function subsections()
    {
        return $this->hasMany(SubSection::class);
    }

}

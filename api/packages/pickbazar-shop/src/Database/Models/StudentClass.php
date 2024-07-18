<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentClass extends Model
{
    use HasFactory;

    protected $table = 'student_class'; // Updating the table name
    protected $primaryKey = 'id';
    protected $fillable = ['name'];

    // the rest of your code...


    public function stream() {
        return $this->belongsTo(ClassStream::class, 'stream_id');
    }

    public function books() {
        return $this->hasMany(Books::class);
    }

    public function study_material() {
        return $this->hasMany(StudyMaterial::class);
    }

    public function exams()
    {
        return $this->belongsToMany(Exam::class, 'exam_class_assoc', 'class_id', 'exam_id');
    }
    
    
}

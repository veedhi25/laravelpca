<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudyMaterial extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'study_material';

    protected $fillable = [
        // 'name',
        'student_class_id',
        'course_id',
        'pdf_id',
        // 'author_name',
        'description'
    ];

    // Define relationships if any, for example:
    public function studentClass() {
        return $this->belongsTo(StudentClass::class);
    }

    public function course() {
        return $this->belongsTo(Course::class);
    }

    public function pdf() {
        return $this->belongsTo(Attachment::class, 'pdf_id');
    }
    

    // Add any other relationships or model methods as needed
}

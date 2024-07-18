<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Batch extends Model
{
    use HasFactory;

    protected $table = 'batch'; // Updating the table name
    protected $primaryKey = 'id';
    protected $fillable = ['name', 'student_class_id'];

    // the rest of your code...


    // public function stream() {
    //     return $this->belongsTo(ClassStream::class, 'stream_id');
    // }

    public function studentClass()
    {
        return $this->belongsTo(StudentClass::class, 'student_class_id');
    }

    public function users()
    {
        return $this->hasMany(User::class, 'batch_id');
    }
    
}

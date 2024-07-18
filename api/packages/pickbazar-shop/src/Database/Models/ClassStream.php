<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassStream extends Model
{
    use HasFactory;

    protected $table = 'class_streams'; 
    protected $primaryKey = 'id';
    protected $fillable = ['name', 'slug'];

    // the rest of your code.....
}

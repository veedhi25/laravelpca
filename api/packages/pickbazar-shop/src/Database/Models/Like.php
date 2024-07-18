<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    // protected $table = 'likes';

    protected $fillable = ['user_id', 'liked_by_name','liked_by','chat_id', 'status','user_name','created_at',
     	'updated_at'];

  //   protected $hidden = [
	// 	'created_at',
	// 	'updated_at',
	// ];
}

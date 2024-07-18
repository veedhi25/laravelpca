<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuardianRelation extends Model
{
    use HasFactory;

    protected $table = 'guardian_relation';

    protected $fillable = ['id','name','slug','created_at',
     	'updated_at'];

  //   protected $hidden = [
	// 	'created_at',
	// 	'updated_at',
	// ];

    public function users()
    {
        return $this->hasMany(User::class, 'guardian_relation_id');
    }

}

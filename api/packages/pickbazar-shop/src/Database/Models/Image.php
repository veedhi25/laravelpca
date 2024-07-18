<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Image extends Model

{
    use HasFactory;

    protected $fillable = [
        'image_data',
        'user_id',
        'image_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
}

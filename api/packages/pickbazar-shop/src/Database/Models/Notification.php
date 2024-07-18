<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $table = 'notifications';

    protected $fillable = [
        'id',
        'type',
        'data',
        'read_at',
        'notifiable_id',
        'notifiable_type',
        'created_at',
        'updated_at'
    ];

    /**
     * Get the notifiable entity that the notification belongs to.
     */
    public function notifiable()
    {
        return $this->morphTo();
    }
}

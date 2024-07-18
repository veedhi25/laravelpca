<?php

namespace PickBazar\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserLiked
{
    use Dispatchable, SerializesModels;

    public $user_id;
    public $liked_by;
    public $status;

    /**
     * Create a new event instance.
     *
     * @param  int  $user_id
     * @param  int  $liked_by
     * @param  int  $status
     * @return void
     */
    public function __construct($user_id, $liked_by, $status)
    {
        $this->user_id = $user_id;
        $this->liked_by = $liked_by;
        $this->status = $status;
    }
}

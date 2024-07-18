<?php

namespace PickBazar\Listeners;

use PickBazar\Events\UserLiked;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use PickBazar\Notifications\LikeNotification;
use PickBazar\Database\Models\User;

class SendLikeNotification implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     *
     * @param  UserLiked  $event
     * @return void
     */
    public function handle(UserLiked $event)
    {
        $user = $event->user_id;
        $likedBy = $event->liked_by;

        // Get the user to send notification to
        $notificationUser = User::find($user);
        $liker = User::find($likedBy);


        // Send the notification
        $notificationUser->notify(new LikeNotification($liker));
    }
}

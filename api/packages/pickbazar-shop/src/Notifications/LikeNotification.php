<?php

namespace PickBazar\Notifications;

use PickBazar\Database\Models\User;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class LikeNotification extends Notification
{
    protected $liker;

    /**
     * Create a new notification instance.
     *
     * @param  User  $liker
     * @return void
     */
    public function __construct(User $liker)
    {
        $this->liker = $liker;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */

    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    
    public function toArray($notifiable)
    {
        return [
            'message' => $this->liker->name . ' has liked your profile.',
            'liker_id' => $this->liker->id,
        ];
    }
}

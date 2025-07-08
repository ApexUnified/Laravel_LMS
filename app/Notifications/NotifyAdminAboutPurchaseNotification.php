<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Str;

class NotifyAdminAboutPurchaseNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        private $data,
        private User $user
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Course Purchase Notification')
            ->greeting('Hi Admin! '.$notifiable->name)
            ->line("{$this->user->name}  Purchased the course {$this->data->course->title}")
            ->line('Course Price Paid: '.Str::upper($this->data->currency).' '.$this->data->amount)
            ->line('Payment Gateway: '.$this->data->gateway)
            ->line('Payment Status: '.$this->data->payment_status)
            ->line('Transaction ID: '.$this->data->transaction_id)
            ->action('Purchased Course', route('courses.player', $this->data->course->slug));

    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Course Purchase Notification',
            'message' => $this->user->name.' Purchased the course '.$this->data->course->title,
        ];
    }
}

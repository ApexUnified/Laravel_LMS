<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Str;

class NotifyUserAboutHisCoursePurchaseNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private $data
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
            ->greeting('Hi '.$notifiable->name)
            ->line('You have successfully purchased the course '.$this->data->course->title)
            ->line('Course Price: '.Str::upper($this->data->currency).' '.$this->data->amount)
            ->line('Payment Gateway: '.$this->data->gateway)
            ->line('Payment Status: '.$this->data->payment_status)
            ->line('Transaction ID: '.$this->data->transaction_id)
            ->action('Start Watching', route('courses.player', $this->data->course->slug))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'route' => [
                'name' => 'courses.player',
                'params' => [$this->data->course->slug],
            ],

            'title' => 'Course Purchase Notification',
            'message' => 'You have successfully purchased the course '.$this->data->course->title.' Course Price: '.Str::upper($this->data->currency).$this->data->amount.' Payment Gateway: '.$this->data->gateway.' Payment Status: '.$this->data->payment_status.' Transaction ID: '.$this->data->transaction_id,
        ];
    }
}

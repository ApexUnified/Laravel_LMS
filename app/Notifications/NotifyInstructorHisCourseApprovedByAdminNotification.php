<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotifyInstructorHisCourseApprovedByAdminNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
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
            ->subject('Course Approved By Admin')
            ->greeting('Hi '.$notifiable->name)
            ->line("Your Course {$this->data['title']} Has Been Approved By Admin")
            ->action('Start Adding Lessons', route('lessons.index'))
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
                'name' => 'lessons.index',
            ],
            'title' => 'Your Course Approval',
            'message' => "Your Course {$this->data['title']} Has Been Approved By Admin",
        ];
    }
}

<?php

namespace App\Notifications;

use App\Models\Course;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotifyAdminNewCourseCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        private Course $course,
        private User $user
    ) {
        //
    }

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
            ->subject('New Course Created')
            ->greeting('Hi Admin! '.$notifiable->name)
            ->line("New Course Has Been Created By ( {$this->user->name}  ) in The Application Please Review it And Approve It.")
            ->action('Review The Course', route('courses.player', $this->course->slug));
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
                'params' => [$this->course->slug],
            ],

            'title' => "New Course Created By ( {$this->user->name} ) Please Review It",
            'message' => 'New Course Has Been Created in The Application Please Review it And Approve It.',
        ];
    }
}

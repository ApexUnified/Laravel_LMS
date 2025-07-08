<?php

namespace App\Notifications;

use App\Models\Course;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotifyUserAboutItsNewCourseEnrollmentNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        private Course $course
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
            ->subject('🎉 Enrollment New Course: '.$this->course->title)
            ->greeting('Hi '.$notifiable->name)
            ->line('You have been enrolled in a new course '.$this->course->title)
            ->action('Check out Your New Course', route('courses.player', $this->course->slug))
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
                'params' => [$this->course->slug],
            ],
            'title' => 'You have been enrolled in a new course',
            'message' => 'You have been enrolled in a new course '.$this->course->title,
        ];
    }
}

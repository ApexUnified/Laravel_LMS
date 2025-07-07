<?php

namespace App\Repositories\Notifications\Repository;

use App\Models\User;
use App\Repositories\Notifications\Interface\NotificationRepositoryInterface;

class NotificationRepository implements NotificationRepositoryInterface
{
    public function __construct(
        private User $user
    ) {}

    public function getAllNotifications(string $user_id)
    {
        $user = $this->user->find($user_id);

        if (empty($user)) {
            return ['status' => false, 'message' => 'User Not Found'];
        }

        $notifications = $user->notifications()->paginate(10);

        if ($user->notifications->where('read_at', null)->count() > 0) {
            $user->notifications()->where('read_at', null)->update(['read_at' => now()]);
        }

        return $notifications;
    }

    public function getNotificationsForDashboard(string $user_id)
    {
        $user = $this->user->find($user_id);

        if (empty($user)) {
            return ['status' => false, 'message' => 'User Not Found'];
        }

        $notifications = $user->notifications()->latest()->limit(5)->get()->map(function ($notification) {
            $notification->added_at = $notification->created_at->format('d M Y, h:i A');

            return $notification;
        });

        return ['status' => true, 'notifications' => $notifications];
    }

    public function notificationMarkAsRead(string $user_id, string $notification_id)
    {
        $user = $this->user->find($user_id);

        if (empty($user)) {
            return ['status' => false, 'message' => 'User Not Found'];
        }

        if ($user->notifications()->where('id', $notification_id)->update(['read_at' => now()])) {
            return ['status' => true, 'message' => 'Notification Marked As Read'];
        } else {
            return ['status' => false, 'message' => 'Failed To Mark As Read Notification'];
        }
    }

    public function destroyNotification(string $user_id, string $notification_id)
    {
        $user = $this->user->find($user_id);

        if (empty($user)) {
            return ['status' => 'false', 'message' => 'User Not Found'];
        }

        if ($user->notifications()->where('id', $notification_id)->delete()) {
            return ['status' => true, 'message' => 'Notification Deleted Successfully'];
        } else {
            return ['status' => false, 'message' => 'Failed To Delete Notification'];
        }
    }

    public function destroyAllNotifications(string $user_id)
    {
        $user = $this->user->find($user_id);

        if (empty($user)) {
            return ['status' => 'false', 'message' => 'User Not Found'];
        }

        if ($user->notifications()->delete()) {
            return ['status' => true, 'message' => 'All Notifications Deleted Successfully'];
        } else {
            return ['status' => false, 'message' => 'Failed To Delete Notifications'];
        }
    }
}

<?php

namespace App\Repositories\Notifications\Interface;

interface NotificationRepositoryInterface
{
    public function getAllNotifications(string $user_id);

    public function getNotificationsForDashboard(string $user_id);

    public function notificationMarkAsRead(string $user_id, string $notification_id);

    public function destroyNotification(string $user_id, string $notification_id);

    public function destroyAllNotifications(string $user_id);
}

<?php

namespace App\Http\Controllers;

use App\Repositories\Notifications\Interface\NotificationRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class NotificationController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:Notification View', ['only' => 'index']),
            new Middleware('permission:Notification View', ['only' => 'getNotificationsForDashboard']),
            new Middleware('permission:Notification View', ['only' => 'notificationMarkAsRead']),
            new Middleware('permission:Notification View', ['only' => 'destroyNotification']),
            new Middleware('permission:Notification View', ['only' => 'destroyAllNotifications']),

        ];
    }

    public function __construct(
        private NotificationRepositoryInterface $notification
    ) {}

    public function index(Request $request)
    {
        $notifications = $this->notification->getAllNotifications($request->user()->id);

        if (isset($notifications['status']) && $notifications['status'] == false) {
            return back()->with('error', $notifications['message']);
        }

        return Inertia::render('Notifications/index', compact('notifications'));
    }

    public function getNotificationsForDashboard(Request $request)
    {
        $notifications = $this->notification->getNotificationsForDashboard($request->user()->id);

        if ($notifications['status']) {
            return response()->json(['status' => true, 'notifications' => $notifications['notifications']]);
        } else {
            return response()->json(['status' => false, 'message' => $notifications['message']]);
        }
    }

    public function notificationMarkAsRead(Request $request)
    {

        $data = $request->array('data');

        $notification = $this->notification->notificationMarkAsRead($request->user()->id, $data['notification_id']);

        if ($notification['status']) {
            return response()->json(['status' => true, 'message' => $notification['message']]);
        } else {
            return response()->json(['status' => false, 'message' => $notification['message']]);
        }
    }

    public function destroyNotification(Request $request, string $notification_id)
    {
        $notification = $this->notification->destroyNotification($request->user()->id, $notification_id);

        if ($notification['status']) {
            return response()->json(['status' => true, 'message' => $notification['message']]);
        } else {
            return response()->json(['status' => false, 'message' => $notification['message']]);
        }
    }

    public function destroyAllNotifications(Request $request)
    {
        $notification = $this->notification->destroyAllNotifications($request->user()->id);

        if ($notification['status']) {
            return response()->json(['status' => true, 'message' => $notification['message']]);
        } else {
            return response()->json(['status' => false, 'message' => $notification['message']]);
        }
    }
}

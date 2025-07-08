<?php

namespace App\Http\Middleware;

use App\Models\SmtpSetting;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureSMTPSettingsAreExistsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if (Auth::guard() && Auth::user()?->hasRole('Admin')) {

            if (! SmtpSetting::exists()) {
                session()->flash('info', 'Please Set SMTP Settings Of Application Before Sending Mails To Users');
            }
        }

        return $next($request);
    }
}

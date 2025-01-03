<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IsShipper
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if ((Auth::user() &&  Auth::user()->role_id == 1) || (Auth::user() &&  Auth::user()->role_id == 4)) {
            return $next($request);
        }

        return response()->json([
             'message' => 'Validate Role Shipper.'
        ],401);
    }
}

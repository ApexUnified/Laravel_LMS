<?php

namespace App\Repositories\Checkouts\Interface;

use Illuminate\Http\Request;

interface CheckoutRepositoryInterface
{
    public function initCheckout($request);

    public function paymentSuccess(Request $request);
}

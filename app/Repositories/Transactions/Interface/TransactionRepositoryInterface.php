<?php

namespace App\Repositories\Transactions\Interface;

use Illuminate\Http\Request;

interface TransactionRepositoryInterface
{
    public function getTransactions(Request $request);
}

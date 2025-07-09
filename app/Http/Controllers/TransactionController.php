<?php

namespace App\Http\Controllers;

use App\Repositories\Transactions\Interface\TransactionRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class TransactionController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:Transaction View', ['only' => '__invoke']),
        ];
    }

    public function __construct(
        private TransactionRepositoryInterface $transaction
    ) {}

    public function __invoke(Request $request)
    {
        $data = $this->transaction->getTransactions($request);

        $transactions = $data['transactions'];

        $search = $data['search'];
        $start_date = $data['start_date'];
        $end_date = $data['end_date'];

        return Inertia::render('Transactions/index', compact(
            'transactions',
            'search',
            'start_date',
            'end_date'
        ));
    }
}

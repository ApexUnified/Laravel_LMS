<?php

namespace App\Repositories\Transactions\Repository;

use App\Models\Transaction;
use App\Repositories\Transactions\Interface\TransactionRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TransactionRepository implements TransactionRepositoryInterface
{
    public function __construct(
        private Transaction $transaction
    ) {}

    public function getTransactions(Request $request)
    {
        $transactions = $this->transaction->query()->latest();

        $search = $request->filled('search') ? $request->search : null;
        if ($request->filled('search')) {
            $transactions = $transactions->where(function ($query) use ($search) {
                $query->whereHas('user', function ($sub_q) use ($search) {
                    $sub_q->where('name', 'like', '%'.$search.'%')
                        ->orWhere('email', 'like', '%'.$search.'%');
                })
                    ->orWhereHas('course', function ($sub_q_q) use ($search) {
                        $sub_q_q->where('title', 'like', '%'.$search.'%');
                    })

                    ->orWhere('course_title', 'like', '%'.$search.'%')
                    ->orWhere('user_name', 'like', '%'.$search.'%')
                    ->orWhere('user_email', 'like', '%'.$search.'%');

            });
        }

        $start_date = $request->filled('start_date') ? $request->start_date : null;
        $end_date = $request->filled('end_date') ? $request->end_date : null;

        $transformed_start_date = null;
        $transformed_end_date = null;

        if ($start_date) {
            $transformed_start_date = Carbon::parse($start_date)->startOfDay();
        }

        if ($end_date) {
            $transformed_end_date = Carbon::parse($end_date)->endOfDay();
        }

        if ($transformed_start_date && $transformed_end_date) {
            $transactions = $transactions->whereBetween('created_at', [$transformed_start_date, $transformed_end_date]);
        } elseif ($transformed_start_date) {
            $transactions = $transactions->where('created_at', '>=', $transformed_start_date);
        } elseif ($transformed_end_date) {
            $transactions = $transactions->where('created_at', '<=', $transformed_end_date);
        }

        $transactions = $transactions->with(['user', 'course'])->paginate(10);

        $transactions->getCollection()->transform(function ($transaction) {
            $transaction->added_at = $transaction->created_at->format('Y-m-d g:i A');

            return $transaction;
        });

        return ['transactions' => $transactions, 'search' => $search, 'start_date' => $start_date, 'end_date' => $end_date];
    }
}

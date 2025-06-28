<?php

namespace App\Repositories\Categories\Repository;

use App\Models\Category;
use App\Repositories\Categories\Interface\CategoryRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryRepository implements CategoryRepositoryInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private Category $category
    ) {
        //
    }

    public function getCategories(Request $request)
    {
        $categories = $this->category->query();

        $request->validate(['name' => 'nullable|string']);

        if ($request->filled('search')) {
            $categories->where('name', 'like', '%'.$request->search.'%');
        }

        $categories = $categories->withCount('courses')->paginate(5);

        $categories->getCollection()->transform(function ($category) {
            $category->added_at = Carbon::parse($category->created_at)->format('g:i A Y-M-D');

            return $category;
        });

        $search = $request->filled('search') ? $request->search : null;

        return ['categories' => $categories, 'search' => $search];
    }

    public function storeCategory(Request $request)
    {
        $validated_req = $request->validate([
            'name' => 'required',
        ]);

        if ($this->category->create($validated_req)) {
            return true;
        } else {
            return false;
        }
    }

    public function getCategory(string $id)
    {
        $category = $this->category->find($id);

        return $category;
    }

    public function updateCategory(Request $request, string $id)
    {
        $validated_req = $request->validate([
            'name' => 'required',
        ]);

        $category = $this->getCategory($id);

        if (empty($category)) {
            return false;
        }

        if ($category->update($validated_req)) {
            return true;
        } else {
            return false;
        }

    }

    public function destroyCategory(string $id)
    {
        $category = $this->getCategory($id);

        if (empty($category)) {
            return false;
        }

        if ($category->delete()) {
            return true;
        } else {
            return false;
        }
    }

    public function destroyCategoriesBySelection(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ids' => 'required|array|min:1',
            'ids.*' => 'exists:categories,id',
        ]);

        if ($validator->fails()) {
            return ['error' => $validator->errors()->first()];
        }

        $ids = $request->ids;

        return $this->category->whereIn('id', $ids)->delete() > 0;
    }
}

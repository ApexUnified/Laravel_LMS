<?php

namespace App\Repositories\Categories\Repository;

use App\Models\Category;
use App\Repositories\Categories\Interface\CategoryRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;

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
        $categories = $this->category->query()->latest();

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
            return ['status' => true, 'message' => 'Category created successfully'];
        } else {
            return ['status' => false, 'message' => 'Category creation failed'];
        }
    }

    public function getCategory(string $id)
    {
        $category = $this->category->find($id);

        if (empty($category)) {
            return ['status' => false, 'message' => 'No Category Found'];
        }

        return $category;
    }

    public function updateCategory(Request $request, string $id)
    {
        $validated_req = $request->validate([
            'name' => 'required',
        ]);

        $category = $this->getCategory($id);

        if ($category->update($validated_req)) {
            return ['status' => true, 'message' => 'Category Created Succesfully'];
        } else {
            return ['status' => false, 'message' => 'Category Creation Failed Something Went Wrong'];
        }

    }

    public function destroyCategory(string $id)
    {
        $category = $this->getCategory($id);

        if ($category->delete()) {
            return ['status' => true, 'message' => 'Category Deleted Successfully'];
        } else {
            return ['status' => false, 'message' => 'Category Deletion Failed Something Went Wrong'];
        }
    }

    public function destroyCategoriesBySelection(Request $request)
    {
        $ids = $request->array('ids');
        if (blank($ids)) {
            return ['status' => false, 'message' => 'Please select at least one Category'];
        }

        return $this->category->whereIn('id', $ids)->delete() > 0 ? ['status' => true, 'message' => 'Categories Deleted Successfully'] : ['status' => false, 'message' => 'Categories Deletion Failed Something Went Wrong'];
    }
}

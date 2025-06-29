<?php

namespace App\Http\Controllers;

use App\Repositories\Categories\Interface\CategoryRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function __construct(
        private CategoryRepositoryInterface $category) {}

    public function index(Request $request)
    {

        $data = $this->category->getCategories($request);

        $categories = $data['categories'];
        $search = $data['search'];

        return Inertia::render('Categories/index', compact('categories', 'search'));
    }

    public function create()
    {
        return Inertia::render('Categories/create');
    }

    public function store(Request $request)
    {

        $created = $this->category->storeCategory($request);

        if ($created['status']) {
            return to_route('category.index')->with('success', $created['message']);
        } else {
            return back()->with('error', $created['message']);
        }
    }

    public function edit(string $id)
    {

        if (empty($id)) {
            return back()->with('error', 'No Category Found');
        }

        $category = $this->category->getCategory($id);

        if (isset($category['status']) && $category['status'] == false) {
            return to_route('category.index')->with('error', $category['message']);
        }

        return Inertia::render('Categories/edit', compact('category'));
    }

    public function update(Request $request, string $id)
    {

        if (empty($id)) {
            return back()->with('error', 'No Category Found');
        }

        $updated = $this->category->updateCategory($request, $id);

        if ($updated['status']) {
            return to_route('category.index')->with('success', $updated['message']);
        } else {
            return back()->with('error', $updated['message']);
        }
    }

    public function destroy(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'No Category Found');
        }

        $deleted = $this->category->destroyCategory($id);

        if ($deleted['status']) {
            return back()->with('success', $deleted['message']);
        } else {
            return back()->with('error', $deleted['message']);
        }
    }

    public function deleteBySelection(Request $request)
    {

        $deleted = $this->category->destroyCategoriesBySelection($request);

        if ($deleted['status']) {
            return back()->with('success', $deleted['message']);
        } else {
            return back()->with('error', $deleted['message']);
        }
    }
}

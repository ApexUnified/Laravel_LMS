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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Categories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $created = $this->category->storeCategory($request);

        if ($created) {
            return redirect()->route('category.index')->with('success', 'Category Created Succesfully');
        } else {
            return redirect()->back()->with('error', 'Something went wrong');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        if (empty($id)) {
            return redirect()->route('category.index')->with('error', 'No Category Found');
        }

        $category = $this->category->getCategory($id);

        if (empty($category)) {
            return redirect()->route('category.index')->with('error', 'No Category Found');
        }

        return Inertia::render('Categories/edit', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        if (empty($id)) {
            return redirect()->route('category.index')->with('error', 'No Category Found');
        }

        $updated = $this->category->updateCategory($request, $id);

        if ($updated) {
            return redirect()->route('category.index')->with('success', 'Category Updated Succesfully');
        } else {
            return redirect()->back()->with('error', 'Something went wrong');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (empty($id)) {
            return redirect()->route('category.index')->withErrors(request()->all())->with('error', 'No Category Found');
        }

        $deleted = $this->category->destroyCategory($id);

        if ($deleted) {
            return redirect()->route('category.index')->with('success', 'Category Deleted Succesfully');
        } else {
            return redirect()->back()->with('error', 'Something went wrong');
        }
    }

    public function deleteBySelection(Request $request)
    {

        $deleted = $this->category->destroyCategoriesBySelection($request);

        if (is_array($deleted) && isset($deleted['error'])) {
            return back()->with('error', $deleted['error'])->withErrors($request->all());
        }

        if ($deleted) {
            return back()->with('success', 'Seletced Categories Deleted Succesfully');
        } else {
            return back()->with('error', 'Something went wrong While Deleting Categories')->withErrors($request->all());
        }
    }
}

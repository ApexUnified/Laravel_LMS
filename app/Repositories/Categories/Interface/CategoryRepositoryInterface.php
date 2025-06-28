<?php

namespace App\Repositories\Categories\Interface;

use Illuminate\Http\Request;

interface CategoryRepositoryInterface
{
    public function getCategories(Request $request);

    public function storeCategory(Request $request);

    public function getCategory(string $id);

    public function updateCategory(Request $request, string $id);

    public function destroyCategory(string $id);

    public function destroyCategoriesBySelection(Request $request);
}

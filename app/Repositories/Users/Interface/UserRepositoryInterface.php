<?php

namespace App\Repositories\Users\Interface;

use Illuminate\Http\Request;

interface UserRepositoryInterface
{
    public function getAllUsers(Request $request);

    public function create();

    public function store(Request $request);

    public function show(string $id);

    public function edit(string $id);

    public function update(Request $request, string $id);

    public function destroy(string $id);

    public function destroyBySelection(Request $request);
}

<?php

namespace App\Repositories\Users\Interface;

use Illuminate\Http\Request;

interface UserRepositoryInterface
{
    public function getUsers(Request $request);

    public function getRoles();

    public function storeUser(Request $request);

    public function getUser(string $id);

    public function updateUser(Request $request, string $id);

    public function destroyUser(string $id);

    public function destroyUsersBySelection(Request $request);
}

<?php

namespace App\Repositories\Profile\Interface;

interface ProfileRepositoryInterface
{
    public function getUser();

    public function updateProfile($request);

    public function updatePassword($request);

    public function destroyAccount($request);
}

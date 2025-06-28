<?php

namespace App\Repositories\Settings\Interface;

use Illuminate\Http\Request;

interface SettingRepositoryInterface
{
    public function generalSetting();

    public function updateGeneralSetting(Request $request);

    public function smtpSetting();

    public function updateSmtpSetting(Request $request);

    public function getRoles(Request $request);

    public function roleStore(Request $request);

    public function getRole(string $id);

    public function roleUpdate(Request $request, string $id);

    public function roleDestroy(string $id);

    public function roleDestroyBySelection(Request $request);
}

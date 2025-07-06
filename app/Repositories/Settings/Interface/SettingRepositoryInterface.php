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

    public function getCurrencies(Request $request);

    public function currencyStore(Request $request);

    public function getCurrency(string $id);

    public function currencyUpdate(Request $request, string $id);

    public function currencyDestroy(string $id);

    public function currencyDestroyBySelection(Request $request);

    public function ToggleCurrencyStatus(Request $request, string $id);

    public function stripeCredentialsSave(Request $request);

    public function cloudinaryCredentialsSave(Request $request);

    public function getStripeCredentials();

    public function getCloudinaryCredentials();
}

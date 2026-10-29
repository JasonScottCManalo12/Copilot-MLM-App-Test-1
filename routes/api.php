<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['api'])
    ->prefix('api')
    ->group(function () {
        Route::get('/health', function () {
            return response()->json([
                'ok' => true,
                'app' => 'Copilot MLM App Test 1',
                'stack' => 'Laravel 11/12 + PostgreSQL + Breeze/Jetstream + Livewire/React',
                'timestamp' => now()->toISOString(),
            ]);
        });

        Route::get('/summary', [\App\Http\Controllers\MlmDashboardController::class, 'summary']);
        Route::get('/plans', [\App\Http\Controllers\MlmDashboardController::class, 'plans']);
        Route::get('/members', [\App\Http\Controllers\MlmDashboardController::class, 'members']);
        Route::get('/products', [\App\Http\Controllers\MlmDashboardController::class, 'products']);
        Route::get('/orders', [\App\Http\Controllers\MlmDashboardController::class, 'orders']);
        Route::get('/tree/{memberId}', [\App\Http\Controllers\MlmDashboardController::class, 'tree']);
        Route::get('/commissions/{memberId}', [\App\Http\Controllers\MlmDashboardController::class, 'commissions']);
    });

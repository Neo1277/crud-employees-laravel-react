<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->prepend(HandleCors::class);
        // ... other middleware
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        $exceptions->render(function (ValidationException $e, $request) {

            if ($request->is('api/*')) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors'  => $e->errors(),
                ], 422);
            }
        });
        
        // 1️⃣ Specific exceptions first (if needed)
        $exceptions->render(function (QueryException $e, $request) {

            Log::error('Database error', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'message' => 'A database error occurred.'
            ], 500);
        });

        // 2️⃣ Generic fallback for API
        $exceptions->render(function (Throwable $e, $request) {

            if ($request->is('api/*')) {

                Log::error($e);

                return response()->json([
                    'message' => 'Server Error',
                    'type'    => class_basename($e),
                ], 500);
            }
        });
    })->create();

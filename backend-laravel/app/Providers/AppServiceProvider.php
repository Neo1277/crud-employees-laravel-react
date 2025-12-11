<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\ClientRepositoryInterface;
use App\Repositories\ClientRepository;
use App\Interfaces\ClientServiceInterface;
use App\Services\ClientService;
use App\Interfaces\EmailGenerationInterface;
use App\Services\EmailGenerationService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ClientRepositoryInterface::class, ClientRepository::class);
        $this->app->bind(ClientServiceInterface::class, ClientService::class);
        $this->app->bind(EmailGenerationInterface::class, EmailGenerationService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}

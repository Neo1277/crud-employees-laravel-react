<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\ClientRepositoryInterface;
use App\Repositories\ClientRepository;
use App\Interfaces\ClientServiceInterface;
use App\Services\ClientService;
use App\Interfaces\EmailGenerationInterface;
use App\Services\EmailGenerationService;
use App\Interfaces\TypeOfIdentityDocumentRepositoryInterface;
use App\Repositories\TypeOfIdentityDocumentRepository;
use App\Interfaces\TypeOfIdentityDocumentServiceInterface;
use App\Services\TypeOfIdentityDocumentService;
use App\Interfaces\AreaRepositoryInterface;
use App\Repositories\AreaRepository;
use App\Interfaces\AreaServiceInterface;
use App\Services\AreaService;

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
        $this->app->bind(TypeOfIdentityDocumentRepositoryInterface::class, TypeOfIdentityDocumentRepository::class);
        $this->app->bind(TypeOfIdentityDocumentServiceInterface::class, TypeOfIdentityDocumentService::class);
        $this->app->bind(AreaRepositoryInterface::class, AreaRepository::class);
        $this->app->bind(AreaServiceInterface::class, AreaService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use App\Interfaces\ClientServiceInterface;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use App\Services\ClientService;

class ClientController extends Controller
{
    protected const CACHE_TTL = 60;
    
    protected ClientServiceInterface $clientService;

    public function __construct(ClientServiceInterface $clientService)
    {
        $this->clientService = $clientService;
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $filters = $request->only(['identity_document', 'first_last_name', 'second_last_name', 
                                    'first_name', 'other_names', 'email', 'country', 'status',
                                    'type_of_identity_document', 'area']);
        //dd($filters);
        $clients = $this->clientService->getFilteredClients($filters)->paginate(10);
        return ClientResource::collection($clients);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request)
    {
        $client = $this->clientService->store((array)$request->validated());
        return new ClientResource($client);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $clienttId): ClientResource
    {
        return Cache::remember("client.$clienttId", self::CACHE_TTL, function () use ($clienttId) {
            $client = $this->clientService->findOrFail($clienttId);
            return new ClientResource($client);
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreClientRequest $request, int $clientId): JsonResponse
    {
        $this->clientService->update((array)$request->validated(), $clientId);
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $clientId): JsonResponse
    {
        $this->clientService->delete($clientId);
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}

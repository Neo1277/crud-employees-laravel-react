<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use App\Repositories\ClientRepository;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ClientController extends Controller
{
    private const CACHE_TTL = 60;
    
    private ClientRepository $clientRepository;

    public function __construct(ClientRepository $clientRepository)
    {
        $this->clientRepository = $clientRepository;
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        return Cache::remember("clients", self::CACHE_TTL, function () {
            $listOfClients = $this->clientRepository->findAll();
            return ClientResource::collection($listOfClients);
        });
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request)
    {
        $client = $this->clientRepository->store((array)$request->validated());
        return new ClientResource($client);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $clienttId): ClientResource
    {
        return Cache::remember("client.$clienttId", self::CACHE_TTL, function () use ($clienttId) {
            $client = $this->clientRepository->findOrFail($clienttId);
            return new ClientResource($client);
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreClientRequest $request, int $clientId): JsonResponse
    {
        $this->clientRepository->update((array)$request->validated(), $clientId);
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $clientId): JsonResponse
    {
        $this->clientRepository->delete($clientId);
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}

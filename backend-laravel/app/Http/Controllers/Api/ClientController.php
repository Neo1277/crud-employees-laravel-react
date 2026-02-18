<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use App\Interfaces\ClientServiceInterface;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;

class ClientController extends Controller
{
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
        $filters = $request->only([
            'identity_document',
            'first_last_name',
            'second_last_name',
            'first_name',
            'other_names',
            'email',
            'country',
            'status',
            'type_of_identity_document',
            'area'
        ]);

        $clients = $this->clientService
            ->getAll($filters)
            ->paginate(10)
            ->withQueryString();

        return ClientResource::collection($clients);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request): ClientResource
    {
        $client = DB::transaction(fn () =>
            $this->clientService->store((array)$request->validated())
        );

        return new ClientResource($client);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $clientId): ClientResource
    {
        $client = $this->clientService->findOrFail($clientId);

        return new ClientResource($client);  
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClientRequest $request, int $clientId): Response
    {
        DB::transaction(fn () =>
            $this->clientService->update((array)$request->validated(), $clientId)
        );

        return response()->noContent();        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $clientId): Response
    {
        $this->clientService->delete($clientId);

        return response()->noContent();
    }

    /**
     * Email generation.
     */
    public function getNewEmail(Request $request): JsonResponse
    {
        $parameters = $request->only(['first_last_name',  'first_name', 'country']);
        //dd($filters);
        $new_email = $this->clientService->getNewEmail(
            $parameters['first_last_name'], 
            $parameters['first_name'], 
            $parameters['country']
        );
        
        return response()->json([
            'new_email' => $new_email
        ]);
    }
}

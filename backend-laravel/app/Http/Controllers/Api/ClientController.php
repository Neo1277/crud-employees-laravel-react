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
use App\Http\Responses\ApiException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

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
    public function index(Request $request): AnonymousResourceCollection | ApiException
    {
        try {
            $filters = $request->only(['identity_document', 'first_last_name', 'second_last_name', 
                                    'first_name', 'other_names', 'email', 'country', 'status',
                                    'type_of_identity_document', 'area']);
            //dd($filters);
            $clients = $this->clientService->getAll($filters)->paginate(10)->withQueryString();
            return ClientResource::collection($clients);
        } catch (QueryException $e) {
            Log::error('QueryException error occurred in Client Index.' . $e->getMessage());
            throw new ApiException($e->getMessage());
        } catch (\Exception $e) {
            Log::error('An error occurred in Client Index.' . $e->getMessage());
            throw new ApiException($e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request): ClientResource | ApiException
    {
        DB::beginTransaction();
        try {
            $client = $this->clientService->store((array)$request->validated());
            DB::commit();
            return new ClientResource($client);
        } catch (QueryException $e) {
            DB::rollback();
            Log::error('QueryException error occurred in Store Client.' . $e->getMessage());
            throw new ApiException($e->getMessage());
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('An error occurred in Store Client.' . $e->getMessage());
            throw new ApiException($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $clienttId): ClientResource | ApiException
    {
        try {        
            $client = $this->clientService->findOrFail($clienttId);
            return new ClientResource($client);
        } catch (QueryException $e) {
            Log::error('QueryException error occurred in Show Client by id.' . $e->getMessage());
            throw new ApiException($e->getMessage());
        } catch (\Exception $e) {
            Log::error('An error occurred in Show Client by id.' . $e->getMessage());
            throw new ApiException($e->getMessage());
        }        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClientRequest $request, int $clientId): JsonResponse | ApiException
    {
        DB::beginTransaction();
        try {
            $this->clientService->update((array)$request->validated(), $clientId);
            DB::commit();
            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        } catch (QueryException $e) {
            DB::rollback();
            Log::error('QueryException error occurred in Update Client.' . $e->getMessage());
            throw new ApiException($e->getMessage());
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('An error occurred in Update Client.' . $e->getMessage());
            throw new ApiException($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $clientId): JsonResponse | ApiException
    {
        try {        
            $this->clientService->delete($clientId);
            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        } catch (QueryException $e) {
            Log::error('QueryException error occurred in Destroy Client.' . $e->getMessage());
            throw new ApiException($e->getMessage());
        } catch (\Exception $e) {
            Log::error('An error occurred in Destroy Client.' . $e->getMessage());
            throw new ApiException($e->getMessage());
        }
    }

    /**
     * Email generation.
     */
    public function getNewEmail(Request $request): JsonResponse | ApiException
    {
        try {
            $parameters = $request->only(['first_last_name',  'first_name', 'country']);
            //dd($filters);
            $new_email = $this->clientService->getNewEmail(
                $parameters['first_last_name'], 
                $parameters['first_name'], 
                $parameters['country']
            );
            $data_response = [
                'new_email' => $new_email
            ];
            return new JsonResponse($data_response, Response::HTTP_OK);
        } catch (QueryException $e) {
            Log::error('QueryException error occurred in get new email.' . $e->getMessage());
            throw new ApiException($e->getMessage());
        } catch (\Exception $e) {
            Log::error('An error occurred in get new email.' . $e->getMessage());
            throw new ApiException($e->getMessage());
        }
    }
}

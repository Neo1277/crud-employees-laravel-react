<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Interfaces\TypeOfIdentityDocumentServiceInterface;
use App\Http\Resources\TypeOfIdentityDocumentResource;
use App\Http\Responses\ApiException;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TypeOfIdentityDocumentController extends Controller
{
    protected TypeOfIdentityDocumentServiceInterface $typeOfIdentityDocumentService;

    public function __construct(TypeOfIdentityDocumentServiceInterface $typeOfIdentityDocumentService)
    {
        $this->typeOfIdentityDocumentService = $typeOfIdentityDocumentService;
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection | ApiException
    {
        try {
            $typesOfIdentityDocumentService = $this->typeOfIdentityDocumentService->getAll();
            return TypeOfIdentityDocumentResource::collection($typesOfIdentityDocumentService);
         } catch (QueryException $e) {
            Log::error('QueryException error occurred in TypeOfIdentityDocumentController index.' . $e->getMessage());
            throw new ApiException($e->getMessage());
        } catch (\Exception $e) {
            Log::error('An error occurred in TypeOfIdentityDocument Index.' . $e->getMessage());
            throw new ApiException($e->getMessage());
        }
    }
}

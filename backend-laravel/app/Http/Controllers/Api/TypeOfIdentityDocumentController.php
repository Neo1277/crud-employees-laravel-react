<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Interfaces\TypeOfIdentityDocumentServiceInterface;
use App\Http\Resources\TypeOfIdentityDocumentResource;
use App\Http\Responses\ApiException;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Database\QueryException;

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
    public function index(): AnonymousResourceCollection
    {
        return TypeOfIdentityDocumentResource::collection(
            $this->typeOfIdentityDocumentService->getAll()
        );
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Interfaces\AreaServiceInterface;
use App\Http\Resources\AreaResource;
use App\Http\Responses\ApiException;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Database\QueryException;

class AreaController extends Controller
{
    protected AreaServiceInterface $areaService;

    public function __construct(AreaServiceInterface $areaService)
    {
        $this->areaService = $areaService;
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        return AreaResource::collection(
            $this->areaService->getAll()
        );
    }
}

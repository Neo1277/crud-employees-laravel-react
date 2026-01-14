<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Interfaces\AreaServiceInterface;
use App\Http\Resources\AreaResource;
use App\Http\Responses\ApiException;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

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
    public function index(Request $request): AnonymousResourceCollection | ApiException
    {
        try {
            $areasService = $this->areaService->getAll();
            return AreaResource::collection($areasService);
        } catch (QueryException $e) {
            Log::error('QueryException error occurred in Area Controller index.' . $e->getMessage());
            throw new ApiException($e->getMessage());
        } catch (\Exception $e) {
            Log::error('An error occurred in Area Index.' . $e->getMessage());
            throw new ApiException($e->getMessage());
        }
    }
}

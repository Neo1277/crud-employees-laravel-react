<?php

namespace App\Services;

use App\Interfaces\AreaServiceInterface;
use App\Interfaces\AreaRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class AreaService implements AreaServiceInterface
{
    protected AreaRepositoryInterface $areaRepository;

    public function __construct(AreaRepositoryInterface $areaRepository)
    {
        $this->areaRepository = $areaRepository;
    }

    public function getAll(): Collection
    {
        return $this->areaRepository->getAll();
    }

}
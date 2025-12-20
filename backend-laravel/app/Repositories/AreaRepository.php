<?php

namespace App\Repositories;

use App\Interfaces\AreaRepositoryInterface;
use App\Models\Area;
use Illuminate\Database\Eloquent\Collection;

class AreaRepository implements AreaRepositoryInterface
{
    protected Area $area;

    public function __construct(Area $area) // Injecting the area model
    {
        $this->area = $area;
    }

    public function getAll(): Collection
    {
        return $this->area->all();
    }
}
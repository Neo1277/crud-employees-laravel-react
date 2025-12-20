<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;

interface AreaRepositoryInterface
{
    public function getAll(): Collection;
}
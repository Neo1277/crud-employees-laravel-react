<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;

interface AreaServiceInterface
{
    public function getAll(): Collection;
}
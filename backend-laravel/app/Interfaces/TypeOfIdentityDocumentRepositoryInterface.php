<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;

interface TypeOfIdentityDocumentRepositoryInterface
{
    public function getAll(): Collection;
}
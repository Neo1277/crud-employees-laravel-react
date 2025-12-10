<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

interface ClientRepositoryInterface
{
    public function getAll(array $filters);

    public function findOrFail(int $id): Model;

    public function store(array $data): Model;

    public function update(array $data, int $id): void;

    public function delete(int $id): void;
}
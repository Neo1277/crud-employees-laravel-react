<?php

namespace App\Repositories;

use App\Interfaces\CrudRepositoryInterface;
use App\Models\Client;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class ClientRepository implements CrudRepositoryInterface
{
    public function findAll(): Collection
    {
        return Client::all();
    }

    public function findOrFail(int $id): Model
    {
        return Client::query()
            ->findOrFail($id);
    }

    public function store(array $data): Model
    {
        return Client::query()
            ->create($data);
    }

    public function update(array $data, int $id): void
    {
        Client::query()
            ->findOrFail($id)
            ->update($data);
    }

    public function delete(int $id): void
    {
        $this->findOrFail($id)->delete();
    }
}
<?php

namespace App\Services;

use App\Interfaces\ClientServiceInterface;
use App\Repositories\ClientRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class ClientService implements ClientServiceInterface
{
    protected $clientRepository;

    public function __construct(ClientRepository $clientRepository)
    {
        $this->clientRepository = $clientRepository;
    }

    public function getFilteredClients(array $filters): Builder
    {
        return $this->clientRepository->filter($filters);
    }

    public function findOrFail(int $id): Model
    {
        return $this->clientRepository->findOrFail($id);
    }

    public function store(array $data): Model
    {
        return $this->clientRepository->store($data);
    }

    public function update(array $data, int $id): void
    {
        $this->clientRepository->update($data, $id);
    }

    public function delete(int $id): void
    {
        $this->clientRepository->delete($id);
    }
}
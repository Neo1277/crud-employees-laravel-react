<?php

namespace App\Services;

use App\Interfaces\ClientServiceInterface;
use App\Interfaces\ClientRepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class ClientService implements ClientServiceInterface
{
    protected ClientRepositoryInterface $clientRepository;

    public function __construct(ClientRepositoryInterface $clientRepository)
    {
        $this->clientRepository = $clientRepository;
    }

    public function getFilteredClients(array $filters)
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
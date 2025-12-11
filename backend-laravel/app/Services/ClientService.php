<?php

namespace App\Services;

use App\Interfaces\ClientServiceInterface;
use App\Interfaces\ClientRepositoryInterface;
use App\Interfaces\EmailGenerationInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class ClientService implements ClientServiceInterface
{
    protected ClientRepositoryInterface $clientRepository;
    protected EmailGenerationInterface $emailGenerationService;

    public function __construct(
        ClientRepositoryInterface $clientRepository,
        EmailGenerationInterface $emailGenerationService
        )
    {
        $this->clientRepository = $clientRepository;
        $this->emailGenerationService = $emailGenerationService;
    }

    public function getAll(array $filters)
    {
        return $this->clientRepository->getAll($filters);
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

    public function getNewEmail(string $first_last_name, string $first_name, string $country): string
    {
        $lastEmail = $this->clientRepository
            ->getLastEmailByFirstLastNameAndFirstName($first_last_name, $first_name);
        return $this->emailGenerationService
                    ->generateNewEmail($lastEmail, $first_last_name, $first_name, $country);
    }
}
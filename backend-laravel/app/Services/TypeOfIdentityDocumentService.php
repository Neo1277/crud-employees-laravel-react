<?php

namespace App\Services;

use App\Interfaces\TypeOfIdentityDocumentServiceInterface;
use App\Interfaces\TypeOfIdentityDocumentRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class TypeOfIdentityDocumentService implements TypeOfIdentityDocumentServiceInterface
{
    protected TypeOfIdentityDocumentRepositoryInterface $typeOfIdentityDocumentRepository;

    public function __construct(TypeOfIdentityDocumentRepositoryInterface $typeOfIdentityDocumentRepository)
    {
        $this->typeOfIdentityDocumentRepository = $typeOfIdentityDocumentRepository;
    }

    public function getAll(): Collection
    {
        return $this->typeOfIdentityDocumentRepository->getAll();
    }

}
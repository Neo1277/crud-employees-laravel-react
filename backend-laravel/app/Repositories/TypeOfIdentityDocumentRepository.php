<?php

namespace App\Repositories;

use App\Interfaces\TypeOfIdentityDocumentRepositoryInterface;
use App\Models\TypeOfIdentityDocument;
use Illuminate\Database\Eloquent\Collection;

class TypeOfIdentityDocumentRepository implements TypeOfIdentityDocumentRepositoryInterface
{
    protected TypeOfIdentityDocument $type_of_identity_document;

    public function __construct(TypeOfIdentityDocument $type_of_identity_document) // Injecting the type_of_identity_document model
    {
        $this->type_of_identity_document = $type_of_identity_document;
    }

    public function getAll(): Collection
    {
        return $this->type_of_identity_document->all();
    }
}
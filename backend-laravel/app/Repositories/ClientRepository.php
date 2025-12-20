<?php

namespace App\Repositories;

use App\Interfaces\ClientRepositoryInterface;
use App\Models\Client;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class ClientRepository implements ClientRepositoryInterface
{
    protected Client $client;

    public function __construct(Client $client) // Injecting the client model
    {
        $this->client = $client;
    }

    public function getAll(array $filters)
    {
        $query = $this->client->query();

        if (isset($filters['identity_document'])) {
            $query->where('identity_document', 'like', '%' . $filters['identity_document'] . '%');
        }

        if (isset($filters['first_last_name'])) {
            $query->where('first_last_name', 'like', '%' . $filters['first_last_name'] . '%');
        }

        if (isset($filters['second_last_name'])) {
            $query->where('second_last_name', 'like', '%' . $filters['second_last_name'] . '%');
        }

        if (isset($filters['first_name'])) {
            $query->where('first_name', 'like', '%' . $filters['first_name'] . '%');
        }

        if (isset($filters['other_names'])) {
            $query->where('other_names', 'like', '%' . $filters['other_names'] . '%');
        }

        if (isset($filters['email'])) {
            $query->where('email', 'like', '%' . $filters['email'] . '%');
        }

        if (isset($filters['country'])) {
            $query->where('country', 'like', '%' . $filters['country'] . '%');
        }

        if (isset($filters['status'])) {
            $query->where('status', 'like', '%' . $filters['status'] . '%');
        }
        
        if (isset($filters['type_of_identity_document'])) {
            $description = $filters['type_of_identity_document'];
            $query->whereHas('typeOfIdentityDocument.clients', function ($q) use ($description) {
                $q->where('description', 'like', '%' . $description . '%');
            });
        }
        
        if (isset($filters['area'])) {
            $name = $filters['area'];
            $query->whereHas('area.clients', function ($q) use ($name) {
                $q->where('name', 'like', '%' . $name . '%');
            });
        }

        return $query;
    }

    public function findOrFail(int $id): Model
    {
        return $this->client->query()
            ->findOrFail($id);
    }

    public function store(array $data): Model
    {
        return $this->client->query()
            ->create($data);
    }

    public function update(array $data, int $id): void
    {
        $this->client->query()
            ->findOrFail($id)
            ->update($data);
    }

    public function delete(int $id): void
    {
        $this->findOrFail($id)->delete();
    }

    public function getLastEmailByFirstLastNameAndFirstName(string $first_last_name, string $first_name)
    {
        return  $this->client->query()->where([
                                ['first_last_name', 'like', '%' . $first_last_name . '%'],
                                ['first_name', 'like', '%' . $first_name . '%'],
                            ])
                           ->orderByDesc('id')
                           ->select('email') // Select specific columns
                           ->first();
    }
}
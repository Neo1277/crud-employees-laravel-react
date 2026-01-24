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

        $likeFilters = [
            'identity_document',
            'first_last_name',
            'second_last_name',
            'first_name',
            'other_names',
            'email',
            'country',
            'status',
        ];

        foreach ($likeFilters as $field) {
            if (!empty($filters[$field])) {
                $query->where($field, 'like', '%' . $filters[$field] . '%');
            }
        }

        if (!empty($filters['type_of_identity_document'])) {
            $description = $filters['type_of_identity_document'];
            $query->whereHas('typeOfIdentityDocument', function ($q) use ($description) {
                $q->where('description', 'like', '%' . $description . '%');
            });
        }

        if (!empty($filters['area'])) {
            $name = $filters['area'];
            $query->whereHas('area', function ($q) use ($name) {
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
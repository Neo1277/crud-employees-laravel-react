<?php

namespace App\Repositories;

use App\Interfaces\CrudRepositoryInterface;
use App\Models\Client;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ClientRepository implements CrudRepositoryInterface
{
    public function findAll(Request $request): Builder
    {
        $query = Client::query();

        if ($request->has('identity_document')) {
            $query->where('identity_document', 'like', '%' . $request->identity_document . '%');
        }

        if ($request->has('first_last_name')) {
            $query->where('first_last_name', 'like', '%' . $request->first_last_name . '%');
        }

        if ($request->has('second_last_name')) {
            $query->where('second_last_name', 'like', '%' . $request->second_last_name . '%');
        }

        if ($request->has('first_name')) {
            $query->where('first_name', 'like', '%' . $request->first_name . '%');
        }

        if ($request->has('other_names')) {
            $query->where('other_names', 'like', '%' . $request->other_names . '%');
        }

        if ($request->has('email')) {
            $query->where('email', 'like', '%' . $request->email . '%');
        }

        if ($request->has('country')) {
            $query->where('country', 'like', '%' . $request->country . '%');
        }

        if ($request->has('status')) {
            $query->where('status', 'like', '%' . $request->status . '%');
        }
        
        if ($request->has('description')) {
            $description = $request->description;
            $query->whereHas('typeOfIdentityDocument.clients', function ($q) use ($description) {
                $q->where('description', 'like', '%' . $description . '%');
            });
        }
        
        if ($request->has('area')) {
            $name = $request->area;
            $query->whereHas('area.clients', function ($q) use ($name) {
                $q->where('name', 'like', '%' . $name . '%');
            });
        }

        return $query;
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
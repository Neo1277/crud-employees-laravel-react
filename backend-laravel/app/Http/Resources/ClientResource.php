<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'identity_document' => $this->identity_document,
            'first_last_name' => $this->first_last_name,
            'second_last_name' => $this->second_last_name,
            'first_name' => $this->first_name,
            'other_names' => $this->other_names,
            'email' => $this->email,
            'country' => $this->country,
            'date_of_entry' => $this->date_of_entry,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'type_of_identity_document_id' => $this->typeOfIdentityDocument->id,
            'type_of_identity_document_code' => $this->typeOfIdentityDocument->code,
            'type_of_identity_document_description' => $this->typeOfIdentityDocument->description,
            'area_id' => $this->area->id,
            'area' => $this->area->name,
        ];
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Client;
use App\Models\TypeOfIdentityDocument;
use App\Models\Area;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Client::factory()->count(10)->create(
            [
                'type_of_identity_document_id' => TypeOfIdentityDocument::factory()->create()->id,
                'area_id' => Area::factory()->create()->id
            ]
        );
    }
}

<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Client;
use App\Models\TypeOfIdentityDocument;
use App\Models\Area;

class ClientTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex(): void
    {
        Client::factory(5)->create(
            [
                'type_of_identity_document_id' => TypeOfIdentityDocument::factory()->create()->id,
                'area_id' => Area::factory()->create()->id
            ]
        );

        $response = $this->get('/api/clients');

        $response->assertStatus(200);

        $response->assertJsonStructure(
            [
                'data' => [
                    '*' => [
                        'id',
                        'first_last_name',
                        'second_last_name',
                        'first_name',
                        'other_names',
                    ]
                ]
            ]
        );

        $this->assertCount(5, $response->json('data'));
    }

    public function testStore(): void
    {
        $type_of_identity_document = TypeOfIdentityDocument::factory()->create();
        $area = Area::factory()->create();

        $currentDateString = date('Y-m-d H:i:s');
        
        $body = [
            'identity_document' => "16450360",
            'first_last_name' => "MENESES",
            'second_last_name' => "BEJARANO",
            'first_name' => "SULLY",
            'other_names' => "ANDREA",
            'email' => "andrea@gmail.com",
            'country' => "colombia",
            'date_of_entry' => $currentDateString,
            'status' => "Active",
            'type_of_identity_document_id' => $type_of_identity_document->id,
            'area_id' => $area->id,
        ];

        $response = $this->post('/api/clients', $body);

        $response->assertStatus(201);

        $response->assertJsonStructure(
            [
                'data' => [
                    'id',
                    'first_last_name',
                    'second_last_name',
                    'first_name',
                    'other_names',
                ]
            ]
        );

        $this->assertCount(1, Client::all());
    }
}

<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Client;
use App\Models\TypeOfIdentityDocument;
use App\Models\Area;
use Illuminate\Support\Facades\DB;

class ClientApiTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex(): void
    {
        $currentDatabase = DB::connection()->getDatabaseName();
        dump($currentDatabase);  // prints to console during tests
        
        Client::factory(5)->create(
            [
                'type_of_identity_document_id' => TypeOfIdentityDocument::factory()->create()->id,
                'area_id' => Area::factory()->create()->id
            ]
        );

        $response = $this->getJson('/api/clients');

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

    public function testIndexWithFilterAndPageNumber(): void
    {
        $client = Client::factory()->create(
            [
                'type_of_identity_document_id' => TypeOfIdentityDocument::factory()->create()->id,
                'area_id' => Area::factory()->create()->id
            ]
        );

        $page_number = 1;

        $response = $this->getJson("/api/clients?page={$page_number}&identity_document={$client->identity_document}");

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
            'country' => "co",
            'date_of_entry' => $currentDateString,
            'status' => "Active",
            'type_of_identity_document_id' => $type_of_identity_document->id,
            'area_id' => $area->id,
        ];

        $response = $this->postJson('/api/clients', $body);

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

    public function testStoreWithEmptyFields(): void
    {
        $response = $this->postJson('/api/clients', []);

        $response->assertStatus(422);

        $response->assertJsonStructure(
            [
                'message',
                'errors' => [
                    'identity_document',
                    'first_last_name',
                    'second_last_name',
                    'first_name',
                    'other_names',
                ]
            ]
        );
    }

    public function testStoreWithWrongFormat(): void
    {
        $type_of_identity_document = TypeOfIdentityDocument::factory()->create();
        $area = Area::factory()->create();

        $currentDateString = date('Y-m-d H:i:s');
        
        $body = [
            'identity_document' => "16450360",
            'first_last_name' => "meneses",
            'second_last_name' => "BEJARANO",
            'first_name' => "SULLY",
            'other_names' => "ANDREA",
            'email' => "andrea@gmail.com",
            'country' => "co",
            'date_of_entry' => $currentDateString,
            'status' => "Active",
            'type_of_identity_document_id' => $type_of_identity_document->id,
            'area_id' => $area->id,
        ];

        $response = $this->postJson('/api/clients', $body);

        $response->assertStatus(422);

        $response->assertJsonStructure(
            [
                'message',
                'errors' => [
                    'first_last_name',
                ]
            ]
        );
    }

    public function testStoreWithSameIdentityDocumentAndTypeOfIdentityDocumentAndSameEmail(): void
    {
        $type_of_identity_document = TypeOfIdentityDocument::factory()->create();
        $area = Area::factory()->create();

        $client = Client::factory()->create(
            [
                'type_of_identity_document_id' => $type_of_identity_document->id,
                'area_id' => $area->id
            ]
        );

        $currentDateString = date('Y-m-d H:i:s');
        
        $body = [
            'identity_document' => $client->identity_document,
            'first_last_name' => "MENESES",
            'second_last_name' => "BEJARANO",
            'first_name' => "SULLY",
            'other_names' => "ANDREA",
            'email' => $client->email,
            'country' => "co",
            'date_of_entry' => $currentDateString,
            'status' => "Active",
            'type_of_identity_document_id' => $type_of_identity_document->id,
            'area_id' => $area->id,
        ];

        $response = $this->postJson('/api/clients', $body);

        $response->assertStatus(422);

        $response->assertJsonStructure(
            [
                'message',
                'errors' => [
                    'identity_document',
                    'email',
                ]
            ]
        );
    }

    public function testShowSpecificClient(): void
    {
        $client = Client::factory()->create(
            [
                'type_of_identity_document_id' => TypeOfIdentityDocument::factory()->create()->id,
                'area_id' => Area::factory()->create()->id
            ]
        );
        $response = $this->getJson("/api/clients/{$client->id}");

        $response->assertStatus(200);

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
    }

    public function testUpdate(): void
    {
        $client = Client::factory()->create(
            [
                'type_of_identity_document_id' => TypeOfIdentityDocument::factory()->create()->id,
                'area_id' => Area::factory()->create()->id
            ]
        );

        $type_of_identity_document = TypeOfIdentityDocument::factory()->create();
        $area = Area::factory()->create();

        $currentDateString = date('Y-m-d H:i:s');
        
        $updateBody = [
            'identity_document' => "16450360",
            'first_last_name' => "MENESES",
            'second_last_name' => "BEJARANO",
            'first_name' => "SULLY",
            'other_names' => "ANDREA",
            'email' => "andrea@gmail.com",
            'country' => "co",
            'date_of_entry' => $currentDateString,
            'status' => "Active",
            'type_of_identity_document_id' => $type_of_identity_document->id,
            'area_id' => $area->id,
        ];

        $response = $this->putJson("/api/clients/{$client->id}", $updateBody);

        $response->assertStatus(204);

        $this->assertDatabaseHas('clients', [
            'id' => $client->id,
            'identity_document' => '16450360',
            'first_last_name' => 'MENESES',
        ]);
    }


    public function testUpdateAllowToChangeToSameEmailAndSameIdentityDocumentAndTypeOfIdentityDocument(): void
    {
        $type_of_identity_document = TypeOfIdentityDocument::factory()->create();
        $area = Area::factory()->create();

        $client = Client::factory()->create(
            [
                'type_of_identity_document_id' => $type_of_identity_document->id,
                'area_id' => $area->id
            ]
        );

        $currentDateString = date('Y-m-d H:i:s');
        
        $updateBody = [
            'identity_document' => $client->identity_document,
            'first_last_name' => "MENESES",
            'second_last_name' => "BEJARANO",
            'first_name' => "SULLY",
            'other_names' => "ANDREA",
            'email' => $client->email,
            'country' => "co",
            'date_of_entry' => $currentDateString,
            'status' => "Active",
            'type_of_identity_document_id' => $type_of_identity_document->id,
            'area_id' => $area->id,
        ];

        $response = $this->putJson("/api/clients/{$client->id}", $updateBody);

        $response->assertStatus(204);

        $this->assertDatabaseHas('clients', [
            'id' => $client->id,
            'identity_document' => $client->identity_document
        ]);
    }
    
    public function testUpdateWithEmptyFields(): void
    {
        $client = Client::factory()->create(
            [
                'type_of_identity_document_id' => TypeOfIdentityDocument::factory()->create()->id,
                'area_id' => Area::factory()->create()->id
            ]
        );

        $currentDateString = date('Y-m-d H:i:s');

        $response = $this->putJson("/api/clients/{$client->id}", []);

        $response->assertStatus(422);

        $response->assertJsonStructure(
            [
                'message',
                'errors' => [
                    'identity_document',
                    'first_last_name',
                    'second_last_name',
                    'first_name',
                    'other_names',
                ]
            ]
        );
    }

    public function testUpdateWithWrongFormat(): void
    {
        $client = Client::factory()->create(
            [
                'type_of_identity_document_id' => TypeOfIdentityDocument::factory()->create()->id,
                'area_id' => Area::factory()->create()->id
            ]
        );

        $type_of_identity_document = TypeOfIdentityDocument::factory()->create();
        $area = Area::factory()->create();

        $currentDateString = date('Y-m-d H:i:s');
        
        $updateBody = [
            'identity_document' => "16450360",
            'first_last_name' => "meneses",
            'second_last_name' => "BEJARANO",
            'first_name' => "SULLY",
            'other_names' => "ANDREA",
            'email' => "andrea@gmail.com",
            'country' => "co",
            'date_of_entry' => $currentDateString,
            'status' => "Active",
            'type_of_identity_document_id' => $type_of_identity_document->id,
            'area_id' => $area->id,
        ];

        $response = $this->putJson("/api/clients/{$client->id}", $updateBody);

        $response->assertStatus(422);

        $response->assertJsonStructure(
            [
                'message',
                'errors' => [
                    'first_last_name',
                ]
            ]
        );
    }

    public function testUpdateWithSameIdentityDocumentAndTypeOfIdentityDocumentAndSameEmail(): void
    {
        $type_of_identity_document = TypeOfIdentityDocument::factory()->create();
        $area = Area::factory()->create();

        $client = Client::factory()->create(
            [
                'type_of_identity_document_id' => $type_of_identity_document->id,
                'area_id' => $area->id
            ]
        );

        $client2 = Client::factory()->create(
            [
                'type_of_identity_document_id' => $type_of_identity_document->id,
                'area_id' => $area->id
            ]
        );

        $currentDateString = date('Y-m-d H:i:s');
        
        $updateBody = [
            'identity_document' => $client->identity_document,
            'first_last_name' => "MENESES",
            'second_last_name' => "BEJARANO",
            'first_name' => "SULLY",
            'other_names' => "ANDREA",
            'email' => $client->email,
            'country' => "co",
            'date_of_entry' => $currentDateString,
            'status' => "Active",
            'type_of_identity_document_id' => $type_of_identity_document->id,
            'area_id' => $area->id,
        ];

        $response = $this->putJson("/api/clients/{$client2->id}", $updateBody);

        $response->assertStatus(422);

        $response->assertJsonStructure(
            [
                'message',
                'errors' => [
                    'identity_document',
                    'email',
                ]
            ]
        );
    }

    public function testDestroy(): void
    {
        $client = Client::factory()->create(
            [
                'type_of_identity_document_id' => TypeOfIdentityDocument::factory()->create()->id,
                'area_id' => Area::factory()->create()->id
            ]
        );

        $response = $this->deleteJson("/api/clients/{$client->id}");

        $response->assertStatus(204);

        $this->assertCount(0, Client::all());

        $this->assertDatabaseMissing('clients', ['id' => $client->id]);
    }

    public function testGetNewEmail(): void
    {
        $first_name = "SULLY";
        $first_last_name = "MENESES";
        $country = "us";

        $get_url = "/api/clients/get-new-email?first_name={$first_name}"
                    ."&first_last_name={$first_last_name}"
                    ."&country={$country}";

        $response = $this->getJson($get_url);

        $response->assertStatus(200);

        $response->assertJsonStructure(
            [
                'new_email'
            ]
        );
    }

    public function testGetNewEmailWithAClientThatAlreadyExists(): void
    {
        $client = Client::factory()->create(
            [
                'type_of_identity_document_id' => TypeOfIdentityDocument::factory()->create()->id,
                'area_id' => Area::factory()->create()->id
            ]
        );
        $get_url = "/api/clients/get-new-email?first_name={$client->first_name}"
                    ."&first_last_name={$client->first_last_name}".
                    "&country={$client->country}";

        $response = $this->getJson($get_url);
        
        $response->assertStatus(200);

        $response->assertJsonStructure(
            [
                'new_email'
            ]
        );
    }
}

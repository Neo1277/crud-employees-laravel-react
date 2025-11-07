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
}

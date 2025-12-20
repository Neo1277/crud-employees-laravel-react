<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\TypeOfIdentityDocument;

class TypeOfIdentityDocumentApiTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex(): void
    {
        $type_of_identity_document = TypeOfIdentityDocument::factory(5)->create();

        $response = $this->getJson('/api/types-of-identity-document');

        $response->assertStatus(200);

        $response->assertJsonStructure(
            [
                'data' => [
                    '*' => [
                        'id',
                        'code',
                        'description',
                    ]
                ]
            ]
        );

        $this->assertCount(5, $response->json('data'));
    }
}

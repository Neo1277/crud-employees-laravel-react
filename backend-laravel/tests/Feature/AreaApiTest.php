<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Area;

class AreaApiTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex(): void
    {
        $areas = Area::factory(5)->create();

        $response = $this->getJson('/api/areas');

        $response->assertStatus(200);

        $response->assertJsonStructure(
            [
                'data' => [
                    '*' => [
                        'id',
                        'name',
                    ]
                ]
            ]
        );

        $this->assertCount(5, $response->json('data'));
    }
}

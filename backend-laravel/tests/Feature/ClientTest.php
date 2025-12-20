<?php

namespace Tests\Feature;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Client;
use App\Models\TypeOfIdentityDocument;
use App\Models\Area;
use Illuminate\Support\Carbon;

class ClientTest extends TestCase
{
    use RefreshDatabase;

    public function testBelongstoATypeOfIdentityDocumentAndArea(): void
    {
        $typeOfIdentityDocument = TypeOfIdentityDocument::factory()->create();
        $area = Area::factory()->create();

        $client = Client::factory()->create(
            [
                'type_of_identity_document_id' => $typeOfIdentityDocument->id,
                'area_id' => $area->id
            ]
        );
        
        $this->assertInstanceOf(TypeOfIdentityDocument::class, $client->typeOfIdentityDocument);
        $this->assertInstanceOf(Area::class, $client->area);
        $this->assertSame($client->typeOfIdentityDocument->id, $typeOfIdentityDocument->id);
        $this->assertSame($client->area->id, $area->id);
    }

    public function testHasCorrectFillableAttributes(): void
    {
        $client = new Client();
        
        $expectedFillable = [
            'identity_document',
            'first_last_name',
            'second_last_name',
            'first_name',
            'other_names',
            'email',
            'country',
            'date_of_entry',
            'status',
            'type_of_identity_document_id',
            'area_id',
        ];

        $this->assertEqualsCanonicalizing($expectedFillable, $client->getFillable());
    }

    public function testCastsDateOfEntryToDate(): void
    {
        $currentDateString = date('Y-m-d H:i:s');

        $client = Client::factory()->create(
            [
                'date_of_entry' => $currentDateString,
                'type_of_identity_document_id' => TypeOfIdentityDocument::factory()->create()->id,
                'area_id' => Area::factory()->create()->id
            ]
        );
        
        $this->assertInstanceOf(\Illuminate\Support\Carbon::class, Carbon::parse($client->date_of_entry));
    }
}

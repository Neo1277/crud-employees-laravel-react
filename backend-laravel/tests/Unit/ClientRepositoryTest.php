<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use Mockery;
use App\Models\Client;
use App\Repositories\ClientRepository;
//use App\Models\Client;
use App\Models\TypeOfIdentityDocument;
use App\Models\Area;

class ClientRepositoryTest extends TestCase
{
    protected Client $clientMock;
    protected ClientRepository $clientRepository;

    public function setUp(): void
    {
        parent::setUp();
        $this->clientMock = Mockery::mock(Client::class);
        $this->clientRepository = new ClientRepository($this->clientMock);
    }
 
    public function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
    
    public function testGetFilterClients()
    {
        $clientId = 1;
        $typeOfIdentityDocumentId = 1;
        $areaId = 1;
        $currentDateString = date('Y-m-d H:i:s');

        $expectedClient = Client::factory()->create(
            ['id' => $clientId, 
            'identity_document' => 'A123465',
            'first_last_name' => 'Brando',
            'second_last_name' => 'Mendez',
            'first_name' => 'Carl',
            'other_names' => 'James',
            'email' => 'carl@gmail.com',
            'country' => 'united_states',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => TypeOfIdentityDocument::factory()->create()->id,
            'area_id' => Area::factory()->create()->id]
        );

        $this->clientMock->shouldReceive('query')
                        ->andReturn($expectedClient);

        $filters = [];

        $foundClient = $this->clientRepository->filter($filters);

        $this->assertEquals($expectedClient, $foundClient);
    }

    /*
    public function testStoreClient()
    {
        $clientId = 1;
        $currentDateString = date('Y-m-d H:i:s');

        $clientToSave = new Client(
            ['id' => $clientId, 
            'identity_document' => 'A123465',
            'first_last_name' => 'Brando',
            'second_last_name' => 'Mendez',
            'first_name' => 'Carl',
            'other_names' => 'James',
            'email' => 'carl@gmail.com',
            'country' => 'united_states',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => TypeOfIdentityDocument::factory()->create()->id,
            'area_id' => Area::factory()->create()->id]
        );

        $clientData = [
            'identity_document' => 'A123465',
            'first_last_name' => 'Brando',
            'second_last_name' => 'Mendez',
            'first_name' => 'Carl',
            'other_names' => 'James',
            'email' => 'carl@gmail.com',
            'country' => 'united_states',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => TypeOfIdentityDocument::factory()->create()->id,
            'area_id' => Area::factory()->create()->id
        ];

        $this->clientMock->shouldReceive('create')
                        ->once()
                        //->with($clientData)
                        ->andReturnUsing(function ($client) {
                            // Simulate saving and returning the client
                            return $client;
                        });

        $savedClient = $this->clientRepository->store($clientData);

        $this->assertEquals($clientToSave, $savedClient);
    }*/
}

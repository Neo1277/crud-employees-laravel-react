<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Mockery;
use Tests\TestCase;
use App\Models\Client;
use App\Models\TypeOfIdentityDocument;
use App\Models\Area;
use App\Repositories\ClientRepository;

class ClientRepositoryTest extends TestCase
{
    protected $clientMock;
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

    public function testGetAll(): void
    {
        $currentDateString = date('Y-m-d H:i:s');

        $typeOfIdentityDocument = new TypeOfIdentityDocument([
            'id' => 1, 
            'code' => 'A123465',
            'description' => 'Brando',
        ]);

        $area = new Area([
            'id' => 1, 
            'name' => 'A123465',
        ]);

        $clientObject = new Client([
            'id' => 1, 
            'identity_document' => 'A123465',
            'first_last_name' => 'Brando',
            'second_last_name' => 'Mendez',
            'first_name' => 'Carl',
            'other_names' => 'James',
            'email' => 'carl@gmail.com',
            'country' => 'us',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => $typeOfIdentityDocument->id,
            'area_id' => $area->id
        ]);
        
        $this->clientMock->shouldReceive('query')->andReturn($clientObject);
        
        $this->assertEquals($clientObject, $this->clientRepository->getAll([]));
    }
    
    public function testGetAllWithArguments(): void
    {
        $currentDateString = date('Y-m-d H:i:s');

        $typeOfIdentityDocument = new TypeOfIdentityDocument([
            'id' => 1, 
            'code' => 'A123465',
            'description' => 'Brando',
        ]);

        $area = new Area([
            'id' => 1, 
            'name' => 'A123465',
        ]);

        $clientObject = new Client([
            'id' => 1, 
            'identity_document' => 'A123465',
            'first_last_name' => 'Brando',
            'second_last_name' => 'Mendez',
            'first_name' => 'Carl',
            'other_names' => 'James',
            'email' => 'carl@gmail.com',
            'country' => 'us',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => $typeOfIdentityDocument->id,
            'area_id' => $area->id
        ]);

        $filters = [
            "identity_document" => "A123465"
        ];
        
        $this->clientMock->shouldReceive('query')
                            ->andReturn($clientObject);
        
        $this->clientMock->shouldReceive('where')
                            ->with('identity_document', 'like', '%A123465%')
                            ->andReturn($clientObject);
        
        $this->assertEquals($clientObject, $this->clientRepository->getAll($filters));
    }

    public function testGetAllWithArgumentsWhereHas(): void
    {
        $currentDateString = date('Y-m-d H:i:s');

        $typeOfIdentityDocument = new TypeOfIdentityDocument([
            'id' => 1, 
            'code' => 'A123465',
            'description' => 'Brando',
        ]);

        $area = new Area([
            'id' => 1, 
            'name' => 'A123465',
        ]);

        $clientObject = new Client([
            'id' => 1, 
            'identity_document' => 'A123465',
            'first_last_name' => 'Brando',
            'second_last_name' => 'Mendez',
            'first_name' => 'Carl',
            'other_names' => 'James',
            'email' => 'carl@gmail.com',
            'country' => 'us',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => $typeOfIdentityDocument->id,
            'area_id' => $area->id
        ]);

        $filters = [
            "area" => $area->name
        ];
        
        $this->clientMock->shouldReceive('query')
                            ->andReturn($clientObject);
        
        $this->clientMock->shouldReceive('whereHas')
                            ->with('area', 'like', '%'.$area->name.'%')
                            ->andReturn($clientObject);
        
        $this->assertEquals($clientObject, $this->clientRepository->getAll($filters));
    }

    public function testFindOrFail(): void
    {
        $currentDateString = date('Y-m-d H:i:s');

        $typeOfIdentityDocument = new TypeOfIdentityDocument([
            'id' => 1, 
            'code' => 'A123465',
            'description' => 'Brando',
        ]);

        $area = new Area([
            'id' => 1, 
            'name' => 'A123465',
        ]);

        $clientObject = new Client([
            'id' => 1, 
            'identity_document' => 'A123465',
            'first_last_name' => 'Brando',
            'second_last_name' => 'Mendez',
            'first_name' => 'Carl',
            'other_names' => 'James',
            'email' => 'carl@gmail.com',
            'country' => 'us',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => $typeOfIdentityDocument->id,
            'area_id' => $area->id
        ]);
        
        $this->clientMock->shouldReceive('query->findOrFail')
                                ->with(1)
                                ->andReturn($clientObject);

        $this->assertEquals($clientObject, $this->clientRepository->findOrFail(1));
    }

    public function testStore(): void
    {
        $currentDateString = date('Y-m-d H:i:s');

        $clientData = [
            'id' => 1, 
            'identity_document' => 'A123465',
            'first_last_name' => 'Brando',
            'second_last_name' => 'Mendez',
            'first_name' => 'Carl',
            'other_names' => 'James',
            'email' => 'carl@gmail.com',
            'country' => 'us',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => 1,
            'area_id' => 1
        ];
        
        $this->clientMock->shouldReceive('query->create')
                            ->with($clientData)
                            ->andReturn($this->clientMock);

        $this->assertEquals($this->clientMock, $this->clientRepository->store($clientData));
    }

    public function testUpdate(): void
    {
        $currentDateString = date('Y-m-d H:i:s');

        $typeOfIdentityDocument = new TypeOfIdentityDocument([
            'id' => 1, 
            'code' => 'A123465',
            'description' => 'Brando',
        ]);

        $area = new Area([
            'id' => 1, 
            'name' => 'A123465',
        ]);

        $clientObject = new Client([
            'id' => 1, 
            'identity_document' => 'A123465',
            'first_last_name' => 'Brando',
            'second_last_name' => 'Mendez',
            'first_name' => 'Carl',
            'other_names' => 'James',
            'email' => 'carl@gmail.com',
            'country' => 'us',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => $typeOfIdentityDocument->id,
            'area_id' => $area->id
        ]);

        $clientData = [
            'identity_document' => 'A123465',
            'first_last_name' => 'Brando',
            'second_last_name' => 'Mendez',
            'first_name' => 'Carl',
            'other_names' => 'James',
            'email' => 'carl@gmail.com',
            'country' => 'us',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => $typeOfIdentityDocument->id,
            'area_id' => $area->id
        ];
        
        $this->clientMock->shouldReceive('query->findOrFail->update')
                                ->with(1)
                                ->with($clientData)
                                ->andReturn(null);
        
        $this->assertNull($this->clientRepository->update($clientData, 1));
    }
    
    public function testDelete(): void
    {
        $currentDateString = date('Y-m-d H:i:s');

        $typeOfIdentityDocument = new TypeOfIdentityDocument([
            'id' => 1, 
            'code' => 'A123465',
            'description' => 'Brando',
        ]);

        $area = new Area([
            'id' => 1, 
            'name' => 'A123465',
        ]);

        $clientObject = new Client([
            'id' => 1, 
            'identity_document' => 'A123465',
            'first_last_name' => 'Brando',
            'second_last_name' => 'Mendez',
            'first_name' => 'Carl',
            'other_names' => 'James',
            'email' => 'carl@gmail.com',
            'country' => 'us',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => $typeOfIdentityDocument->id,
            'area_id' => $area->id
        ]);

        $this->clientMock->shouldReceive('query->findOrFail')
                                ->with(1)
                                ->andReturn($clientObject)
                                ->shouldReceive('delete')
                                ->andReturn(null);

        $this->assertNull($this->clientRepository->delete(1));
    }
    
    public function testGetLastEmailByFirstLastNameAndFirstName(): void
    {
        $currentDateString = date('Y-m-d H:i:s');
        
        $typeOfIdentityDocument = new TypeOfIdentityDocument([
            'id' => 1, 
            'code' => 'A123465',
            'description' => 'Brando',
        ]);

        $area = new Area([
            'id' => 1, 
            'name' => 'A123465',
        ]);

        $clientObject = new Client([
            'id' => 1, 
            'identity_document' => 'A123465',
            'first_last_name' => 'Brando',
            'second_last_name' => 'Mendez',
            'first_name' => 'Carl',
            'other_names' => 'James',
            'email' => 'carl@gmail.com',
            'country' => 'us',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => $typeOfIdentityDocument->id,
            'area_id' => $area->id
        ]);

        $filters = [
            "identity_document" => "A123465"
        ];
        /*
        $client = Client::factory()->make(
            [
                'type_of_identity_document_id' => TypeOfIdentityDocument::factory()->make()->id,
                'area_id' => Area::factory()->make()->id
            ]
        );*/
        
        $this->clientMock->shouldReceive('query')
                            ->andReturnSelf()
                            ->shouldReceive('where')
                            ->with([
                                ['first_last_name', 'like', '%' . $clientObject->first_last_name . '%'],
                                ['first_name', 'like', '%' . $clientObject->first_name . '%'],
                            ])
                            ->andReturnSelf()
                            ->shouldReceive('orderByDesc')
                            ->with('id')
                            ->andReturnSelf()
                            ->shouldReceive('select')
                            ->with('email')
                            ->andReturnSelf()
                            ->shouldReceive('first')
                            ->andReturn($clientObject);
        
        $result = $this->clientRepository->getLastEmailByFirstLastNameAndFirstName(
                                                $clientObject->first_last_name, 
                                                $clientObject->first_name
        );

        $this->assertEquals($clientObject->email, $result->email);
    }
}

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
    public function testFilter(): void
    {
        $client = Mockery::mock(Client::class);

        $repository = new ClientRepository($client);
        
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
            'country' => 'united_states',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => $typeOfIdentityDocument->id,
            'area_id' => $area->id
        ]);
        
        // now, if a developer changes the eloquent method calls, this will fail.
        $client->shouldReceive('query')->andReturn($clientObject);
        
        $this->assertEquals($clientObject, $repository->filter([]));
    }

    public function testFindOrFail(): void
    {
        $client = Mockery::mock(Client::class);

        $repository = new ClientRepository($client);
        
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
            'country' => 'united_states',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => $typeOfIdentityDocument->id,
            'area_id' => $area->id
        ]);
        
        // now, if a developer changes the eloquent method calls, this will fail.
        $client->shouldReceive('query->findOrFail')->with(1)->andReturn($clientObject);

        $this->assertEquals($clientObject, $repository->findOrFail(1));
    }

    public function testStore(): void
    {
        $client = Mockery::mock(Client::class);

        $repository = new ClientRepository($client);
        
        $currentDateString = date('Y-m-d H:i:s');

        $clientData = [
            'id' => 1, 
            'identity_document' => 'A123465',
            'first_last_name' => 'Brando',
            'second_last_name' => 'Mendez',
            'first_name' => 'Carl',
            'other_names' => 'James',
            'email' => 'carl@gmail.com',
            'country' => 'united_states',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => 1,
            'area_id' => 1
        ];
        
        // now, if a developer changes the eloquent method calls, this will fail.
        $client->shouldReceive('query->create')->with($clientData)->andReturn($client);

        $this->assertEquals($client, $repository->store($clientData));
    }

    public function testUpdate(): void
    {
        $client = Mockery::mock(Client::class);

        $repository = new ClientRepository($client);
        
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
            'country' => 'united_states',
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
            'country' => 'united_states',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => $typeOfIdentityDocument->id,
            'area_id' => $area->id
        ];
        
        // now, if a developer changes the eloquent method calls, this will fail.
        $client->shouldReceive('query->findOrFail->update')
                                ->with(1)
                                ->with($clientData)
                                ->andReturn(null);
        
        $this->assertNull($repository->update($clientData, 1));
    }
    /*
    public function testDestroy(): void
    {
        $client = Mockery::mock(Client::class);

        $repository = new ClientRepository($client);
        
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
            'country' => 'united_states',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => $typeOfIdentityDocument->id,
            'area_id' => $area->id
        ]);

        // now, if a developer changes the eloquent method calls, this will fail.
        $client->shouldReceive('query->findOrFail->delete')
                                ->with(1)
                                ->andReturn(null);
        
        $this->assertNull($repository->delete(1));
    }*/
}

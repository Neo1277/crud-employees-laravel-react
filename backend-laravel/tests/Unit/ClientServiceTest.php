<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use Mockery;
use App\Interfaces\ClientRepositoryInterface;
use App\Interfaces\EmailGenerationInterface;
use App\Models\Client;
use App\Models\TypeOfIdentityDocument;
use App\Models\Area;
use App\Services\ClientService;

class ClientServiceTest extends TestCase
{
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

        $client = new Client([
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
            'identity_document' => 'A123465'
        ];

        // Create a mock for the ClientRepositoryInterface
        $clientRepositoryMock = Mockery::mock(ClientRepositoryInterface::class);
        $clientRepositoryMock->shouldReceive('getAll')
                            ->with($filters)
                           ->andReturn($client);

        // Create a mock for the EmailGenerationInterface
        $emailGenerationServiceMock = Mockery::mock(EmailGenerationInterface::class);
        // Inject the mock into the ClientService
        $clientService = new ClientService($clientRepositoryMock, $emailGenerationServiceMock);

        $result = $clientService->getAll($filters);

        $this->assertEquals($client->first_last_name, $result->first_last_name);
        $this->assertEquals($client->email, $result->email);
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
        
        $client = new Client([
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

        // Create a mock for the ClientRepositoryInterface
        $clientRepositoryMock = Mockery::mock(ClientRepositoryInterface::class);
        $clientRepositoryMock->shouldReceive('findOrFail')
                            ->with(1)
                           ->andReturn($client);

        // Create a mock for the EmailGenerationInterface
        $emailGenerationServiceMock = Mockery::mock(EmailGenerationInterface::class);
        // Inject the mock into the ClientService
        $clientService = new ClientService($clientRepositoryMock, $emailGenerationServiceMock);

        $result = $clientService->findOrFail(1);

        $this->assertEquals($client->first_last_name, $result->first_last_name);
        $this->assertEquals($client->email, $result->email);
    }

    public function testStore(): void
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
            'type_of_identity_document_id' => $typeOfIdentityDocument->id,
            'area_id' => $area->id];

        $client = new Client($clientData);

        // Create a mock for the ClientRepositoryInterface
        $clientRepositoryMock = Mockery::mock(ClientRepositoryInterface::class);
        $clientRepositoryMock->shouldReceive('store')
                            ->with($clientData)
                           ->andReturn($client);

        // Create a mock for the EmailGenerationInterface
        $emailGenerationServiceMock = Mockery::mock(EmailGenerationInterface::class);
        // Inject the mock into the ClientService
        $clientService = new ClientService($clientRepositoryMock, $emailGenerationServiceMock);

        $result = $clientService->store($clientData);

        $this->assertEquals($client->first_last_name, $result->first_last_name);
        $this->assertEquals($client->email, $result->email);
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
            'type_of_identity_document_id' => $typeOfIdentityDocument->id,
            'area_id' => $area->id];

        $client = new Client($clientData);

        // Create a mock for the ClientRepositoryInterface
        $clientRepositoryMock = Mockery::mock(ClientRepositoryInterface::class);
        $clientRepositoryMock->shouldReceive('update')
                            ->with($clientData, 1)
                            ->andReturn(null);

        // Create a mock for the EmailGenerationInterface
        $emailGenerationServiceMock = Mockery::mock(EmailGenerationInterface::class);
        // Inject the mock into the ClientService
        $clientService = new ClientService($clientRepositoryMock, $emailGenerationServiceMock);

        $result = $clientService->update($clientData, 1);

        $this->assertNull($result);
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
            'type_of_identity_document_id' => $typeOfIdentityDocument->id,
            'area_id' => $area->id];

        $client = new Client($clientData);

        // Create a mock for the ClientRepositoryInterface
        $clientRepositoryMock = Mockery::mock(ClientRepositoryInterface::class);
        $clientRepositoryMock->shouldReceive('delete')
                            ->with(1)
                            ->andReturn(null);

        // Create a mock for the EmailGenerationInterface
        $emailGenerationServiceMock = Mockery::mock(EmailGenerationInterface::class);
        // Inject the mock into the ClientService
        $clientService = new ClientService($clientRepositoryMock, $emailGenerationServiceMock);

        $result = $clientService->delete(1);
        
        $this->assertNull($result);
    }

    public function testGetNewEmail(): void
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

        $clientData = [
            'id' => 1, 
            'identity_document' => 'A123465',
            'first_last_name' => 'Brando',
            'second_last_name' => 'Mendez',
            'first_name' => 'Carl',
            'other_names' => 'James',
            'email' => 'carl.brando@example.com.us',
            'country' => 'us',
            'date_of_entry' => $currentDateString,
            'status' => 'Active',
            'type_of_identity_document_id' => $typeOfIdentityDocument->id,
            'area_id' => $area->id];

        $client = new Client($clientData);

        // Create a mock for the ClientRepositoryInterface
        $clientRepositoryMock = Mockery::mock(ClientRepositoryInterface::class);
        $clientRepositoryMock->shouldReceive('getLastEmailByFirstLastNameAndFirstName')
                            ->with($clientData['first_last_name'], $clientData['first_name'])
                            ->andReturn(null);
        
        $newEmail = "carl.brando@example.com.us";
        // Create a mock for the EmailGenerationInterface
        $emailGenerationServiceMock = Mockery::mock(EmailGenerationInterface::class);
        $emailGenerationServiceMock->shouldReceive('generateNewEmail')
                            ->with(
                                null, 
                                $clientData['first_last_name'],
                                $clientData['first_name'],
                                $clientData['country']
                            )
                            ->andReturn($newEmail);
        // Inject the mock into the ClientService
        $clientService = new ClientService($clientRepositoryMock, $emailGenerationServiceMock);

        $result = $clientService->getNewEmail(
            $clientData['first_last_name'], 
            $clientData['first_name'], 
            $clientData['country']
        );
        
        $this->assertEquals($client->email, $result);
    }
}

<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\EmailGenerationService;

class EmailGenerationServiceTest extends TestCase
{
    protected EmailGenerationService $emailGenerationService;

    public function setUp(): void
    {
        parent::setUp();
        $this->emailGenerationService = new EmailGenerationService();
    }

    public function tearDown(): void
    {
        parent::tearDown();
    }

    public function testGenerateNewEmailThatAlreadyExists(): void
    {
        $result = $this->emailGenerationService->generateNewEmail(
            "sully.meneses@example.com.co",
            "MENESES",
            "SULLY",
            "co"
        );
        $this->assertEquals("sully.meneses.1@example.com.co", $result);
    }

    public function testGenerateNewEmailThatDoesNotExists(): void
    {
        $result = $this->emailGenerationService->generateNewEmail(
            null,
            "MENESES",
            "SULLY",
            "co"
        );
        $this->assertEquals("sully.meneses@example.com.co", $result);
    }

    public function testExtractIdWithAnEmailThatHasOneRegister(): void
    {
        $result = $this->emailGenerationService->extractId("sully.meneses@example.com.co");
        $this->assertEquals(null, $result);
    }

    public function testExtractIdWithAnEmailThatHasMoreThanOneRegister(): void
    {
        $result = $this->emailGenerationService->extractId("sully.meneses.1@example.com.co");
        $this->assertEquals("1", $result);
    }

    public function testGenerateNewIdWithNullParameter(): void
    {
        $result = $this->emailGenerationService->generateNewId(null);
        $this->assertEquals(".1", $result);
    }

    public function testGenerateNewIdWithIdParameterOne(): void
    {
        $result = $this->emailGenerationService->generateNewId("1");
        $this->assertEquals(".2", $result);
    }
}

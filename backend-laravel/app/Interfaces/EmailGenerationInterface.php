<?php

namespace App\Interfaces;

interface EmailGenerationInterface
{
    public function generateNewEmail(
        ?string $lastEmail, 
        string $first_last_name, 
        string $first_name, 
        string $country
    ): string;

    public function extractId($last_email): string | null;

    public function generateNewId($last_id): string;
}
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

    public function generateNewId(string $last_email): string;
}
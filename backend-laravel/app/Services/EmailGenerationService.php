<?php

namespace App\Services;
use App\Interfaces\EmailGenerationInterface;

class EmailGenerationService implements EmailGenerationInterface
{
    protected const DOMAIN = "example.com";

    public function generateNewEmail(
        ?string $last_email, 
        string $first_last_name, 
        string $first_name, 
        string $country
        ): string
    {
        $new_email = strtolower($first_name)."."
                    .strtolower($first_last_name);

        if($last_email){
            $last_id = $this->extractId($last_email);
            $newId = $this->generateNewId($last_id);
            $new_email .= $newId;
        }

        $new_email .= "@".self::DOMAIN.".".$country;

        return $new_email;
    }

    public function extractId($last_email): string | null 
    {        
        /**
         * If there is already exists an email or more with the same name 
         * and last name extract id and if there is only one register return
         * null
         */
        $extract_id = explode("@", $last_email);
        $extract_id = explode(".", $extract_id[0]);
        return $extract_id[2] ?? null;
    }

    public function generateNewId($last_id): string
    {
        $new_id = $last_id + 1;
        $new_id = '.'.$new_id;

        return $new_id;
    }

}
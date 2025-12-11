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
            $newId = $this->generateNewId($last_email);
            $new_email .= $newId;
        }

        $new_email .= "@".self::DOMAIN.".".$country;

        return $new_email;
    }

    public function generateNewId($last_email): string{
        /**
         * If there is already exists an email or more with the same name 
         * and last name extract id and if it already exists increment it
         * to generate an id for the new email address
         */
        $extract_id = explode("@", $last_email);
        $extract_id = explode(".", $extract_id[0]);

        if (array_key_exists(2, $extract_id)) {
            $new_id = (int)$extract_id[2] + 1;
            $new_id = '.'.$new_id;
        }else{
            $new_id = 1;
            $new_id = '.'.$new_id;
        }

        return $new_id;
    }

}
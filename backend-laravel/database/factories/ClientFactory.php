<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $arrayValuesCountry = ['colombia', 'united_states'];
        $arrayValuesStatus = ['Active', 'Inactive'];
        return [
            'identity_document' => $this->faker->unique()->randomNumber(8),
            'first_last_name' => $this->faker->lastName,
            'second_last_name' => $this->faker->lastName,
            'first_name' => $this->faker->firstName,
            'other_names' => $this->faker->firstName,
            'email' => $this->faker->safeEmail,
            'country' => $arrayValuesCountry[rand(0,1)],
            'date_of_entry' => $this->faker->dateTime(),
            'status' => $arrayValuesStatus[rand(0,1)],
            'type_of_identity_document_id' => null,
            'area_id' => null,
        ];
    }
}

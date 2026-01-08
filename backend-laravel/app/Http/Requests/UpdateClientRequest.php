<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;
use App\Enums\Country;
use App\Enums\Status;
use Illuminate\Validation\Rule;

class UpdateClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Get the current date and time
        $currentDate = Carbon::now();

        // Subtract one month
        $oneMonthAgo = $currentDate->subMonth();

        // Format and display the result
        $oneMonthAgo->format('Y-m-d H:i:s');

        $clientId = $this->route('client'); 

        return [
            'identity_document' => ['required', 'string', 'max:20', 'regex:/^[a-zA-Z0-9]+$/',
                Rule::unique('clients')->where(function ($query) {
                   return $query->where(
                        [
                            ['identity_document', '=', $this->identity_document],
                            ['type_of_identity_document_id', '=', $this->type_of_identity_document_id],
                        ]
                    );
                })->ignore($clientId)
            ],
            'first_last_name' => ['required', 'string', 'max:20', 'regex:/^[A-Z]+$/'],
            'second_last_name' => ['required', 'string', 'max:20', 'regex:/^[A-Z]+$/'],
            'first_name' => ['required', 'string', 'max:20', 'regex:/^[A-Z]+$/'],
            'other_names' => ['required', 'string', 'max:50', 'regex:/^[A-Z ]+$/'],
            'email' => ['required', 'email', 'max:300', 'unique:clients,email,'.$clientId],# email validation: https://stackoverflow.com/a/61585974 'email' => 'email:rfc,dns'
            'country' => ['required', Rule::enum(Country::class)],
            'date_of_entry' => ['required', 'after:'.$oneMonthAgo, 'before_or_equal:now'],
            'status' => ['required', Rule::enum(Status::class)],
            'type_of_identity_document_id' => ['required'],
            'area_id' => ['required'],
        ];
    }
}

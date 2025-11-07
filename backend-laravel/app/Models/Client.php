<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'identity_document',
        'first_last_name',
        'second_last_name',
        'first_name',
        'other_names',
        'email',
        'country',
        'date_of_entry',
        'status',
        'type_of_identity_document_id',
        'area_id',
    ];

    public function area(): BelongsTo
    {
        return $this->belongsTo(Area::class);
    }

    public function typeOfIdentityDocument(): BelongsTo
    {
        return $this->belongsTo(TypeOfIdentityDocument::class);
    }
}

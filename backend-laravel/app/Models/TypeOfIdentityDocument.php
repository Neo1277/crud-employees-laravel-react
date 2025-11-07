<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TypeOfIdentityDocument extends Model
{
    //protected $table = 'type_of_identity_documents';

    use HasFactory;

    protected $fillable = [
        'code',
        'description',
    ];

    public function clients(): HasMany
    {
        return $this->hasMany(Client::class);
    }
}

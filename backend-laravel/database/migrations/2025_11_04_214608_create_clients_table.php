<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->increments('id');
            $table->string('identity_document', 20);
            $table->string('first_last_name', 20);
            $table->string('second_last_name', 20);
            $table->string('first_name', 20);
            $table->string('other_names', 50);
            $table->string('email', 300)->unique();
            $table->enum('country', ['colombia', 'united_states'])->default('colombia');
            $table->dateTime('date_of_entry');
            $table->enum('status', ['Active', 'Inactive'])->default('Active');
            $table->integer('type_of_identity_document_id')->unsigned()->index();
            $table->foreign('type_of_identity_document_id')->references('id')->on('type_of_identity_documents')->onDelete('cascade');
            $table->integer('area_id')->unsigned()->index();
            $table->foreign('area_id')->references('id')->on('areas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};

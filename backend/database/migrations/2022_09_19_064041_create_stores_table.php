<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address');
            $table->string('avatar',255)->nullable();
            $table->unsignedBigInteger('owner_id');
            $table->unsignedBigInteger('verify_state_id');
            $table->foreign('owner_id')->references('id')->on('users');
            $table->foreign('verify_state_id')->references('id')->on('verify_states');
            $table->boolean('deleted_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stores');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('style')->nullable();
            $table->string('name');
            $table->float('price',15,2);
            $table->unsignedBigInteger('store_id');
            $table->unsignedBigInteger('category_id');
            $table->foreign('store_id')->references('id')->on('stores');
            $table->foreign('category_id')->references('id')->on('product_categories');
            $table->string('img',255)->nullable();
            $table->string('desc');
            $table->unsignedBigInteger('amount');
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
        Schema::dropIfExists('products');
    }
}

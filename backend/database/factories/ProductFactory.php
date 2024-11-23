<?php

namespace Database\Factories;

use App\Models\ProductCategory;
use App\Models\Store;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'price' => 100000,
            'store_id' => Store::pluck('id')->random(),
            'category_id' => ProductCategory::pluck('id')->random(),
            'img'  => 'images/products/product-default.png',
            'desc' => $this->faker->sentence(),
            'deleted_at' => $this->faker->numberBetween(0,1),
            'updated_at'     => now(),
            'created_at'     => now(),
        ];
    }
}

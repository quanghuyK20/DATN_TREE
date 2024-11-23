<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'product_id' => $this->faker->unique()->numberBetween(1,36),
            'desc_detail' => $this->faker->sentence(),
            'img_1'  => 'images/products-details/1661691247.png',
            'img_2'  => 'images/products-details/1661691247.png',
            'img_3'  => 'images/products-details/1661691247.png',
            'img_4'  => 'images/products-details/1661691247.png',
            'updated_at'     => now(),
            'created_at'     => now(),
        ];
    }
}

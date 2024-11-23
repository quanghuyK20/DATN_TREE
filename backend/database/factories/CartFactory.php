<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CartFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'product_id' => Product::pluck('id')->random(),
            'user_id' => User::where('role_id',2)->get()->random()->id,
            'amount' => '1'
        ];
    }
}

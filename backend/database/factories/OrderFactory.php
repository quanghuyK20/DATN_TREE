<?php

namespace Database\Factories;

use App\Models\OrderReceiver;
use App\Models\OrderStatus;
use App\Models\Product;
use App\Models\Transport;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::pluck('id')->random(),
            // 'product_id' => Product::pluck('id')->random(),
            'transport_id' => Transport::pluck('id')->random(),
            'receiver_id' => OrderReceiver::pluck('id')->random(),
            'order_date' => $this->faker->date(),
            'price' => 100000,
            'message' => $this->faker->sentence(),
            'status_id' => OrderStatus::pluck('id')->random(),
            'total' => 10,
            'updated_at'     => now(),
            'created_at'     => now(),
            'shipper_id' => 1,
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\VerifyState;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class StoreFactory extends Factory
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
            'address' => $this->faker->address(),
            'avatar'  => 'images/stores/store-default.png',
            'owner_id' => User::where('role_id',3)->get()->random()->id,
            'verify_state_id' => VerifyState::pluck('id')->random(),
            'deleted_at' => $this->faker->numberBetween(0,1),
            'updated_at'     => now(),
            'created_at'     => now(),
        ];
    }
}

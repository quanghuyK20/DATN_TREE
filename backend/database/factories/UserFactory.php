<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
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
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => bcrypt('TvaT2201@'), // password huylq
            'remember_token' => Str::random(10),
            'role_id' => Role::pluck('id')->random(),
            'avatar'  => 'images/users/user-default.jpg',
            'birthday' => $this->faker->date(),
            'address' => $this->faker->address(),
            'phone_number' => $this->faker->phoneNumber(),
            'gender' => $this->faker->numberBetween(0,1),
            'deleted_at' => $this->faker->numberBetween(0,1),
            'updatedAt'     => now(),
            'createdAt'     => now(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}

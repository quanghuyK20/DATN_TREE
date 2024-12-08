<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class StoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('stores')->insert([
            [
                'name' => 'Store 1',
                'address' => '123 Main Street',
                'avatar' => 'store1-avatar.jpg',
                'owner_id' => 3, // Assume user with ID 1 exists
                'verify_state_id' => 1, // Assume verify_state with ID 1 exists
                'deleted_at' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Store 2',
                'address' => '456 Elm Street',
                'avatar' => 'store2-avatar.jpg',
                'owner_id' => 3,
                'verify_state_id' => 2,
                'deleted_at' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Store 3',
                'address' => '789 Oak Avenue',
                'avatar' => 'store3-avatar.jpg',
                'owner_id' => 3,
                'verify_state_id' => 1,
                'deleted_at' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Store 4',
                'address' => '321 Pine Street',
                'avatar' => 'store4-avatar.jpg',
                'owner_id' => 4,
                'verify_state_id' => 3,
                'deleted_at' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Store 5',
                'address' => '654 Maple Road',
                'avatar' => 'store5-avatar.jpg',
                'owner_id' => 3,
                'verify_state_id' => 2,
                'deleted_at' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}

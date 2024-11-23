<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShippingUnits extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('shipping_units')->insert([
            [
                'name' => 'Shipping Unit 1',
                'address' => '123 Example St, City, Country',
                'avatar' => 'avatar1.png',
                'price' => 100.00,
                'owner_id' => 1,
                'verify_state_id' => 1,
                'deleted_at' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Shipping Unit 2',
                'address' => '456 Another St, City, Country',
                'avatar' => 'avatar2.png',
                'price' => 150.50,
                'owner_id' => 2,
                'verify_state_id' => 2,
                'deleted_at' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

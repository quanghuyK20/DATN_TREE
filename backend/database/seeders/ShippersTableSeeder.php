<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShippersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('shippers')->insert([
            [
                'user_id' => 1, // phải tồn tại trong bảng `users`
                'station_id' => 1, // phải tồn tại trong bảng `shipping_units`
                'verify_state_id' => 1, // giả định tồn tại
                'deleted_at' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2, // phải tồn tại trong bảng `users`
                'station_id' => 2, // phải tồn tại trong bảng `shipping_units`
                'verify_state_id' => 2, // giả định tồn tại
                'deleted_at' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

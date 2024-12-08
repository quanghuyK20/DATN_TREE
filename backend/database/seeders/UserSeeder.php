<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Thêm dữ liệu mẫu vào bảng users
        DB::table('users')->insert([
            [
                'name' => 'John Doe',
                'email' => 'johndoe@example.com',
                'email_verified_at' => now(),
                'role_id' => 1, // Đảm bảo role_id=1 đã tồn tại trong bảng roles
                'password' => Hash::make('password123'),
                'avatar' => null,
                'birthday' => '1990-01-01 00:00:00',
                'address' => '123 Main St, City, Country',
                'phone_number' => '123456789',
                'gender' => true,
                'deleted_at' => false,
                'remember_token' => null,
                'createdAt' => now(),
                'updatedAt' => now(),
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'janesmith@example.com',
                'email_verified_at' => now(),
                'role_id' => 2, // Đảm bảo role_id=2 đã tồn tại trong bảng roles
                'password' => Hash::make('password123'),
                'avatar' => null,
                'birthday' => '1992-05-15 00:00:00',
                'address' => '456 Another St, City, Country',
                'phone_number' => '987654321',
                'gender' => false,
                'deleted_at' => false,
                'remember_token' => null,
                'createdAt' => now(),
                'updatedAt' => now(),
            ],
        ]);
    }
}

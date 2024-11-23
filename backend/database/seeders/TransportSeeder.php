<?php

namespace Database\Seeders;

use App\Models\Transport;
use Illuminate\Database\Seeder;

class TransportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [            
            ['id' => 1, 'name' => 'Giao hàng tiết kiệm', 'price' => 50000],
            ['id' => 2, 'name' => 'Giao hàng nhanh', 'price' => 100000],
            ['id' => 3, 'name' => 'Nhận hàng trực tiếp', 'price' => 0],
        ];

        foreach ($items as $item){
            Transport::create($item);
        }
    }
}

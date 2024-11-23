<?php

namespace Database\Seeders;

use App\Models\OrderStatus;
use Illuminate\Database\Seeder;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [            
            ['id' => 1, 'name' => 'Đang chuẩn bị hàng'],
            ['id' => 2, 'name' => 'Đang giao hàng'],
            ['id' => 3, 'name' => 'Đã giao hàng'],
            ['id' => 4, 'name' => 'Hủy đơn hàng'],
        ];

        foreach ($items as $item){
            OrderStatus::create($item);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\VerifyState;
use Illuminate\Database\Seeder;

class VerifyStateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [            
            ['id' => 1, 'state' => 'Đang đề xuất', 'note' => 'Vui lòng accept sớm nhất'],
            ['id' => 2, 'state' => 'Đã đồng ý', 'note' => ''],
            ['id' => 3, 'state' => 'Đã từ chối', 'note' => 'Hồ sơ của bạn không phù hợp'],
        ];

        foreach ($items as $item){
            VerifyState::create($item);
        }
    }
}

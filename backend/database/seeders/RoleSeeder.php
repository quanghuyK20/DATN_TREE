<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [            
            ['id' => 1, 'name' => 'admin'],
            ['id' => 2, 'name' => 'customer'],
            ['id' => 3, 'name' => 'seller'],
            ['id' => 4, 'name' => 'shipper'],
        ];

        foreach ($items as $item){
            Role::create($item);
        }
    }
}

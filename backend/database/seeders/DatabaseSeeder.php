<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\Feedback;
use App\Models\Order;
use App\Models\OrderReceiver;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(RoleSeeder::class);
        User::factory(10)->create();

        $this->call(ProductCategorySeeder::class);
        $this->call(VerifyStateSeeder::class);
        $this->call(StoreSeeder::class);
        $this->call(ProductSeeder::class);

        $this->call(OrderStatusSeeder::class);
        $this->call(TransportSeeder::class);
        // $this->call(VerifyStateSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ShippingUnits::class);          // 11/11
        $this->call(ShippersTableSeeder::class);    // 11/11

        // User::factory(10)->create();
        // Store::factory(User::where('role_id',3)->count())->create();
        // $this->call(ProductSeeder::class);
        // Product::factory(100)->create();
        ProductDetail::factory(30)->create();
        Cart::factory(20)->create();
        OrderReceiver::factory(30)->create();
        Order::factory(30)->create();
        Feedback::factory(10)->create();
    }
}

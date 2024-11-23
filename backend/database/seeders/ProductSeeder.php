<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [       

            ['id' => 1, 'name' => 'Bunjingi', 'price' => 100000, 'store_id' => 1, 'category_id' => 1 , 'img' => 'images/products/Bunjingi/1.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 2, 'name' => 'Bunjingi', 'price' => 100000, 'store_id' => 1, 'category_id' => 1 , 'img' => 'images/products/Bunjingi/2.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 3, 'name' => 'Bunjingi', 'price' => 100000, 'store_id' => 1, 'category_id' => 1 , 'img' => 'images/products/Bunjingi/3.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 4, 'name' => 'Bunjingi', 'price' => 100000, 'store_id' => 1, 'category_id' => 1 , 'img' => 'images/products/Bunjingi/4.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],

            ['id' => 5, 'name' => 'Chokkan', 'price' => 100000, 'store_id' => 1, 'category_id' => 2 , 'img' => 'images/products/Chokkan/1.png', 'desc'=> 'Cây siêu đẹp', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 6, 'name' => 'Chokkan', 'price' => 100000, 'store_id' => 1, 'category_id' => 2 , 'img' => 'images/products/Chokkan/2.jpg', 'desc'=> 'Cây siêu đẹp', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 7, 'name' => 'Chokkan', 'price' => 100000, 'store_id' => 1, 'category_id' => 2, 'img' => 'images/products/Chokkan/3.jpg', 'desc'=> 'Cây siêu đẹp', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 8, 'name' => 'Chokkan', 'price' => 100000, 'store_id' => 1, 'category_id' => 2 , 'img' => 'images/products/Chokkan/4.jpg', 'desc'=> 'Cây siêu đẹp', 'deleted_at' => 0, 'amount' => 1],

            ['id' => 9, 'name' => 'Fukinagashi', 'price' => 100000, 'store_id' => 1, 'category_id' => 3, 'img' => 'images/products/Fukinagashi/1.png', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],
            ['id' => 10, 'name' => 'Fukinagashi', 'price' => 100000, 'store_id' => 1, 'category_id' => 3, 'img' => 'images/products/Fukinagashi/2.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],
            ['id' => 11, 'name' => 'Fukinagashi', 'price' => 100000, 'store_id' => 1, 'category_id' => 3, 'img' => 'images/products/Fukinagashi/3.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],
            ['id' => 12, 'name' => 'Fukinagashi', 'price' => 100000, 'store_id' => 1, 'category_id' => 3, 'img' => 'images/products/Fukinagashi/4.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],

            ['id' => 13, 'name' => 'Han-Kengai', 'price' => 100000, 'store_id' => 1, 'category_id' => 4 , 'img' => 'images/products/Han-Kengai/1.jpg', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 14, 'name' => 'Han-Kengai', 'price' => 100000, 'store_id' => 1, 'category_id' => 4 , 'img' => 'images/products/Han-Kengai/2.png', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 15, 'name' => 'Han-Kengai', 'price' => 100000, 'store_id' => 1, 'category_id' => 4 , 'img' => 'images/products/Han-Kengai/3.jpg', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 16, 'name' => 'Han-Kengai', 'price' => 100000, 'store_id' => 1, 'category_id' => 4 , 'img' => 'images/products/Han-Kengai/4.jpg', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],

            ['id' => 17, 'name' => 'Hokidachi', 'price' => 100000, 'store_id' => 1, 'category_id' => 5 , 'img' => 'images/products/Hokidachi/1.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 18, 'name' => 'Hokidachi', 'price' => 100000, 'store_id' => 1, 'category_id' => 5 , 'img' => 'images/products/Hokidachi/2.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 19, 'name' => 'Hokidachi', 'price' => 100000, 'store_id' => 1, 'category_id' => 5 , 'img' => 'images/products/Hokidachi/3.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 20, 'name' => 'Hokidachi', 'price' => 100000, 'store_id' => 1, 'category_id' => 5 , 'img' => 'images/products/Hokidachi/4.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],

            ['id' => 21, 'name' => 'Moyogi', 'price' => 100000, 'store_id' => 1, 'category_id' => 6 , 'img' => 'images/products/Moyogi/1.jpg', 'desc'=> 'Cây siêu đẹp', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 22, 'name' => 'Moyogi', 'price' => 100000, 'store_id' => 1, 'category_id' => 6 , 'img' => 'images/products/Moyogi/2.jpeg', 'desc'=> 'Cây siêu đẹp', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 23, 'name' => 'Moyogi', 'price' => 100000, 'store_id' => 1, 'category_id' => 6, 'img' => 'images/products/Moyogi/3.jpg', 'desc'=> 'Cây siêu đẹp', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 24, 'name' => 'Moyogi', 'price' => 100000, 'store_id' => 1, 'category_id' => 6 , 'img' => 'images/products/Moyogi/4.png', 'desc'=> 'Cây siêu đẹp', 'deleted_at' => 0, 'amount' => 1],

            ['id' => 25, 'name' => 'Seki-joju', 'price' => 100000, 'store_id' => 1, 'category_id' => 7, 'img' => 'images/products/Seki-joju/1.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],
            ['id' => 26, 'name' => 'Seki-joju', 'price' => 100000, 'store_id' => 1, 'category_id' => 7, 'img' => 'images/products/Seki-joju/2.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],
            ['id' => 27, 'name' => 'Seki-joju', 'price' => 100000, 'store_id' => 1, 'category_id' => 7, 'img' => 'images/products/Seki-joju/3.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],
            ['id' => 28, 'name' => 'Seki-joju', 'price' => 100000, 'store_id' => 1, 'category_id' => 7, 'img' => 'images/products/Seki-joju/4.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],

            ['id' => 29, 'name' => 'Sokan', 'price' => 100000, 'store_id' => 1, 'category_id' => 8 , 'img' => 'images/products/Sokan/1.png', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 30, 'name' => 'Sokan', 'price' => 100000, 'store_id' => 1, 'category_id' => 8 , 'img' => 'images/products/Sokan/2.jpg', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 31, 'name' => 'Sokan', 'price' => 100000, 'store_id' => 1, 'category_id' => 8 , 'img' => 'images/products/Sokan/3.jpg', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 32, 'name' => 'Sokan', 'price' => 100000, 'store_id' => 1, 'category_id' => 8 , 'img' => 'images/products/Sokan/4.jpg', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],

            ['id' => 33, 'name' => 'Yose-ue', 'price' => 100000, 'store_id' => 1, 'category_id' => 9 , 'img' => 'images/products/Yose-ue/1.jpg', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 34, 'name' => 'Yose-ue', 'price' => 100000, 'store_id' => 1, 'category_id' => 9 , 'img' => 'images/products/Yose-ue/2.jpg', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 35, 'name' => 'Yose-ue', 'price' => 100000, 'store_id' => 1, 'category_id' => 9 , 'img' => 'images/products/Yose-ue/3.jpg', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 36, 'name' => 'Yose-ue', 'price' => 100000, 'store_id' => 1, 'category_id' => 9 , 'img' => 'images/products/Yose-ue/4.jpg', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],

            
        ];

        foreach ($items as $item){
            Product::create($item);
        }
    }
}

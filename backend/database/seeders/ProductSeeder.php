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

            ['id' => 1, 'style' => 'the_van_nhan', 'name' => 'Cây cảnh 01', 'price' => 100000, 'store_id' => 1, 'category_id' => 1 , 'img' => 'images/products/Bunjingi/1.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 2, 'style' => 'the_van_nhan', 'name' => 'Cây cảnh 02', 'price' => 100000, 'store_id' => 1, 'category_id' => 1 , 'img' => 'images/products/Bunjingi/2.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 3, 'style' => 'the_van_nhan', 'name' => 'Cây cảnh 03', 'price' => 100000, 'store_id' => 1, 'category_id' => 1 , 'img' => 'images/products/Bunjingi/3.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 4, 'style' => 'the_van_nhan', 'name' => 'Cây cảnh 04', 'price' => 100000, 'store_id' => 1, 'category_id' => 1 , 'img' => 'images/products/Bunjingi/4.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],

            ['id' => 5, 'style' => 'dang_truc', 'name' => 'Cây cảnh 05', 'price' => 100000, 'store_id' => 1, 'category_id' => 2 , 'img' => 'images/products/Chokkan/1.png', 'desc'=> 'Cây siêu đẹp', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 6, 'style' => 'dang_truc', 'name' => 'Cây cảnh 06', 'price' => 100000, 'store_id' => 1, 'category_id' => 2 , 'img' => 'images/products/Chokkan/2.jpg', 'desc'=> 'Cây siêu đẹp', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 7, 'style' => 'dang_truc', 'name' => 'Cây cảnh 07', 'price' => 100000, 'store_id' => 1, 'category_id' => 2, 'img' => 'images/products/Chokkan/3.jpg', 'desc'=> 'Cây siêu đẹp', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 8, 'style' => 'dang_truc', 'name' => 'Cây cảnh 08', 'price' => 100000, 'store_id' => 1, 'category_id' => 2 , 'img' => 'images/products/Chokkan/4.jpg', 'desc'=> 'Cây siêu đẹp', 'deleted_at' => 0, 'amount' => 1],

            ['id' => 9, 'style' => 'the_gio_thoi_nghieng', 'name' => 'Cây cảnh 09', 'price' => 100000, 'store_id' => 1, 'category_id' => 3, 'img' => 'images/products/Fukinagashi/1.png', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],
            ['id' => 10, 'style' => 'the_gio_thoi_nghieng', 'name' => 'Cây cảnh 10', 'price' => 100000, 'store_id' => 1, 'category_id' => 3, 'img' => 'images/products/Fukinagashi/2.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],
            ['id' => 11, 'style' => 'the_gio_thoi_nghieng', 'name' => 'Cây cảnh 11', 'price' => 100000, 'store_id' => 1, 'category_id' => 3, 'img' => 'images/products/Fukinagashi/3.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],
            ['id' => 12, 'style' => 'the_gio_thoi_nghieng', 'name' => 'Cây cảnh 12', 'price' => 100000, 'store_id' => 1, 'category_id' => 3, 'img' => 'images/products/Fukinagashi/4.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],

            ['id' => 13, 'style' => 'the_thac_do', 'name' => 'Cây cảnh 13', 'price' => 100000, 'store_id' => 1, 'category_id' => 4 , 'img' => 'images/products/Han-Kengai/1.jpg', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 14, 'style' => 'the_thac_do', 'name' => 'Han-Kengai', 'price' => 100000, 'store_id' => 1, 'category_id' => 4 , 'img' => 'images/products/Han-Kengai/2.png', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 15, 'style' => 'the_thac_do', 'name' => 'Han-Kengai', 'price' => 100000, 'store_id' => 1, 'category_id' => 4 , 'img' => 'images/products/Han-Kengai/3.jpg', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 16, 'style' => 'the_thac_do', 'name' => 'Han-Kengai', 'price' => 100000, 'store_id' => 1, 'category_id' => 4 , 'img' => 'images/products/Han-Kengai/4.jpg', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],

            ['id' => 17, 'style' => 'the_choi', 'name' => 'Cây cảnh 14', 'price' => 100000, 'store_id' => 1, 'category_id' => 5 , 'img' => 'images/products/Hokidachi/1.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 18, 'style' => 'the_choi', 'name' => 'Cây cảnh 22', 'price' => 100000, 'store_id' => 1, 'category_id' => 5 , 'img' => 'images/products/Hokidachi/2.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 19, 'style' => 'the_choi', 'name' => 'Cây cảnh 23', 'price' => 100000, 'store_id' => 1, 'category_id' => 5 , 'img' => 'images/products/Hokidachi/3.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 20, 'style' => 'the_choi', 'name' => 'Cây cảnh 24', 'price' => 100000, 'store_id' => 1, 'category_id' => 5 , 'img' => 'images/products/Hokidachi/4.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],

            ['id' => 21, 'style' => 'dang_truc_lac', 'name' => 'Cây cảnh 15', 'price' => 100000, 'store_id' => 1, 'category_id' => 6 , 'img' => 'images/products/Moyogi/1.jpg', 'desc'=> 'Cây siêu đẹp', 'deleted_at' => 0, 'amount' => 1],

            ['id' => 22, 'style' => 'the_choi', 'name' => 'Cây cảnh 36', 'price' => 100000, 'store_id' => 1, 'category_id' => 7, 'img' => 'images/products/Seki-joju/1.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],
            ['id' => 23, 'style' => 'the_choi', 'name' => 'Cây cảnh 333', 'price' => 100000, 'store_id' => 1, 'category_id' => 7, 'img' => 'images/products/Seki-joju/1.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],
            ['id' => 24, 'style' => 'the_choi', 'name' => 'Cây cảnh 366', 'price' => 100000, 'store_id' => 1, 'category_id' => 7, 'img' => 'images/products/Seki-joju/1.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],

            ['id' => 25, 'style' => 'the_choi', 'name' => 'Cây cảnh 36', 'price' => 100000, 'store_id' => 1, 'category_id' => 7, 'img' => 'images/products/Seki-joju/1.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],

            ['id' => 26, 'style' => 'the_gio_thoi_nghieng', 'name' => 'Cây cảnh 46', 'price' => 100000, 'store_id' => 1, 'category_id' => 7, 'img' => 'images/products/Seki-joju/1.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],

            ['id' => 27, 'style' => 'the_gio_thoi_nghieng', 'name' => 'Cây cảnh 56', 'price' => 100000, 'store_id' => 1, 'category_id' => 7, 'img' => 'images/products/Seki-joju/1.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],

            ['id' => 28, 'style' => 'the_gio_thoi_nghieng', 'name' => 'Cây cảnh 66', 'price' => 100000, 'store_id' => 1, 'category_id' => 7, 'img' => 'images/products/Seki-joju/1.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],

            ['id' => 29, 'style' => 'the_gio_thoi_nghieng', 'name' => 'Cây cảnh 76', 'price' => 100000, 'store_id' => 1, 'category_id' => 7, 'img' => 'images/products/Seki-joju/1.jpg', 'desc'=> 'Cây siêu rẻ','deleted_at' => 0, 'amount' => 1],

            ['id' => 32, 'style' => 'the_bam_da', 'name' => 'Cây cảnh 17', 'price' => 100000, 'store_id' => 1, 'category_id' => 8 , 'img' => 'images/products/Sokan/1.png', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],

            ['id' => 30, 'style' => 'the_rung_cay', 'name' => 'Cây cảnh 18', 'price' => 100000, 'store_id' => 1, 'category_id' => 9 , 'img' => 'images/products/Yose-ue/1.jpg', 'desc'=> 'Cây đẹp siêu rẻ', 'deleted_at' => 0, 'amount' => 1],

            ['id' => 31, 'style' => 'the_van_nhan', 'name' => 'the_van_nhan', 'price' => 100000, 'store_id' => 1, 'category_id' => 11 , 'img' => 'images/products/the_van_nhan/1.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 36, 'style' => 'the_van_nhan', 'name' => 'the_van_nhan', 'price' => 100000, 'store_id' => 1, 'category_id' => 11 , 'img' => 'images/products/the_van_nhan/1.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 33, 'style' => 'the_van_nhan', 'name' => 'the_van_nhan', 'price' => 100000, 'store_id' => 1, 'category_id' => 11 , 'img' => 'images/products/the_van_nhan/1.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 34, 'style' => 'the_van_nhan', 'name' => 'the_van_nhan', 'price' => 100000, 'store_id' => 1, 'category_id' => 11 , 'img' => 'images/products/the_van_nhan/1.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],
            ['id' => 35, 'style' => 'the_van_nhan', 'name' => 'the_van_nhan', 'price' => 100000, 'store_id' => 1, 'category_id' => 11 , 'img' => 'images/products/the_van_nhan/1.jpg', 'desc'=> 'Cây siêu rẻ', 'deleted_at' => 0, 'amount' => 1],

        ];

        foreach ($items as $item){
            Product::create($item);
        }
    }
}

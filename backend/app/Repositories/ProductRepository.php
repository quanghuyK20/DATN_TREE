<?php

namespace App\Repositories;

use App\Models\Product;
use App\Repositories\ProductRepositoryInterface;

class ProductRepository extends Repository implements ProductRepositoryInterface
{
    public function getModel()
    {
        return Product::class;
    }

    public function getListProducts($params)
    {
        $products = Product::join('stores', 'products.store_id', 'stores.id')
            ->join('product_categories', 'products.category_id', 'product_categories.id')
            ->select('products.id','stores.name AS store_name', 'name_vn', 'products.name as product_name', 'price', 'desc','products.img', 'products.deleted_at as deleted_at' , 'amount')
            ->where(function ($query) use ($params) { // Moved 'where' condition here
                $query->where('products.name', 'like', '%' . $params['txt_search'] . '%')
                    ->orWhere('price', 'like', '%' . $params['txt_search'] . '%')
                    ->orWhere('desc', 'like', '%' . $params['txt_search'] . '%');
            });

        if (isset($params['is_deleted'])) {
            $products->where('products.deleted_at', $params['is_deleted']);
        } else {
            $products->whereNotNull('products.deleted_at');
        }

        if (isset($params['store_id'])) {
            $products->where('products.store_id', $params['store_id']);
        } else {
            $products->whereNotNull('products.store_id');
        }

        if (isset($params['category_id'])) {
            $products->where('products.category_id', $params['category_id']);
        } else {
            $products->whereNotNull('products.category_id');
        }

        $products = $products->paginate($params['limit']);

        return $products;
    }

    public function getListProductsByParams($params){
        $products = Product::join('stores', 'products.store_id', 'stores.id')
        ->join('product_categories', 'products.category_id', 'product_categories.id')
        ->select('products.id','stores.name AS store_name', 'name_vn', 'products.name as product_name', 'price', 'desc','products.img', 'products.deleted_at as deleted_at' , 'amount')
        ->where(function ($query) use ($params) { // Moved 'where' condition here
            $query->where('products.name', 'like', '%' . $params['txt_search'] . '%')
                ->orWhere('price', 'like', '%' . $params['txt_search'] . '%')
                ->orWhere('desc', 'like', '%' . $params['txt_search'] . '%');
        })->get();
        return $products;
    }

    public function getProductById($id){

        $products = Product::join('stores', 'products.store_id', 'stores.id')
            ->join('product_categories', 'products.category_id', 'product_categories.id')
            ->join('product_details', 'products.id', 'product_details.product_id')
            ->select(
                'products.id','stores.name as store_name','stores.id as store_id','stores.address as store_address', 'name_vn',
                'products.name as product_name', 'price', 'desc','products.img', 'products.deleted_at as deleted_at', 'products.amount as amount',
                'product_categories.name_vn as category_name', 'product_categories.detail as category_detail', 'product_categories.id as category_id',
                'product_details.desc_detail as detail_content' , 'product_details.img_1 as img_1' , 'product_details.img_2 as img_2',
                'product_details.img_3 as img_3' , 'product_details.img_4 as img_4'
            );

        $product = $products->where('products.id',$id)->get();

        return $product;
    }

    public function getProductByStoreId($store_id){
        $products = Product::join('stores', 'products.store_id','stores.id')
        ->select(
            'products.id','stores.name as store_name','stores.id as store_id','stores.address as store_address', 'stores.avatar as store_avatar',
            'products.name as product_name', 'price', 'desc','products.img', 'products.deleted_at as deleted_at' , 'products.amount as amount',
        );
        $products = $products
                    ->where('store_id',$store_id)
                    ->where('products.deleted_at', 0)
                    ->get();
        return $products;
    }


    public function getProductAdminById($id){
        return Product::find($id);
    }

    public function createProduct($newUser){
        print_r($newUser);
        return Product::create($newUser);
    }

    public function getProductsSold(){
        $products = Product::select('id','name')->where('deleted_at', 1)->get();
        return $products;
    }
}

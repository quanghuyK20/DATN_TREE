<?php

namespace App\Repositories;

use App\Models\ProductDetail;
use App\Repositories\ProductDetailRepositoryInterface;

class ProductDetailRepository extends Repository implements ProductDetailRepositoryInterface
{
    public function getModel()
    {
        return ProductDetail::class;
    }

    public function getProductDetailById($id){
        return ProductDetail::where('product_id',$id)->first();
    }
}
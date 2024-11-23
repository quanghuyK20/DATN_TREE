<?php

namespace App\Repositories;

use App\Models\ProductCategory;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ProductCategoryRepository extends Repository implements ProductCategoryRepositoryInterface
{
    public function getModel()
    {
        return User::class;
    }

    public function getListCategories()
    {

        $data = DB::table('product_categories')
            ->select('*')
            ->orderBy('product_categories.updated_at', 'desc')
            ->get();
        return $data;
    }

    public function getCategoryById($id){
        $productCategory = ProductCategory::find($id);
        return $productCategory;
    }

}

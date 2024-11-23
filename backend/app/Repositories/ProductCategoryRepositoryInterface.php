<?php

namespace App\Repositories;

interface ProductCategoryRepositoryInterface {

    public function getListCategories();

    public function getCategoryById($id);

}
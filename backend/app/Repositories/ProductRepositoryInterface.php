<?php

namespace App\Repositories;

interface ProductRepositoryInterface {

    public function getListProducts($params);

    public function getListProductsByParams($params);

    public function getProductById($id);

    public function getProductAdminById($id);

    public function getProductByStoreId($store_id);

    // public function getUserByEmail($email);

    public function createProduct($newUser);

    public function getProductsSold();

}

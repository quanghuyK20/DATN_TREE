<?php

namespace App\Repositories;

interface OrderRepositoryInterface {

    public function getListOrders($params);

    public function getProductsOrderByUser($userId);
}
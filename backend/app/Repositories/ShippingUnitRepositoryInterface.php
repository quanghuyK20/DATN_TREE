<?php

namespace App\Repositories;

interface ShippingUnitRepositoryInterface {

    public function getListShippingUnit($params);

    public function getListShippingUnitHome();

    public function getShippingUnitById($id);

    public function createShippingUnit($newShippingUnit);
}
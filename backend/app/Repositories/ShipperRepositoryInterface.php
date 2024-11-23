<?php

namespace App\Repositories;

interface ShipperRepositoryInterface {

    public function getListShipper($params);

    public function getShipperById($id);

    public function getListShipperByShippingUnit($station_id);
}
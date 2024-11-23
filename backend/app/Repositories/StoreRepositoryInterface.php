<?php

namespace App\Repositories;

interface StoreRepositoryInterface {

    public function getListStores($params);

    public function getStoreById($id);

    public function getStoreByOwnerId($ownerId);


}
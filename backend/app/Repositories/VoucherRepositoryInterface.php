<?php

namespace App\Repositories;

interface VoucherRepositoryInterface {

    public function getListVouchers($params);
    public function getVoucherById($id);
    public function getVouchersByStoreId($store_id);
    public function createVoucher($newVoucher);

}
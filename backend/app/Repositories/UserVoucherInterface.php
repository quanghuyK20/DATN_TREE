<?php

namespace App\Repositories;

interface UserVoucherInterface {

    public function getListUserVoucher();

    public function getUserVoucherByUserId($userId);

    public function createUserVoucher($newShippingUnit);

    public function checkVoucherExits($userId,$voucherId);
}
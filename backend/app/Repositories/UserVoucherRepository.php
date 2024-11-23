<?php

namespace App\Repositories;

use App\Models\UserVoucher;
use App\Repositories\UserVoucherInterface;

class UserVoucherRepository extends Repository implements UserVoucherInterface
{
    public function getModel()
    {
        return UserVoucher::class;
    }

    public function getListUserVoucher()
    {
        $userVouchers = UserVoucher::join('vouchers','user_vouchers.voucher_id', 'vouchers.id')
                                    ->select('user_vouchers.id as id','vouchers.id as voucher_id','vouchers.name as name', 'vouchers.end_date as end_date', 'vouchers.img as img',
                                            'vouchers.percent_reduction as percent_reduction' ,'users.phone_number as phone_number', 'shipping_units.address as address')
                                    ->where('user_vouchers.delete_at', 0)->get();

        return $userVouchers;
    }

    public function getUserVoucherByUserId($userId){
        $userVouchers = UserVoucher::join('vouchers','user_vouchers.voucher_id', 'vouchers.id')
                    ->select('user_vouchers.id as id','vouchers.id as voucher_id','vouchers.name as name', 'vouchers.end_date as end_date', 'vouchers.img as img',
                            'vouchers.percent_reduction as percent_reduction')
                    ->where('user_vouchers.delete_at', 0)->where('user_vouchers.user_id', $userId)->get();

        return $userVouchers;
    }

    public function createUserVoucher($newVoucher)
    {
        return UserVoucher::create($newVoucher);
    }

    public function checkVoucherExits($userId,$voucherId){
        $userVoucher = UserVoucher::where('user_id',$userId)->where('voucher_id',$voucherId)->where('delete_at',0)->first();
        if($userVoucher){
            return true;
        }
        return false;
    }
}

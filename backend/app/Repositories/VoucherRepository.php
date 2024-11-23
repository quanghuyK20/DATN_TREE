<?php

namespace App\Repositories;

use App\Models\Voucher;
use App\Repositories\VoucherRepositoryInterface;

class VoucherRepository extends Repository implements VoucherRepositoryInterface
{
    public function getModel()
    {
        return Voucher::class;
    }

    public function getListVouchers($params){

        $vouchers = Voucher::where(function ($query) use ($params) { // Moved 'where' condition here
            $query->where('vouchers.name', 'like', '%' . $params['txt_search'] . '%')
                ->orWhere('vouchers.quantity', $params['txt_search'])
                ->orWhere('vouchers.percent_reduction', $params['txt_search']);
        });

        if (isset($params['start_date']) && isset($params['end_date'])) {
            $start_date = $params['start_date'];
            $end_date = $params['end_date'];
            $vouchers->whereBetween('vouchers.start_date', [$start_date, $end_date]);
        } else {
            $vouchers->whereNotNull('vouchers.start_date'); 
        }

        if(isset($params['store_id'])){
            $vouchers->where('store_id', $params['store_id']);
        }

        $vouchers = $vouchers->paginate($params['limit']);

        return $vouchers;
    }

    public function getVoucherById($id){
        return Voucher::find($id);
    }

    public function getVouchersByStoreId($store_id){
        return Voucher::where('store_id',$store_id)->get();
    }

    public function createVoucher($newVoucher)
    {
        return Voucher::create($newVoucher);
    }
}

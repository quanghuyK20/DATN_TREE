<?php

namespace App\Http\Controllers;

use App\Http\Requests\VoucherRequest;
use App\Repositories\VoucherRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use Carbon\Carbon;

class VoucherController extends Controller
{
    protected $voucherRepository;

    public function __construct(
        VoucherRepositoryInterface $voucherRepository
        )
    {
        $this->voucherRepository = $voucherRepository;
    }

    public function getAllByAdmin(Request $request)
    {
        try {
            // Get Params
            $limit = $request->get('limit', 10);
            $page = $request->get('page', 1);
            $txt_search = $request->get('txt_search', '');
            $start_date = $request->get('start_date', null);
            $end_date = $request->get('start_date', null);
            $store_id = $request->get('store_id', null);

            // Check limit and page
            if ($page < 1 || $limit < 0) {
                return response()->json([
                    'message' => 'Invalid query parameters!'
                ], 400);
            }

            //Create object params
            $params = [
                'limit' => $limit,
                'txt_search' => $txt_search,
                'start_date' =>  $start_date,
                'end_date' =>  $end_date,
                'store_id' => $store_id
            ];

            $products = $this->voucherRepository->getListVouchers($params);

            return response()->json($products, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    public function getVoucherByStoreId($id){
        try{
            $vouchers = $this->voucherRepository->getVouchersByStoreId($id);
            return response()->json($vouchers, 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        }
    }

    public function createVoucher(VoucherRequest $request){
        try {

            $input = $request->all();
            $input['start_date'] = Carbon::createFromFormat('Y-m-d', $input['start_date']);
            $input['end_date'] = Carbon::createFromFormat('Y-m-d', $input['end_date']);
            $voucher = $this->voucherRepository->createVoucher($input);
            return response()->json([
                'message' => 'Created voucher successfully',
                'voucher' => $voucher,
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        }
    }

    public function updateVoucher(Request $request, $id){
        try{
            $voucher = $this->voucherRepository->getVoucherById($id);
            if (!isset($voucher)) {
                return response()->json([
                    'message' => 'Voucher not found!',
                ], 404);
            }
            $input = $request->all();
            $voucher->update($input);
            return response()->json([
                'message' => 'Update voucher successfully',
                'voucher' => $voucher
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };
    }

    public function destroyVoucher($id)
    {
        try{
            $voucher = $this->voucherRepository->getVoucherById($id);
            if (!isset($voucher)) {
                return response()->json([
                    'message' => 'Voucher not found!',
                ], 404);
            } else {
                $voucher->delete($id);
                return response()->json([
                    'message' => 'Xoá voucher thành công',
                ], 201);
            }

        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };
    }
}

<?php

namespace App\Http\Controllers;

use App\Repositories\UserVoucherInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserVoucherController extends Controller
{
    protected $userVoucherRepository;
    public function __construct(
        UserVoucherInterface $userVoucherRepository
    )
    {
        $this->userVoucherRepository = $userVoucherRepository;
    }

    public function index()
    {
        try{
            $userVouchers = $this->userVoucherRepository->getListUserVoucher();
            return response()->json($userVouchers,200);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };
    }

    public function getUserVoucherByUserId(){
        try{
            $user = Auth::user();
            $userVouchers = $this->userVoucherRepository->getUserVoucherByUserId($user->id);
            return response()->json($userVouchers,200);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };
    }

    public function store(Request $request)
    {
        try {
            $input = $request->all();
            $user = Auth::user();
            $input['user_id'] = $user->id;
            $voucherId = $input['voucher_id'];
            $checkVoucherExist = $this->userVoucherRepository->checkVoucherExits($user->id,$voucherId);
            if($checkVoucherExist){
                return response()->json([
                    'message' => 'Voucher đã tồn tại trong kho lưu trữ. Vui lòng lưu mã khác.',
                ], 400);
            }
            // Default value
            $input['delete_at'] = 0;

            $userVoucher = $this->userVoucherRepository->createUserVoucher($input);
            return response()->json([
                'message' => 'Created user voucher successfully',
                'userVoucher' => $userVoucher,
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderReceiver;
use Exception;
use App\Http\Resources\OrderReceiverResource;
use Illuminate\Support\Facades\Auth;

class OrderReceiversController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $orderreceivers = OrderReceiver::all();
            return response()->json([OrderReceiverResource::collection($orderreceivers)],200);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $user = Auth::user();
            $input = $request->all();
            $input['user_id'] = $user->id;
            $input['deleted_at'] = 0;
            $orderreceiver = OrderReceiver::create($input);
            return response()->json([
                'message' => 'Thêm địa chỉ giao hàng thành công',
                'orderreceiver' => new OrderReceiverResource($orderreceiver),
            ], 201);

        }catch(Exception $e){
            return response()->json([
                'message' => 'Đã có lỗi xảy ra trong quá trình thêm địa chỉ giao hàng !',
                'error' => $e,
            ],500);
        };

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getOrderReceiverById($id)
    {
        try{
            $orderreceiver = OrderReceiver::all()->where('id',$id);
            return response()->json([OrderReceiverResource::collection($orderreceiver)],200);

        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };
    }

    public function getOrderReceiverByUserId($id)
    {
        try{
            // $user = Auth::user();
            // $user_id = $user->id;
            $orderreceivers = OrderReceiver::all()->where('user_id',$id);
            return response()->json([OrderReceiverResource::collection($orderreceivers)],200);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{

            $orderreceiver = OrderReceiver::find($id);

            if ($orderreceiver === null) {
                return response()->json([
                    'message' => 'Địa chỉ giao hàng không tồn tại',
                ], 404);
            }

            $input = $request->all();
            $orderreceiver->update($input);

            return response()->json([
                'message' => 'Cập nhật địa chỉ giao hàng thành công',
                'orderreceiver' => new OrderReceiverResource($orderreceiver),
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Đã có lỗi xảy ra trong quá trình cập nhật địa chỉ giao hàng',
                'error' => $e,
            ],500);
        };
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroyOrderReceiverSelf(Request $request,$id)
    {
        try{
            $user = Auth::user();
            $user_id = $user->id;
            $orderreceiver = OrderReceiver::find($id);
            $orderreceiver_user_id = $orderreceiver->user_id;
            if($user_id != $orderreceiver_user_id){

                return response()->json([
                    'message' => 'Không có quyền huỷ bỏ đơn hàng',
                ], 403);
            }

            $input = $request->all();
            if ($orderreceiver === null) {
                return response()->json([
                    'message' => 'Not found',
                ], 404);
            }

            if ($orderreceiver->deleted_at == 1) {
                return response()->json([
                    'message' => 'Người nhận đơn hàng đã bị xóa trước đó',
                ], 304);
            }

            $input['deleted_at'] = 1;

            $orderreceiver->update($input);

            return response()->json([
                'message' => 'Huỷ bỏ đơn hàng thành công',
            ], 201);


        }catch(Exception $e){
            return response()->json([
                'message' => 'Đã có lỗi xảy ra trong quá trình huỷ đơn hàng !',
                'error' => $e,
            ],500);
        };

    }

    public function destroyOrderReceiverAdmin(Request $request,$id)
    {
        try{
            $orderreceiver = OrderReceiver::find($id);

            $input = $request->all();

            if ($orderreceiver === null) {
                return response()->json([
                    'message' => 'Not found',
                ], 404);
            }

            if ($orderreceiver->deleted_at == 1) {
                return response()->json([
                    'message' => 'Người nhận đơn hàng trước đó đã bị xóa',
                ], 304);
            }

            $input['deleted_at'] = 1;

            $orderreceiver->update($input);

            return response()->json([
                'message' => 'Đã xóa thành công',
            ], 201);

        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }
}

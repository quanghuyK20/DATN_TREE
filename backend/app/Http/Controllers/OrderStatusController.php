<?php

namespace App\Http\Controllers;

use App\Models\OrderStatus;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $data = DB::table('order_statuses')
                ->select('*')
                ->orderBy('order_statuses.created_at', 'desc')
                ->get();
            return response()->json([$data],200);
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
            $data = $request->validate([
                'name' => 'required|string|unique:order_statuses',
            ]);

            $order_status = OrderStatus::create([
                'name' => $data['name'],
            ]);


            return response()->json([
                'message' => 'Create orderstatus successfully!',
                'order_status' => $order_status,
            ]);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\OrderStatus  $orderStatus
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
            $order_status = OrderStatus::find($id);

            if ($order_status === null) {
                return response()->json([
                    'message' => 'OrderStauts not found!',
                ], 404);
            }

            return response()->json([
                'order_status' => $order_status,
            ]);
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
     * @param  \App\Models\OrderStatus  $orderStatus
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{

            $order_status = OrderStatus::find($id);

            if ($order_status === null) {
                return response()->json([
                    'message' => 'OrderStatus not found!',
                ], 404);
            }

            // dd($request['name']);

            if($order_status->name === $request['name']){
                return $order_status->update($request->all());
            }

            $rules = [
                'name' => 'max:255|unique:order_statuses,name|regex:/^[^\s]*$/',
            ];

            $validate = Validator::make($request->all(), $rules);
            $validate->validate();

            $order_status->update($request->all());

            return response()->json([
                'message' => 'Update orderstauts successfully!',
                'order_status' => $order_status,
            ]);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\OrderStatus  $orderStatus
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            $order_status = OrderStatus::find($id);

            if ($order_status === null) {
                return response()->json([
                    'message' => 'Trạng thái đặt hàng lỗi!',
                ], 404);
            }

            OrderStatus::findOrFail($id)->delete();

            return response()->json([
                'message' => 'Huỷ đặt hàng thành công',
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }
}

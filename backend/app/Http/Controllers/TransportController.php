<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransportRequest;
use App\Models\Transport;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class TransportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $data = DB::table('transports')
                ->select('*')
                ->orderBy('transports.created_at', 'desc')
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
    public function store(TransportRequest $request)
    {
        try{

            $input = $request->all();

            $transport = Transport::create($input);

            return  response()->json([
                'message' => 'Create transport successfully!',
                'room' => $transport
            ],201);

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
     * @param  \App\Models\Transport  $transport
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
            $transport = Transport::find($id);

            if ($transport === null) {
                return response()->json([
                    'message' => 'Transport not found!',
                ], 404);
            }

            return response()->json([
                'transport' => $transport,
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
     * @param  \App\Models\Transport  $transport
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{
            $transport = Transport::find($id);

            if ($transport === null) {
                return response()->json([
                    'message' => 'Transport not found!',
                ], 404);
            }

            $transport->update($request->all());

            return response()->json([
                'message' => 'Update transport successfully!',
                'transport' => $transport,
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
     * @param  \App\Models\Transport  $transport
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            $transport = Transport::find($id);

            if ($transport === null) {
                return response()->json([
                    'message' => 'Không tìm thấy thông tin vận chuyển!',
                ], 404);
            }

            Transport::findOrFail($id)->delete();

            return response()->json([
                'message' => 'Đã huỷ thành công!',
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }
}

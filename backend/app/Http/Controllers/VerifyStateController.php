<?php

namespace App\Http\Controllers;

use App\Http\Resources\VerifyStateResource;
use App\Models\VerifyState;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VerifyStateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $data = DB::table('verify_states')
                ->select('*')
                ->orderBy('verify_states.created_at', 'desc')
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
            $input = $request->all();

            $verifyState = VerifyState::create($input);
    
            return response()->json([
                'message' => 'Created verifystatus successfully!',
                'verifyState' => new VerifyStateResource($verifyState),
            ], 201);
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
     * @param  \App\Models\VerifyState  $verifyState
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{

            $verifyState = VerifyState::find($id);

            if ($verifyState === null) {
                return response()->json([
                    'message' => 'VerifyState not found!',
                ], 404);
            }
    
            return response()->json([
                'verifyState' => $verifyState,
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
     * @param  \App\Models\VerifyState  $verifyState
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{
            $verifyState = VerifyState::find($id);

            if ($verifyState === null) {
                return response()->json([
                    'message' => 'VerifyState not found!',
                ], 404);
            }
    
            $verifyState->update($request->all());
    
            return response()->json([
                'message' => 'updated successfully',
                've$verifyState' => $verifyState,
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
     * @param  \App\Models\VerifyState  $verifyState
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            $verifyState = VerifyState::find($id);

            if ($verifyState === null) {
                return response()->json([
                    'message' => 'VerifyStaus not found!',
                ], 404);
            }

            VerifyState::findOrFail($id)->delete();

            return response()->json([
                'message' => 'Deleted verifystatus successfully!',
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        }; 
        
    }
}

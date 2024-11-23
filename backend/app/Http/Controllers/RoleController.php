<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $data = DB::table('roles')
                ->select('*')
                ->orderBy('roles.updated_at', 'desc')
                ->get();
            return response()->json($data,200);

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
                'name' => 'required|string|unique:roles',
            ]);
    
            $role = Role::create([
                'name' => $data['name'],
            ]);
    
    
            return response()->json([
                'message' => 'Create role successfully!',
                'role' => $role,
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
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{

            $role = Role::find($id);

            if ($role === null) {
                return response()->json([
                    'message' => 'Role Not found!',
                ], 404);
            }
            return response()->json([
                'role' => $role,
            ],200);

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
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{

            $role = Role::find($id);

            if ($role === null) {
                return response()->json([
                    'message' => 'Role not found!',
                ], 404);
            }

            // dd($request['name']);

            if($role->name === $request['name']){
                return $role->update($request->all());
            }

            $rules = [
                'name' => 'max:255|unique:roles,name|regex:/^[^\s]*$/',
            ];

            $validate = Validator::make($request->all(), $rules);
            $validate->validate();

            $role->update($request->all());

            return response()->json([
                'message' => 'Updat role successfully!',
                'role' => $role,
            ], 201);

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
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            $role = Role::find($id);

            if ($role === null) {
                return response()->json([
                    'message' => 'Role not found!',
                ], 404);
            }
    
            Role::findOrFail($id)->delete();
    
            return response()->json([
                'message' => 'Delete role successfully!',
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };   
       
    }
}

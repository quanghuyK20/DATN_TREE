<?php

namespace App\Http\Controllers;

use App\Http\Requests\FollowRequest;
use App\Models\Follow;
use App\Repositories\FollowRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{

    protected $followRepository;

    public function __construct(FollowRepositoryInterface $followRepository)
    {
        $this->followRepository = $followRepository;
    }

    public function index()
    {
        
    }

    public function getFollowByUserId()
    {
        try{
            $user = Auth::user();
            $user_id = $user->id;
            $follow = $this->followRepository->getFollowByUserId($user_id);
            if(!$follow){
                return response()->json([
                    'message' => 'Follow not found!',
                ], 404);
            }

            return response()->json($follow);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        }
    }

    public function getListFollowByUserId($user_id){
        try{
            $follows = $this->followRepository->getListFollowByUserId($user_id);
            if(!$follows){
                return response()->json([
                    'message' => 'Follow not found!',
                ], 404);
            }

            return response()->json($follows);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        }
    }

    public function store(FollowRequest $request)
    {
        try{
            $user = Auth::user();
            $user_id = $user->id;
            $input = $request->all();
            $input['user_id'] = $user_id;
            $follow = $this->followRepository->createFollow($input);
            return response()->json([
                'message' => 'Creat follow successfully!',
                'follow' => $follow,
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };   
    }


    public function destroy(Request $request){
        try{
            $input = $request->all();
            $user_id = $input['user_id'];
            $store_id = $input['store_id'];
            $follow = $this->followRepository->getFollowByIdAndStore($user_id,$store_id);
            if (!$follow) {
                return response()->json([
                    'message' => 'Follow not found!',
                ], 404);
            }

            $this->followRepository->deleteFollow($follow->id);
            
            return response()->json([
                'message' => 'Delete follow successfully!',
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };   
        
    }

}

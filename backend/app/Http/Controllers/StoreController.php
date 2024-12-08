<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequest;
use App\Http\Resources\StoreResource;
use App\Models\Store;
use App\Models\User;
use App\Repositories\FeedbackRepositoryInterface;
use App\Repositories\FollowRepositoryInterface;
use App\Repositories\ProductRepositoryInterface;
use App\Repositories\StoreRepositoryInterface;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class StoreController extends Controller
{

    protected $productRepository;
    protected $feedbackRepository;
    protected $storeRepository;
    protected $followRepository;

    public function __construct(
        ProductRepositoryInterface $productRepository,
        FeedbackRepositoryInterface $feedbackRepository,
        StoreRepositoryInterface $storeRepository,
        FollowRepositoryInterface $followRepository
    )
    {
        $this->productRepository = $productRepository;
        $this->feedbackRepository = $feedbackRepository;
        $this->storeRepository = $storeRepository;
        $this->followRepository = $followRepository;
    }

    public function index(Request $request)
    {
        try {
            // Get Params
            $limit = $request->get('limit', 10);
            $page = $request->get('page', 1);
            $txt_search = $request->get('txt_search', '');
            $is_deleted = $request->get('is_deleted', null);

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
                'is_deleted' =>  $is_deleted,
                //get store account verified
                'verify_state_id' => 2
            ];

            $stores = $this->storeRepository->getListStores($params);

            return response()->json($stores, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };

    }

    public function getListStoreHome(){
        try{
            $stores = Store::all()->where('deleted_at', 0)->where('verify_state_id',2);
            return response()->json([StoreResource::collection($stores)],200);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };
    }

    public function getStoreByOwnerId($ownerId){
        try{
            $store = $this->storeRepository->getStoreByOwnerId($ownerId);
            return response()->json($store,200);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        }
    }

    public function getInfoStoreById($store_id)
    {
        try{
            $store = $this->storeRepository->getStoreById($store_id);

            if ($store === null) {
                return response()->json([
                    'message' => 'Store not found!',
                ], 404);
            }

            $products = $this->productRepository->getProductByStoreId($store_id);
            $feedbacks = $this->feedbackRepository->getFeedbackByStoreId($store_id);
            $follows = $this->followRepository->getFollowByStoreId($store_id);

            $now = Carbon::now();
            $created_at = $store->created_at;
            $participation_time = $created_at->diffForHumans($now);
            return response([
                'product_count' => count($products),
                'feedback_count' => count($feedbacks),
                'follow_count' => count($follows),
                'name' => $store->name,
                'address' => $store->address,
                'avatar' => $store->avatar,
                'participation_time' => $participation_time,
                'owner_id' => $store->owner_id
            ], 200);
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
    public function store(StoreRequest $request)
    {
        try{
            $input = $request->all();
            $input['verify_state_id'] = 1;
            $input['deleted_at'] = 0;
            $ownerId = $input['owner_id'];
            $user = User::find($ownerId);

            //Update phone number for account
            if($input['phone_number']){
                $user->update([
                    'phone_number' => $input['phone_number']]
                );
            }
            $store = Store::create($input);
            return response()->json([
                'message' => 'Creat store successfully!',
                'store' => $store,
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
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
            $store = Store::all()->where('id',$id);

            return response()->json(StoreResource::collection($store));
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
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Http\Response
     */
    public function update(StoreRequest $request, $id)
    {
        try{
            $store = Store::find($id);

            if ($store === null) {
                return response()->json([
                    'message' => 'Store not found!',
                ], 404);
            }

            $input = $request->all();

            if ($request->hasFile('avatar')) {

                $destination = $store->avatar;


                if (File::exists($destination)) {
                    File::delete($destination);
                }

                $file = $request->file('avatar');
                $extention = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extention;
                $destinationPath = 'images/stores/';
                $file->move($destinationPath, $filename);
                $input['avatar'] = 'images/stores/' . $filename;
            }


            $store->update($input);

            return response()->json([
                'message' => 'Update store successfully!',
                'store' => new StoreResource($store),
            ], 200);
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
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,$id)
    {
        try{
            $store = Store::find($id);

            $input = $request->all();

            if ($store === null) {
                return response()->json([
                    'message' => 'Store not found!',
                ], 404);
            }

            if ($store->deleted_at == 1) {
                return response()->json([
                    'message' => 'Store was previously deleted!',
                ], 301);
            }

            $input['deleted_at'] = 1;

            $store->update($input);

            return response()->json([
                'message' => 'Delete store successfully!',
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };


    }
}

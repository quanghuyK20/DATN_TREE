<?php

namespace App\Http\Controllers;

use App\Models\ShippingUnit;
use App\Models\User;
use App\Repositories\ShippingUnitRepositoryInterface;
use Exception;
use Illuminate\Http\Request;

class ShippingUnitController extends Controller
{
    protected $shippingUnitRepository;
    public function __construct(
        ShippingUnitRepositoryInterface $shippingUnitRepository
    )
    {
        $this->shippingUnitRepository = $shippingUnitRepository;
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
                //get shipping unit account verified
                'verify_state_id' => 2
            ];

            $shippingUnits = $this->shippingUnitRepository->getListShippingUnit($params);

            return response()->json($shippingUnits, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    public function getListStoreHome(){
        try{
            $shippingUnits = $this->shippingUnitRepository->getListShippingUnitHome();
            return response()->json($shippingUnits,200);
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

            // Default value
            $input['deleted_at'] = 0;
            $input['verify_state_id'] = 1;
            
            $ownerId = $input['owner_id'];
            $user = User::find($ownerId);
            
            //Update phone number for account
            if($input['phone_number']){
                $user->update([
                    'phone_number' => $input['phone_number']]
                );
            }
            
            $shippingUnit = $this->shippingUnitRepository->createShippingUnit($input);
            return response()->json([
                'message' => 'Created shipping unit successfully',
                'shippingUnit' => $shippingUnit,
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        }
    }
}

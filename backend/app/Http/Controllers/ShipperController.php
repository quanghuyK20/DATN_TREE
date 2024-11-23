<?php

namespace App\Http\Controllers;

use App\Models\Shipper;
use App\Models\User;
use App\Repositories\ShipperRepositoryInterface;
use Exception;
use Illuminate\Http\Request;

class ShipperController extends Controller
{
    
    protected $shipperRepository;
    public function __construct(
        ShipperRepositoryInterface $shipperRepository
    )
    {
        $this->shipperRepository = $shipperRepository;
    }

    public function index(Request $request)
    {
        try {
            // Get Params
            $limit = $request->get('limit', 10);
            $page = $request->get('page', 1);
            $txt_search = $request->get('txt_search', '');
            $is_deleted = $request->get('is_deleted', null);
            $station_id = $request->get('station_id', null);
            $owner_id = $request->get('owner_id', null);

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
                'verify_state_id' => 2,
                'station_id' => $station_id,
                'owner_id' => $owner_id
            ];

            $shippers = $this->shipperRepository->getListShipper($params);

            return response()->json($shippers, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    public function getShipperByShippingUnit($station_id){
        try {
            $shippers = $this->shipperRepository->getListShipperByShippingUnit($station_id);
            return response()->json($shippers, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    public function store(Request $request)
    {
        try {
            $input = $request->all();

            // Default value
            $input['deleted_at'] = 0;
            $input['verify_state_id'] = 1;
            
            $ownerId = $input['user_id'];
            $user = User::find($ownerId);
            
            //Update phone number and address for account
            if($input['address'] && $input['address']){
                $user->update([
                    'phone_number' => $input['phone_number'],
                    'address' => $input['address']
                    ]
                );
            }
            
            $shipper = Shipper::create($input);
            return response()->json([
                'message' => 'Created shipping successfully',
                'shipper' => $shipper,
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        }
    }
}

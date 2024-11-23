<?php

namespace App\Http\Controllers;

use App\Repositories\ShipperRepositoryInterface;
use App\Repositories\ShippingUnitRepositoryInterface;
use App\Repositories\StoreRepositoryInterface;
use Exception;
use Illuminate\Http\Request;

class VerifyController extends Controller
{
    protected $storeRepository;
    protected $shippingUnitRepository;
    protected $shipperRepository;
    public function __construct(
        StoreRepositoryInterface $storeRepository,
        ShippingUnitRepositoryInterface $shippingUnitRepository,
        ShipperRepositoryInterface $shipperRepository
    )
    {
        $this->storeRepository = $storeRepository;
        $this->shippingUnitRepository = $shippingUnitRepository;
        $this->shipperRepository = $shipperRepository;
    }

    public function getStoresNotYetVerify(Request $request)
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
                //get store account not yet verified
                'verify_state_id' => 1
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

    public function getShippingUnitsNotYetVerify(Request $request)
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
                'verify_state_id' => 1
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

    public function getListShipperNotYetVerify(Request $request){
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
                'verify_state_id' => 1,
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

    public function verifyStore($id){
        try{
            $store = $this->storeRepository->getStoreById($id);
            if ($store === null) {
                return response()->json([
                    'message' => 'Store not found!',
                ], 404);
            }

            $store->update([
                'verify_state_id' => 2
            ]);

            return response()->json([
                'message' => 'Verify thành công',
                'store' => $store
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };
    }

    public function verifyShippingUnit($id){
        try{
            $shippingUnit = $this->shippingUnitRepository->getShippingUnitById($id);
            if ($shippingUnit === null) {
                return response()->json([
                    'message' => 'Shipping units not found!',
                ], 404);
            }

            $shippingUnit->update([
                'verify_state_id' => 2
            ]);

            return response()->json([
                'message' => 'Verify thành công',
                'shipping-unit' => $shippingUnit
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };
    }

    
    public function verifyShipper($id){
        try{
            $shippingUnit = $this->shippingUnitRepository->getShippingUnitById($id);
            if ($shippingUnit === null) {
                return response()->json([
                    'message' => 'Shipping units not found!',
                ], 404);
            }

            $shippingUnit->update([
                'verify_state_id' => 2
            ]);

            return response()->json([
                'message' => 'Verify thành công',
                'shipping-unit' => $shippingUnit
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };
    }
}

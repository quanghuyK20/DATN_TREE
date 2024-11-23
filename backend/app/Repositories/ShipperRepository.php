<?php

namespace App\Repositories;

use App\Models\Shipper;

class ShipperRepository extends Repository implements ShipperRepositoryInterface
{
    public function getModel()
    {
        return Shipper::class;
    }

    public function getListShipper($params)
    {
        $shippers = Shipper::join('users','shippers.user_id', 'users.id')
                ->join('shipping_units', 'shippers.station_id', 'shipping_units.id')
                ->select('shippers.id as id', 'users.name as user_name', 'users.email as email',
                'users.phone_number as phone_number', 'shipping_units.address as address', 'users.avatar as avatar','shippers.deleted_at as deleted_at', 'shipping_units.owner_id as owner_id')
                        ->where(function ($query) use ($params) { // Moved 'where' condition here
                            $query->where('shipping_units.name', 'like', '%' . $params['txt_search'] . '%')
                                ->orWhere('shipping_units.address', 'like', '%' . $params['txt_search'] . '%')
                                ->orWhere('users.name', 'like', '%' . $params['txt_search'] . '%')
                                ->orWhere('users.phone_number', 'like', '%' . $params['txt_search'] . '%');
                        });

        if (isset($params['is_deleted'])) {
            $shippers->where('shipping_units.deleted_at', $params['is_deleted']); 
        } else {
            $shippers->whereNotNull('shipping_units.deleted_at'); 
        }

        if (isset($params['verify_state_id'])){
            $shippers->where('shippers.verify_state_id', $params['verify_state_id']); 
        } else {
            $shippers->whereNotNull('stores.deleted_at'); 
        }

        if (isset($params['station_id'])){
            $shippers->where('shippers.station_id', $params['station_id']); 
        } else {
            $shippers->whereNotNull('shippers.station_id'); 
        }

        if(isset($params['owner_id'])){
            $shippers->where('shipping_units.owner_id', $params['owner_id']);
        }else {
            $shippers->whereNotNull('shipping_units.owner_id'); 
        }

        return $shippers->paginate($params['limit']);
    }

    public function getShipperById($id){
        return Shipper::find($id);
    }

    public function getListShipperByShippingUnit($station_id){
        $shippers = Shipper::join('users','shippers.user_id', 'users.id')
                            ->join('shipping_units', 'shippers.station_id', 'shipping_units.id')
                            ->select('shippers.id as id','users.id as owner_id', 'users.name as user_name', 'shippers.verify_state_id as verify_state_id', 'shippers.deleted_at as deleted_at')
                            ->where('shippers.verify_state_id', 2) // verified
                            ->where('shippers.deleted_at', 0) // exits
                            ->where('shipping_units.owner_id', $station_id)->get();
        return $shippers;
    }

}

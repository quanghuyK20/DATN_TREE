<?php

namespace App\Repositories;

use App\Models\ShippingUnit;
use App\Repositories\ShippingUnitRepositoryInterface;

class ShippingUnitRepository extends Repository implements ShippingUnitRepositoryInterface
{
    public function getModel()
    {
        return ShippingUnit::class;
    }

    public function getListShippingUnit($params)
    {
        $shippingUnits = ShippingUnit::join('users','shipping_units.owner_id', 'users.id')
                ->select('shipping_units.id as id', 'users.name as user_name', 'shipping_units.name as name','price' ,
                'users.phone_number as phone_number', 'shipping_units.address as address', 'users.avatar as avatar', 'users.email as email','shipping_units.deleted_at as deleted_at')
                        ->where(function ($query) use ($params) { // Moved 'where' condition here
                            $query->where('shipping_units.name', 'like', '%' . $params['txt_search'] . '%')
                                ->orWhere('shipping_units.address', 'like', '%' . $params['txt_search'] . '%')
                                ->orWhere('users.name', 'like', '%' . $params['txt_search'] . '%')
                                ->orWhere('users.phone_number', 'like', '%' . $params['txt_search'] . '%');
                        });

        if (isset($params['is_deleted'])) {
            $shippingUnits->where('shipping_units.deleted_at', $params['is_deleted']); 
        } else {
            $shippingUnits->whereNotNull('shipping_units.deleted_at'); 
        }

        if (isset($params['verify_state_id'])){
            $shippingUnits->where('shipping_units.verify_state_id', $params['verify_state_id']); 
        } else {
            $shippingUnits->whereNotNull('stores.deleted_at'); 
        }

        return $shippingUnits->paginate($params['limit']);
    }

    public function getListShippingUnitHome()
    {
        $shippingUnits = ShippingUnit::join('users','shipping_units.owner_id', 'users.id')
                                    ->select('shipping_units.id as id', 'users.name as user_name', 'shipping_units.name as name','price' ,
                                    'users.phone_number as phone_number', 'shipping_units.address as address')
        ->where('shipping_units.deleted_at', 0)->where('verify_state_id',2)->get();

        return $shippingUnits;
    }

    public function getShippingUnitById($id){
        return ShippingUnit::find($id);
    }

    public function createShippingUnit($newUser)
    {
        return ShippingUnit::create($newUser);
    }
}

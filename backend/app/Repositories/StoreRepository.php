<?php

namespace App\Repositories;

use App\Models\Store;
use App\Repositories\StoreRepositoryInterface;

class StoreRepository extends Repository implements StoreRepositoryInterface
{
    public function getModel()
    {
        return Store::class;
    }

    public function getListStores($params)
    {
        $stores = Store::join('users', 'stores.owner_id', 'users.id')
            ->select('stores.id','stores.name AS store_name','stores.address as store_address', 'stores.avatar as store_avatar', 'users.phone_number as phone_number', 'users.email as email')
            ->where(function ($query) use ($params) { // Moved 'where' condition here
                $query->where('stores.name', 'like', '%' . $params['txt_search'] . '%')
                    ->orWhere('stores.address', 'like', '%' . $params['txt_search'] . '%')
                    ->orWhere('users.phone_number', 'like', '%' . $params['txt_search'] . '%');
            });

        if (isset($params['is_deleted'])) {
            $stores->where('stores.deleted_at', $params['is_deleted']); 
        } else {
            $stores->whereNotNull('stores.deleted_at'); 
        }

        if (isset($params['verify_state_id'])){
            $stores->where('stores.verify_state_id', $params['verify_state_id']); 
        } else {
            $stores->whereNotNull('stores.deleted_at'); 
        }

        return  $stores->paginate($params['limit']);
    }

    public function getStoreById($id)
    {
        return Store::find($id);
    }

    public function getStoreByOwnerId($ownerId){
        return Store::where('owner_id',$ownerId)->first();
    }
}

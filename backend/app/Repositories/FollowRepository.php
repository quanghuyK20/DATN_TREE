<?php

namespace App\Repositories;

use App\Models\Follow;
use App\Repositories\FollowRepositoryInterface;

class FollowRepository extends Repository implements FollowRepositoryInterface
{
    public function getModel()
    {
        return Follow::class;
    }

    public function getListFollows($params){

    }

    public function getFollowByStoreId($store_id){
        return Follow::where('store_id',$store_id)->get();
    }
    
    public function getFollowByUserId($user_id){
        return Follow::where('user_id',$user_id)->first();
    }

    public function getListFollowByUserId($user_id){
        $follows = Follow::join('stores', 'follows.store_id','stores.id')
        ->select(
            'follows.id','stores.name as store_name','stores.owner_id as user_id','stores.id as store_id','stores.address as store_address', 'stores.avatar as store_avatar','follows.user_id as user_id'
        );
        $follows = $follows
                    ->where('user_id',$user_id)
                    ->get();
        return $follows;

        return Follow::where('user_id',$user_id)->get();
    }

    public function getFollowById($id){
        return Follow::find($id);
    }

    public function getFollowByIdAndStore($user_id,$store_id){
        return Follow::where('user_id',$user_id)->where('store_id',$store_id)->first();
    }

    public function createFollow($newFollow){
        return Follow::create($newFollow);
    }

    public function deleteFollow($id){
        return Follow::findOrFail($id)->delete();
    }

}

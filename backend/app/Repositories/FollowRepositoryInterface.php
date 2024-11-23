<?php

namespace App\Repositories;

interface FollowRepositoryInterface {

    public function getListFollows($params);

    public function getFollowByStoreId($store_id);

    public function getFollowById($id);

    public function createFollow($newFollow);

    public function getFollowByUserId($user_id);

    public function getListFollowByUserId($user_id);

    public function getFollowByIdAndStore($user_id,$store_id);

    public function deleteFollow($id);
}
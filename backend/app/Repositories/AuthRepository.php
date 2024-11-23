<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\AuthRepositoryInterface;

class AuthRepository extends Repository implements AuthRepositoryInterface
{
    public function getModel()
    {
        return User::class;
    }

    public function getUserStoreByToken($id)
    {
        $user = User::join('stores', 'users.id', 'stores.owner_id')
                    ->select('users.*', 'stores.id as store_id')
                    ->where('users.id', $id)
                    ->first();
        return $user;
    }
}

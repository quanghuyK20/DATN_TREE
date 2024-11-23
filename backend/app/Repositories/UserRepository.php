<?php

namespace App\Repositories;

use App\Repositories\UserRepositoryInterface;
use App\Models\User;

class UserRepository extends Repository implements UserRepositoryInterface
{
    public function getModel()
    {
        return User::class;
    }

    public function getListUsers($params)
    {
        $users = User::where(function ($query) use ($params) {
            $query->where('name', 'like', '%' . $params['txt_search'] . '%')
                ->orWhere('email', 'like', '%' . $params['txt_search'] . '%')
                ->orWhere('address', 'like', '%' . $params['txt_search'] . '%')
                ->orWhere('phone_number', 'like', '%' . $params['txt_search'] . '%');
        });

        if (isset($params['is_deleted'])) {
            $users->where('deleted_at', $params['is_deleted']);
        } else {
            $users->whereNotNull('deleted_at');
        }

        $users = $users->paginate($params['limit']);

        return $users;
    }

    public function getUserById($id){
        return User::find($id);
    }

    public function getUserByEmail($email){
        return User::where('email',$email)->first();
    }

    public function createUser($newUser){
        return User::create($newUser);
    }
}

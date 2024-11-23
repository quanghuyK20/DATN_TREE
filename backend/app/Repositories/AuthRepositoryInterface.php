<?php

namespace App\Repositories;

interface AuthRepositoryInterface {

    public function getUserStoreByToken($id);
}
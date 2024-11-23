<?php

namespace App\Repositories;

interface UserRepositoryInterface {

    public function getListUsers($params);

    public function getUserById($id);

    public function getUserByEmail($email);

    public function createUser($newUser);
}
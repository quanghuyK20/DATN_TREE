<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VerifyState extends Model
{
    use HasFactory;

    protected $fillable = ['state','note'];

    public function store(){
        return $this->hasOne(Store::class);
    }
}
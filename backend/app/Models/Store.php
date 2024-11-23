<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $fillable = ['name','address','avatar','owner_id','verify_state_id','deleted_at'];

    public function product(){
        return $this->hasMany(Product::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function verifyState(){
        return $this->belongsTo(VerifyState::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingUnit extends Model
{
    use HasFactory;

    protected $fillable = ['name','address','avatar','price','owner_id','verify_state_id', 'deleted_at'];

}

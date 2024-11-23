<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderReceiver extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','name','address','phone_number','deleted_at'];

    public function order(){
        return $this->hasOne(Order::class);
    }
}

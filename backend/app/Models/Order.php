<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','product_id','transport_id','receiver_id','order_date','message','status_id','total','price', 'shipper_id'];

    public function product(){
        return $this->belongsTo(Product::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function orderReceiver(){
        return $this->belongsTo(OrderReceiver::class);
    }

    public function transport(){
        return $this->belongsTo(Transport::class);
    }

    public function orderStatus(){
        return $this->belongsTo(OrderStatus::class);
    }

    public function feedback(){
        return $this->hasOne(Feedback::class);
    }

}

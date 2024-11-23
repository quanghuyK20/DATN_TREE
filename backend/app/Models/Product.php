<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name','price','store_id','category_id','img','desc','amount','deleted_at'];

    public function store(){
        return $this->belongsTo(Store::class);
    }

    public function productdetail(){
        return $this->hasOne(ProductDetail::class);
    }

    public function feedback(){
        return $this->hasMany(Feedback::class);
    }

    public function cart(){
        return $this->belongsTo(Cart::class);
    }

    public function productCategories(){
        return $this->belongsTo(ProductCategory::class,'category_id');
    }

}

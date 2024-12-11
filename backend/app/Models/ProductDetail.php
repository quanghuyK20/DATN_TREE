<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetail extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'style', 'desc_detail','img_1','img_2','img_3','img_4'];

    public function product(){
        return $this->belongsTo(Product::class);
    }
}

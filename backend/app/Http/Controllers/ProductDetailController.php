<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\Store;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class ProductDetailController extends Controller
{
    public function update(Request $request, $product_id)
    {
        try {
            $input = $request->all();
            $user = Auth::user();
            $product = Product::find($product_id);
            $store_id = $product->store_id;
            $store = Store::find($store_id);
            $owner_id = $store->owner_id;
    
            $product_detail = ProductDetail::all()->where('product_id',$product_id)->first();
           
            // 405 Method Not Allowed – Phương thức không cho phép với user hiện tại.
            if($user->id != $owner_id || $user->role_id !=1){
                return response()->json([
                    'message' => 'This product does not belong to your shop!',
                ], 405);
            }
            else {
                
                if ($product_detail === null) {
                    return response()->json([
                        'message' => 'Please update product details before updating!',
                    ], 404);
                }else {
    
                    if ($request->hasFile('img_1')) {
                       
                        $destination = $product_detail->img_1;
            
                        if (File::exists($destination)) {
                            File::delete($destination);
                        }
            
                        $file = $request->file('img_1');
                        $extention = $file->getClientOriginalExtension();
                        $filename = time() . '.' . $extention;
                        $destinationPath = 'images/products-details/';
                        $file->move($destinationPath, $filename);
                        $input['img_1'] = 'images/products-details/' . $filename;
                        
                    }
        
                    if ($request->hasFile('img_2')) {
            
                        $destination = $product_detail->img_2;
            
                        if (File::exists($destination)) {
                            File::delete($destination);
                        }
            
                        $file = $request->file('img_2');
                        $extention = $file->getClientOriginalExtension();
                        $filename = time() . '.' . $extention;
                        $destinationPath = 'images/products-details/';
                        $file->move($destinationPath, $filename);
                        $input['img_2'] = 'images/products-details/' . $filename;
                    }
        
                    if ($request->hasFile('img_3')) {
            
                        $destination = $product_detail->img_3;
            
                        if (File::exists($destination)) {
                            File::delete($destination);
                        }
            
                        $file = $request->file('img_3');
                        $extention = $file->getClientOriginalExtension();
                        $filename = time() . '.' . $extention;
                        $destinationPath = 'images/products-details/';
                        $file->move($destinationPath, $filename);
                        $input['img_3'] = 'images/products-details/' . $filename;
                    }
        
                    if ($request->hasFile('img_4')) {
            
                        $destination = $product_detail->img_4;
            
                        if (File::exists($destination)) {
                            File::delete($destination);
                        }
            
                        $file = $request->file('img_4');
                        $extention = $file->getClientOriginalExtension();
                        $filename = time() . '.' . $extention;
                        $destinationPath = 'images/products-details/';
                        $file->move($destinationPath, $filename);
                        $input['img_4'] = 'images/products-details/' . $filename;
                    }
    
                    $product_detail->update($input);
            
                    return response()->json([
                        'message' => 'Update productdetail successfully!',
                        'product_detail' => $product_detail,
                    ], 201);
                }
        
            }

        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };
       
       
    }

}

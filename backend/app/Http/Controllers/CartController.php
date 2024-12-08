<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartProductResource;
use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $carts = Cart::all();
            return response()->json([CartResource::collection($carts)],200);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }


    public function getProductOfCartByUserID(){
        try{
            $user_id = Auth::user()->id;
            $carts = Cart::where('user_id', '=', $user_id)->get();
            return response()->json([CartResource::collection($carts)],200);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addProductToCart(Request $request)
    {
        try{
            $user = Auth::user();
            $user_id = $user->id;
            $amountNew = 0;
            $cart = Cart::where('user_id',$user_id)->where('product_id',$request['product_id'])->first();

            $product = Product::where('id',$request['product_id'])->first();

            // If already in cart
            if($cart){
                // Check if the number of products is larger than in the cart
                if($product->amount < $cart->amount){
                    return response()->json([
                        'message' => 'Không thể thêm số lượng đã chọn vào giỏ hàng vì nó đã vượt quá giới hạn sản phẩm của shop!',
                    ],400);
                }else {
                    $amountNew = $cart->amount + $request->amount;
                    // Check if the number of products in the shop is enough with the request from the customer + the product is in the cart
                    if($product->amount < $amountNew) {
                        return response()->json([
                            'message' => 'Không thể thêm số lượng đã chọn vào giỏ hàng vì nó đã vượt quá giới hạn sản phẩm của shop!',
                        ],400);
                    }else {
                        $cart->update([
                            'amount' => $amountNew
                        ]);
                    }
                }
            }else {
                // Check if the number of products of the shop can meet the requirements imported from customers
                if($product->amount < $request->amount){
                    return response()->json([
                        'message' => 'Shop không có đủ sản phẩm đáp ứng yêu cầu của bạn!',
                    ],400);
                }else {
                    $cart = Cart::create([
                        'user_id' => $user_id,
                        'product_id' => $request->product_id,
                        'amount' => $request->amount,
                    ]);
                }
            }

            return response()->json([
                'message' => 'Sản phẩm đã được thêm thành công!',
                'order_status' => $cart,
            ],201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }

    public function updateAmountProductToCart(Request $request)
    {
        try{

            $user = Auth::user();
            $user_id = $user->id;

            $cart = Cart::where('user_id',$user_id)->where('product_id',$request['product_id'])->first();

            $cart->amount = $request->amount;
            $cart->save();

            return response()->json([
                'message' => 'Update Amount product successfully!',
                'order_status' => $cart,
            ],201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function updateCountProduct($product_id)
    {
        try{

            $user = Auth::user();
            $user_id = $user->id;

            $product = Cart::select('*')
                -> where([
                    ['product_id','=', $product_id],
                    ['user_id','=',$user_id]
                ])->get();

            if (count($product) == 0) {
                return response()->json([
                    'message' => 'Product not found!',
                ], 404);
            }

            Cart::create([
                'product_id' => $product_id,
                'user_id' => $user_id
            ]);

            $productOfCart = Cart::select('*')
                -> where([
                    ['product_id','=', $product_id],
                    ['user_id','=',$user_id]
                ])->get();

            $countProduct = count($productOfCart);

            return response()->json([
                'productsOfCart' => $countProduct,
                'message' => 'Update cart successfully!',
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function destroyProductByCart($product_id)
    {
        try{
            $user = Auth::user();
            $user_id = $user->id;
            $product = Cart::select('*')
            -> where([
                ['product_id','=', $product_id],
                ['user_id','=',$user_id]
            ])->get();

            if (count($product) == 0) {
                return response()->json([
                    'message' => 'Not found',
                ], 404);
            }

            $product = Cart::select('*')
            -> where([
                ['product_id','=', $product_id],
                ['user_id','=',$user_id]
            ])->delete();

            return response()->json([
                'message' => 'Product removed from cart successfully!',
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }
}

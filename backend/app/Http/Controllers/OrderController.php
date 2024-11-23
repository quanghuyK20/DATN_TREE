<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductsOrder;
use App\Models\UserVoucher;
use App\Models\Voucher;
use App\Repositories\OrderRepositoryInterface;
use App\Repositories\ProductRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    protected $orderRepository;
    protected $productRepository;

    public function __construct(
        OrderRepositoryInterface $orderRepository,
        ProductRepositoryInterface $productRepository,
    ) {
        $this->orderRepository = $orderRepository;
        $this->productRepository = $productRepository;
    }

    public function index()
    {
        try {
            $orders = Order::all()->where('deleted_at', 0);
            return response()->json([OrderResource::collection($orders)], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    public function getAllByAdmin(Request $request)
    {
        try {
            // Get Params
            $limit = $request->get('limit', 10);
            $page = $request->get('page', 1);
            $txt_search = $request->get('txt_search', '');
            $transport_id = $request->get('transport_id', null);
            $status_id = $request->get('status_id', null);
            $order_date_start = $request->get('order_date_start', null);
            $order_date_end = $request->get('order_date_end', null);
            $store_id = $request->get('store_id', null);
            $owner_id = $request->get('owner_id', null);
            $shipping_unit_id = $request->get('shipping_unit_id',null);
            $shipper_id = $request->get('shipper_id', null);

            // Check limit and page
            if ($page < 1 || $limit < 0) {
                return response()->json([
                    'message' => 'Invalid query parameters!'
                ], 400);
            }

            //Create object params
            $params = [
                'limit' => $limit,
                'txt_search' => $txt_search,
                'transport_id' =>  $transport_id,
                'status_id' => $status_id,
                'order_date_start' => $order_date_start,
                'order_date_end' => $order_date_end,
                'store_id' => $store_id,
                'owner_id' => $owner_id,
                'shipping_unit_id' => $shipping_unit_id,
                'shipper_id' => $shipper_id,
            ];

            $orders = $this->orderRepository->getListOrders($params);

            return response()->json($orders, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    public function getProductsOrderByUser(){
        try{
            $user = Auth::user();
            $productsOrder = $this->orderRepository->getProductsOrderByUser($user->id);
            return response()->json($productsOrder, 200);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = Auth::user();
            $user_id = $user->id;
            $receiver_id = $request['receiver_id'];
            $transport_id = $request['transport_id'];
            //check null voucher
            $user_voucher_id = isset($request['user_voucher_id']) ? $request['user_voucher_id'] : null;
            $voucher_id = isset($request['voucher_id']) ? $request['voucher_id'] : null;            

            //check address receiver
            if ($receiver_id == null) {
                return response()->json([
                    'message' => 'Please select recipient!',
                ], 400);
            }

            //Check shipunit
            if ($transport_id == null) {
                return response()->json([
                    'message' => 'Please choose a delivery method!',
                ], 400);
            }
            $productList = $request['products'];
            //Check list products order
            if (empty($productList)) {
                return response()->json([
                    'message' => 'Please choose products!',
                ], 400);
            }

            $order = Order::create([
                'user_id' => $user_id,
                'transport_id' => $transport_id,
                'receiver_id' => $receiver_id,
                'order_date' => Carbon::now(),
                'message' => isset($request['message']) ? $request['message'] : "",
                'status_id'  => 1,
                'total' =>  0,
                'price' => $request['price'],
                'shipper_id' => 0
            ]);

            $productOrderList = [];
            foreach ($productList as $product) {
                $productGet = $this->productRepository->getProductAdminById($product['product_id']);
                //Check amount order with amount product
                if ($product['product_amount'] > $productGet->amount) {
                    //delete order when error 
                    // $order->delete();
                    DB::rollback();
                    return response()->json([
                        'message' => 'The current product does not meet this requirement. Please try again!',
                    ], 400);
                }

                $productOrder = ProductsOrder::create([
                    'product_id' =>  $product['product_id'],
                    'order_id' =>  $order->id,
                    'product_amount' => $product['product_amount'],
                ]);

                //delete product by cart
                $productByCart = Cart::where('product_id',$product['product_id'])->first();
                $productByCart->delete();
                $productGet->update([
                    'amount' => $productGet->amount - $productOrder->product_amount
                ]);
                array_push($productOrderList, $productOrder);
            }

            //Check user_voucher => not clear 
            if ($user_voucher_id) {
                $userVoucher = UserVoucher::find($user_voucher_id);
                if (!$userVoucher) {
                    return response()->json([
                        'message' => 'Please check voucher of you!',
                    ], 400);
                }
                $userVoucher->update([
                    'delete_at' => 1
                ]);
            }

            if ($voucher_id) {
                $voucher = Voucher::find($voucher_id);
                if (!$voucher) {
                    DB::rollback();
                    return response()->json([
                        'message' => 'Please check voucher of you!',
                    ], 400);
                }
                $voucher->update([
                    'quantity' => $voucher->quantity - 1
                ]);
            }

            DB::commit();
            return response()->json([
                'message' => 'Order successfully!',
                'order' => $order,
                'productOrderList' => $productOrderList
            ], 201);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $order = Order::all()->where('id', $id);
            return response()->json([OrderResource::collection($order)], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $order = Order::find($id);

            if ($order === null) {
                return response()->json([
                    'message' => 'Order not found!',
                ], 404);
            }
            $input = $request->all();
            $order->update($input);

            return response()->json([
                'message' => 'Update order successfully!',
                'order' => $order,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

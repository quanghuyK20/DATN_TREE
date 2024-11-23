<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\ProductsOrder;

class OrderRepository extends Repository implements OrderRepositoryInterface
{
    public function getModel()
    {
        return Order::class;
    }

    public function getListOrders($params)
    {
        $orders = Order::join('users', 'orders.user_id', 'users.id')
            // ->join('products', 'orders.product_id', 'products.id')
            ->join('shipping_units', 'orders.transport_id', 'shipping_units.id')
            ->join('order_receivers','orders.receiver_id','order_receivers.id')
            ->join('order_statuses','orders.status_id','order_statuses.id')
            // ->join('stores', 'products.store_id','stores.id')
            ->select('orders.id','users.name as user_name','users.avatar as avatar','shipping_units.name as transport_name', 'shipping_units.owner_id as shipping_unit_id',
                'order_receivers.name as receiver_name', 'order_date','orders.price', 'orders.shipper_id','order_statuses.name as status', 'order_statuses.id as status_id')
            ->where(function ($query) use ($params) { // Moved 'where' condition here
                $query->where('users.name', 'like', '%' . $params['txt_search'] . '%')
                    // ->orWhere('products.name', 'like', '%' . $params['txt_search'] . '%')
                    ->orWhere('orders.price', 'like', '%' . $params['txt_search'] . '%');
            });

        if (isset($params['transport_id'])) {
            $orders->where('orders.transport_id', $params['transport_id']); 
        } else {
            $orders->whereNotNull('orders.transport_id'); 
        }

        if (isset($params['status_id'])) {
            $orders->where('orders.status_id', $params['status_id']); 
        } else {
            $orders->whereNotNull('orders.status_id'); 
        }

        if (isset($params['order_date_start']) && isset($params['order_date_end'])) {
            $start_date = $params['order_date_start'];
            $end_date = $params['order_date_end'];
            $orders->whereBetween('orders.order_date', [$start_date, $end_date]);
        } else {
            $orders->whereNotNull('orders.order_date'); 
        }

        if(isset($params['store_id'])){
            $orders->where('store_id', $params['store_id']);
        }

        if(isset($params['shipping_unit_id'])){
            $orders->where('shipping_units.owner_id', $params['shipping_unit_id']);
        }

        if(isset($params['shipper_id'])){
            $orders->where('orders.shipper_id',$params['shipper_id']);
        }

        $orders = $orders->paginate($params['limit']);

        return $orders;
    } 

    public function getProductsOrderByUser($userId){
        $products = ProductsOrder::join('orders', 'products_orders.order_id', 'orders.id')
                                ->join('products', 'products_orders.product_id', 'products.id')
                                ->select('products_orders.id as id', 'products.name as product_name', 'products_orders.product_amount as product_amount', 
                                    'products.img as img', 'orders.user_id as owner_id', 'orders.status_id as status', 'products.price as product_price')
                                ->where('orders.user_id',$userId)
                                ->orderBy('products_orders.created_at', 'desc')
                                ->get();
            
        return $products;                
    }
}

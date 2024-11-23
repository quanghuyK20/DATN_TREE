<?php

namespace App\Repositories;

use App\Models\Feedback;
use App\Models\Product;
use App\Repositories\FeedbackRepositoryInterface;

class FeedbackRepository extends Repository implements FeedbackRepositoryInterface
{
    public function getModel()
    {
        return Feedback::class;
    }

    public function getListFeedbacks($params)
    {
        $feedbacks = Feedback::join('users', 'feedback.user_id', 'users.id')
            ->join('products', 'feedback.product_id', 'products.id')
            ->join('stores', 'products.store_id', 'stores.id')
            ->select(
                'feedback.id',
                'users.name AS user_name',
                'users.email AS user_email',
                'products.name as product_name',
                'feedback.img as feedback_img',
                'star',
                'content',
                'stores.id as store_id'
            )
            ->where(function ($query) use ($params) { // Moved 'where' condition here
                $query->where('products.name', 'like', '%' . $params['txt_search'] . '%')
                    ->orWhere('users.name', 'like', '%' . $params['txt_search'] . '%')
                    ->orWhere('content', 'like', '%' . $params['txt_search'] . '%');
            });

        if (isset($params['star'])) {
            $feedbacks->where('star', $params['star']);
        } else {
            $feedbacks->whereNotNull('star');
        }

        if (isset($params['store_id'])) {
            $feedbacks->where('store_id', $params['store_id']);
        }

        $feedbacks = $feedbacks->paginate($params['limit']);

        return $feedbacks;
    }

    public function getFeedbackDetailById($id)
    {
        $feedback = Feedback::join('users', 'feedback.user_id', 'users.id')
            ->join('products', 'feedback.product_id', 'products.id')
            ->select('feedback.id', 'users.name AS user_name', 'users.email AS user_email', 'products.name as product_name', 'feedback.img as feedback_img', 'star', 'content')
            ->where('feedback.id', $id)->get();
        return $feedback;
    }

    public function getFeedbackById($id)
    {
        return Feedback::all()->where('id', $id);
    }

    public function getFeedbackAdminById($id)
    {
        return Feedback::find($id);
    }

    public function getFeedbackByStoreId($store_id)
    {
        return Product::join('stores', 'products.store_id', 'stores.id')
            ->join('feedback', 'products.id', 'feedback.product_id')
            ->where('store_id', $store_id)
            ->get();
    }

    public function getFeedbackByProductId($product_id)
    {
        $feedbacks = Feedback::join('users', 'feedback.product_id', 'users.id')
            ->select('feedback.id as id','users.name as username', 'users.avatar as avatar', 'feedback.star as star', 'feedback.content as content',
             'feedback.created_at as time_created', 'feedback.product_id as product_id', 'feedback.img as img')
            ->where('product_id', $product_id)->get();
        return $feedbacks;
    }

    public function createFeedback($newUser)
    {
        return Feedback::create($newUser);
    }
}

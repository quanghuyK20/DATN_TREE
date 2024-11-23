<?php

namespace App\Repositories;

interface FeedbackRepositoryInterface {

    public function getListFeedbacks($params);

    public function getFeedbackById($id);

    public function getFeedbackAdminById($id);

    public function getFeedbackDetailById($id);

    public function getFeedbackByStoreId($store_id);

    public function getFeedbackByProductId($product_id);

    public function createFeedback($newFeedback);
}
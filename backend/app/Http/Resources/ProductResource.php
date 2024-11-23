<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'category_id' => $this->category_id,
            'store_id' => $this->store_id,
            'img' => $this->img,
            'deleted_at' => $this->deleted_at,
            'desc' => $this->desc,
            'detail' => $this->productdetail,
            // 'category' => $this-> productCategories,
            'feedbacks' => $this->feedbacks,
            'stores' => $this->stores,
        ];
    }
}

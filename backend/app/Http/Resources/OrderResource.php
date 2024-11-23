<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'user_id' => $this->user,
            'product' => $this->product,
            'transport' => $this->transport,
            'receiver' => $this->receiver,
            'order_date' => $this->order_date,
            'price' => $this->price,
            'message' => $this->message,
            'status' => $this->orderStatus,
            'total' => $this-> total,
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class StoreResource extends JsonResource
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
            'address' => $this->address,
            // 'avatar' => $this->avatar ? URL::to($this->avatar):null,
            'avatar' => $this->avatar,
            'owner_id' => $this->owner_id,
            'verify_state_id' => $this->verify_state_id,
            'deleted_at' => $this->deleted_at,
            'verify_state' => $this->verifyState,
            'products' => $this->products
        ];
    }
}

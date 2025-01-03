<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'style'=> ['required', 'string', 'unique:product_categories,style'],
            'name_jp'=> ['required', 'string', 'unique:product_categories,name_jp'],
            'name_vn'=> ['required', 'string', 'unique:product_categories,name_vn'],
            'detail'=> ['required', 'string']
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class UserRequest extends FormRequest
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
            'name' => 'required|string',
            // 'email' => 'required|email|string|unique:users,email',
            'email' => 'required|string',
            // 'password' => [
            //     'required',
            //     'min:6'
            // ],
            // 'confirm_password' => 'required_with:password|same:password|min:6',
            'role_id' => 'exists:roles,id',
            'address' => 'required|string',
            'phone_number' => 'required|string',
            'gender' => 'required',
            'birthday' => 'required|string'
        ];
    }
}

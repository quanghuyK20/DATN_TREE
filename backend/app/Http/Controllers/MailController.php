<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\ProductsOrder;
use App\Repositories\OrderRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

class MailController extends Controller
{
    protected $orderRepository;

        public function __construct(
            OrderRepositoryInterface $orderRepository,
        ) {
            $this->orderRepository = $orderRepository;
        }


    public function mailOrder(Request $request){
        try{
            $products = $request['products'];
            $paymentTotal = $request['price'];
            $mail = $request['email'];

            Mail::send('emails.contact',compact('products', 'paymentTotal'),function($email) use($mail){
                $email->subject('Order của quý khách tại HyTree Da Nang');
                $email->to( $mail ,'HyTree Da Nang');
            });
            return response()->json(['message' => 'Send mail contact successfully!',200]);

        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }

    public function mailRegister(Request $request){
        try{
            $role_id = $request['role_id'];
            $name = $request['name'];
            $mail = $request['email'];

            // if (empty($mail)) {
            //     return response()->json([
            //         'message' => 'Email address is required.',
            //     ], 400);
            // }

            Mail::send('emails.register',compact('role_id', 'name'),function($email) use($mail){
                $email->subject('Thông báo đăng ký thành viên HyTree Đà Nẵng');
                $email->to( $mail ,'HyTree Da Nang');
            });
            return response()->json(['message' => 'Send mail contact successfully !',200]);

        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage(),
            ],500);
        };
    }

    public function mailVerify(Request $request){
        try{
            $role_id = $request['role_id'];

            if($role_id === 3){
                $role = "Cửa hàng";
            }
            if($role_id === 4){
                $role = "Shipper";
            }

            if($role_id === 5){
                $role = "Đơn vị vận chuyển";
            }

            $name = $request['name'];
            $mail = $request['email'];

            Mail::send('emails.verify',compact('role', 'name'),function($email) use($mail){
                $email->subject('Xác thực tài khoản');
                $email->to( $mail ,'HyTree Đà Nẵng');
            });
            return response()->json(['message' => 'Send mail contact successfully !',200]);

        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }
}

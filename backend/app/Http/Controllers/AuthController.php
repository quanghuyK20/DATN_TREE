<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\AuthRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    protected $authRepository;

    public function __construct(
        AuthRepositoryInterface $authRepository
    )
    {
        $this->authRepository = $authRepository;
    }

    public function register(Request $request)
    {
        try{
            $data = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|string|unique:users,email',
                'password' => [
                    'required',
                    'min:6'
                    // 'confirmed',
                    // Password::min(8)->mixedCase()->numbers()->symbols()
                ],
                'confirm_password' => 'required_with:password|same:password|min:6',
                'role_id' => 'exists:roles,id',
            ]);

            // $data = $request->all();

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
                'role_id' => $data['role_id'],
                'deleted_at' => 0,
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
                'avatar'  => 'images/users/user-default.jpg',
                'birthday' => now(),
                'address' => '',
                'phone_number' => '',
                'gender' => 1,
            ]);

            $token = $user->createToken('main')->plainTextToken;

            return response([
                'message' => 'Đăng ký thành công',
                'user' => $user,
                'token' => $token
            ], 200);

        }catch(Exception $e){
            return response()->json([
                'message' => 'Đăng ký thất bại',
                'error' => $e,
            ],500);
        };

    }

    public function login(Request $request)
    {
        try{
            $data = $request->validate([
                'email' => 'required|email|string|exists:users,email',
                'password' => [
                    'required'
                ],
                'remember' => 'boolean'
            ]);

            $remember = $data['remember'] ?? false;
            unset($data['remember']);
            if (!Auth::attempt($data, $remember)) {
                return response([
                    'error' => 'The provided data are not correct!'
                ], 422);
            }
            /** @var \App\Models\User $user **/
            $user = Auth::user();
            $token = $user->createToken('main')->plainTextToken;

            return response([
                'message' => 'Login successfully!',
                // 'user' => $user,
                'token' => $token,
            ],200);

        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }

    public function googleLogin(Request $request)
    {
        try {
            // Lấy mã thông báo truy cập từ frontend
            $accessToken = $request->input('token');
            // Xác minh mã thông báo truy cập với Google
            $googleUser = Socialite::driver('google')->userFromToken($accessToken);
            $userAvatar = $googleUser->avatar;
            $findUser = User::where('email',  $googleUser->email)->first();
            if($findUser){
                $token = $findUser->createToken('main')->plainTextToken;
                return response([
                    'message' => 'Login successfully!',
                    'token' => $token,
                ],200);
            }else {
                $user = User::create([
                    'name' => $googleUser['name'],
                    'email' => $googleUser['email'],
                    'password' => bcrypt('123456'),
                    'role_id' => '2',
                    'deleted_at' => 0,
                    'email_verified_at' => now(),
                    'remember_token' => Str::random(10),
                    'avatar'  => $userAvatar,
                    'birthday' => now(),
                    'address' => '',
                    'phone_number' => '',
                    'gender' => 1,
                ]);

                $token = $user->createToken('main')->plainTextToken;

                return response([
                    'message' => 'Login successfully!',
                    'token' => $token
                ], 200);

            }
        } catch (Exception $e) {
            // Xử lý lỗi
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        }
    }

    public function getAuthenticatedUser(Request $request){
        try{
            $user = Auth::user();
            if($user->role_id == 3){
                return $this->authRepository->getUserStoreByToken($user->id);
            }
            else{
                return $user;
            }
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };
    }

    public function changePassword(Request $request)
    {
        try{

            if(!(Hash::check($request['current-password'],Auth::user()->password))){
                return response()->json([
                    'message' => 'Your current password does not matches with the password!',
                ], 401);
            }

            if(strcmp($request['current-password'],$request['new-password']) == 0){
                return response()->json([
                    'message' => 'New Password cannot be same as your current password!',
                ], 304);
            }

            $request->validate([
                'current-password' => 'required',
                'new-password' => [
                    'required',
                    'confirmed',
                    Password::min(8)->mixedCase()->numbers()->symbols()
                ],
            ]);
            /** @var \App\Models\User $user */
            $user = Auth::user();
            $user->password = bcrypt($request['new-password']);
            $user->save();

            return response()->json([
                'message' => 'Password successfully changed!',
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };


    }

    public function logout()
    {
        try{
            Auth::user()->tokens->each(function ($token, $key) {
                $token->delete();
            });

            return response()->json([
                'message' => 'Logged out success!'
            ],200);

        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }
}

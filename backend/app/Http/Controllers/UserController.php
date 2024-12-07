<?php


namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Repositories\UserRepositoryInterface;

class UserController extends Controller
{

    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }


    public function index(Request $request)
    {
        try {
            // Get Params
            $limit = $request->get('limit', 10);
            $page = $request->get('page', 1);
            $txt_search = $request->get('txt_search', '');
            $is_deleted = $request->get('is_deleted', null);

            // Check limit and page
            if ($page < 1 || $limit < 0) {
                return response()->json([
                    'message' => 'Invalid query parameters!'
                ], 400);
            }

            //Create object params
            $params = [
                'limit' => $limit,
                'txt_search' => $txt_search,
                'is_deleted' =>  $is_deleted
            ];

            $users = $this->userRepository->getListUsers($params);

            return response()->json($users, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        try {
            $input = $request->all();
            // Check Mail Exists
            $user = $this->userRepository->getUserByEmail($input['email']);
            if (!empty($user)) {
                return response()->json([
                    'message' => 'Email already exists!',
                ], 409);
            }

            // Default value
            $input['deleted_at'] = 0;
            $input['password'] = bcrypt($input['password']);

            $user = $this->userRepository->createUser($input);
            return response()->json([
                'message' => 'Created user successfully',
                'user' => new UserResource($user),
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        }
    }



    public function updateById(UserRequest $request, $id){
        try{
            $user = $this->userRepository->getUserById($id);
            if (isset($user)) {
                $input = $request->all();
                $user->update($input);
                return response()->json([
                    'message' => 'Cập nhật tài khoản thành công',
                ], 201);
            } else {
                return response()->json([
                    'message' => 'Không tìm thấy user!',
                ], 404);
            }
        }catch (Exception $e) {
            return response()->json([
                'message' => 'Cõ lỗi xảy ra trong quá trình cập nhật tài khoản!',
                'error' => $e,
            ], 500);
        }
    }

    public function getUserById($id){

        try {
            $user = $this->userRepository->getUserById($id);
            if (isset($user)) {
                return response()->json($user, 200);
            } else {
                return response()->json([
                    'message' => 'User not found!',
                ], 404);
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getUserByIdAdmin($id)
    {
        try {
            $users = User::all()->where('id', $id);
            return response()->json([UserResource::collection($users)], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getStoreByIdAdmin($id)
    {
        try {
            $users = User::all()->where('id', $id);
            return response()->json([UserResource::collection($users)], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    public function getUserByIdSelf()
    {

        try {
            $user = Auth::user();
            $user_id = $user->id;
            if (!$user_id) {

                return response()->json([
                    'message' => 'Not have access',
                ], 403);
            }
            $users = User::all()->where('id', $user_id);
            return response()->json([UserResource::collection($users)], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateUser(Request $request, $id)
    {
        try {

            $user_update = User::find($id);

            if ($user_update === null) {
                return response()->json([
                    'message' => 'User not found!',
                ], 404);
            }

            $input = $request->all();
            $user_update->update($input);

            return response()->json([
                'message' => 'Update user successfully',
                'user' => new UserResource($user_update),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    public function updateUserSelf(Request $request, $id)
    {
        try {
            $user = Auth::user();
            $user_id = $user->id;
            if ($user_id != $id) {

                return response()->json([
                    'message' => 'Not have access',
                ], 403);
            }

            $user_update = User::find($id);

            if ($user_update === null) {
                return response()->json([
                    'message' => 'User not found!',
                ], 404);
            }

            $input = $request->all();
            $user_update->update($input);

            return response()->json([
                'message' => 'Update user successfully',
                'user' => new UserResource($user_update),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function softDeleteById($id)
    {
        try {
            $user = $this->userRepository->getUserById($id);
            if (isset($user)) {
                if ($user['deleted_at'] == 1) {
                    return response()->json([
                        'message' => 'Người dùng đã bị xóa trước đó',
                    ], 403);
                }
                $input['deleted_at'] = 1;
                $user->update($input);
                return response()->json([
                    'message' => 'Xoá người dùng thành công',
                ], 201);
            } else {
                return response()->json([
                    'message' => 'User not found!',
                ], 404);
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }
}

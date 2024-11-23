<?php

namespace App\Http\Controllers;

use App\Http\Requests\FeedbackRequest;
use App\Models\Feedback;
use Illuminate\Http\Request;
use App\Http\Resources\FeedbackResource;
use App\Models\Product;
use App\Repositories\FeedbackRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Exception;

class FeedbackController extends Controller
{
    protected $feedbackRepository;

    public function __construct(FeedbackRepositoryInterface $feedbackRepository)
    {
        $this->feedbackRepository = $feedbackRepository;
    }

    public function index()
    {
        try{
            $feedbacks = Feedback::all();
            return response()->json([FeedbackResource::collection($feedbacks)],200);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };
    }

    public function getAllByAdmin(Request $request)
    {
        try {
            // Get Params
            $limit = $request->get('limit', 10);
            $page = $request->get('page', 1);
            $txt_search = $request->get('txt_search', '');
            $star = $request->get('star', null);
            $store_id = $request->get('store_id', null);

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
                'star' =>  $star,
                'store_id' => $store_id
            ];

            $products = $this->feedbackRepository->getListFeedbacks($params);

            return response()->json($products, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    public function store(Request $request)
    {
        try{
            $input = $request->all();
            $user = Auth::user();

            $input['user_id'] = $user->id;

            $feedback = Feedback::create($input);

            return response()->json([
                'message' => 'Created feedback successfully',
                'feedback' => new FeedbackResource($feedback),
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }


    public function getFeedbacksByProductId($id)
    {
        try{
            $feedbacks = $this->feedbackRepository->getFeedbackByProductId($id);
            $starMiddle = 0;
            $starCount = 0;
            foreach($feedbacks as $item){
                $starCount += $item->star;
            }
            $starMiddle = $starCount / count($feedbacks);
            return response()->json([
                "feedbacks" => $feedbacks,
                "starMiddle" => $starMiddle
            ],200);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };
    }

    public function getFeedbacksByStoreId($store_id)
    {
        try{
            $product = Product::all()->where('store_id', $store_id);
            $product_id = $product->id;
            $feedbacks = Feedback::all()->where('product_id', $product_id);
            return response()->json([FeedbackResource::collection($feedbacks)],200);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };
    }


    public function update(FeedbackRequest $request, $id)
    {
        try{
            $feedback = $this->feedbackRepository->getFeedbackAdminById($id);
            if ($feedback === null) {
                return response()->json([
                    'message' => 'Feedback not found!',
                ], 404);
            }

            $input = $request->all();

            $feedback->update($input);

            return response()->json([
                'message' => 'Update product successfully',
                'feedback' => $feedback
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }

    public function getFeedbackById($id){
        try{
            $feedback = $this->feedbackRepository->getFeedbackDetailById($id);
            if(isset($feedback)){
                return response()->json($feedback, 200);
            }else {
                return response()->json([
                    'message' => 'Feedback not found!',
                ], 404);
            }

        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        }
    }

    public function destroy($id)
    {
        try{
            $feedback = $this->feedbackRepository->getFeedbackAdminById($id);
            if (isset($feedback)) {
                $feedback->delete($id);
                return response()->json([
                    'message' => 'deleted successfully',
                ], 201);
            } else {
                return response()->json([
                    'message' => 'Feedback not found!',
                ], 404);
            }

        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };
    }
}

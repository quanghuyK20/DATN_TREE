<?php

namespace App\Http\Controllers;

use App\Models\ShippingUnit;
use App\Repositories\FeedbackRepositoryInterface;
use App\Repositories\ProductRepositoryInterface;
use App\Repositories\StoreRepositoryInterface;
use App\Repositories\UserRepositoryInterface;
use App\Repositories\VoucherRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class UploadController extends Controller
{
    protected $userRepository;
    protected $productRepository;
    protected $feedbackRepository;
    protected $voucherRepository;
    protected $storeRepository;

    public function __construct(
        UserRepositoryInterface $userRepository,
        ProductRepositoryInterface $productRepository,
        FeedbackRepositoryInterface $feedbackRepository,
        VoucherRepositoryInterface $voucherRepository,
        StoreRepositoryInterface $storeRepository
    )
    {
        $this->userRepository = $userRepository;
        $this->productRepository = $productRepository;
        $this->feedbackRepository = $feedbackRepository;
        $this->voucherRepository = $voucherRepository;
        $this->storeRepository = $storeRepository;
    }

    public function updateAvatarById(Request $request, $id){
        try{
            $user = $this->userRepository->getUserById($id);
            if (isset($user)) {
                $input = $request->all();
    
                // Check link image avatar
                if ($request->hasFile('avatar')) {
                    $file = $request->file('avatar');
                    if ($file->isValid()) {
                        if ($file->getSize() > 1024 * 1024) {
                            // file size exceeds 1MB
                            return response()->json(['error' => 'File size exceeds 1MB.'], 400);
                        }
                        $allowedExtensions = ['jpg', 'jpeg', 'png'];
                        $extension = strtolower($file->getClientOriginalExtension());
                        
                        if (!in_array($extension, $allowedExtensions)) {
                            // file extension not allowed
                            return response()->json(['error' => 'File type not allowed.'], 400);
                        }

                        $destination = $user->avatar;

                        if($destination != 'images/users/user-default.jpg'){
                            if (File::exists($destination)) {
                                File::delete($destination);
                            }
                        }
    
                        $destinationPath = 'images/users/';
                        $filename = time() . '.' . $extension;
                        $file->move($destinationPath, $filename);
                        $input['avatar'] = $destinationPath . $filename;
                    }else {
                        // file is not valid
                        return response()->json(['error' => 'Invalid file.'], 400);
                    }
                }           
                else {
                    // Default img avatar
                    $input['avatar'] = 'images/users/user-default.jpg';
                }
    
                $user->update($input);
                return response()->json([
                    'message' => 'update successfully',
                ], 201);
            } else {
                return response()->json([
                    'message' => 'User not found!',
                ], 404);
            }
        }catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        }
    }

    public function updateImgProductById(Request $request, $id){
        try{
            $product = $this->productRepository->getProductAdminById($id);
            if (isset($product)) {
                $input = $request->all();
    
                // Check link image 
                if ($request->hasFile('img')) {
                    $file = $request->file('img');
                    if ($file->isValid()) {
                        if ($file->getSize() > 1024 * 1024) {
                            // file size exceeds 1MB
                            return response()->json(['error' => 'File size exceeds 1MB.'], 400);
                        }
                        $allowedExtensions = ['jpg', 'jpeg', 'png'];
                        $extension = strtolower($file->getClientOriginalExtension());
                        
                        if (!in_array($extension, $allowedExtensions)) {
                            // file extension not allowed
                            return response()->json(['error' => 'File type not allowed.'], 400);
                        }

                        $destination = $product->img;

                        if($destination != 'images/products/product-default.png'){
                            if (File::exists($destination)) {
                                File::delete($destination);
                            }
                        }
    
                        $destinationPath = 'images/products/';
                        $filename = time() . '.' . $extension;
                        $file->move($destinationPath, $filename);
                        $input['img'] = $destinationPath . $filename;
                    }else {
                        // file is not valid
                        return response()->json(['error' => 'Invalid file.'], 400);
                    }
                }           
                else {
                    // Default img avatar
                    $input['img'] = 'images/products/product-default.png';
                }
    
                $product->update($input);
                return response()->json([
                    'message' => 'update successfully',
                ], 201);
            } else {
                return response()->json([
                    'message' => 'Product not found!',
                ], 404);
            }
        }catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        }
    }

    public function updateImgFeedbackById(Request $request, $id){
        try{
            $feedback = $this->feedbackRepository->getFeedbackAdminById($id);
            if (isset($feedback)) {
                $input = $request->all();
    
                // Check link image 
                if ($request->hasFile('img')) {
                    $file = $request->file('img');
                    if ($file->isValid()) {
                        if ($file->getSize() > 1024 * 1024) {
                            // file size exceeds 1MB
                            return response()->json(['error' => 'File size exceeds 1MB.'], 400);
                        }
                        $allowedExtensions = ['jpg', 'jpeg', 'png'];
                        $extension = strtolower($file->getClientOriginalExtension());
                        
                        if (!in_array($extension, $allowedExtensions)) {
                            // file extension not allowed
                            return response()->json(['error' => 'File type not allowed.'], 400);
                        }

                        $destination = $feedback->img;

                        if($destination != 'images/feedbacks/feedback-default.png'){
                            if (File::exists($destination)) {
                                File::delete($destination);
                            }
                        }
    
                        $destinationPath = 'images/feedbacks/';
                        $filename = time() . '.' . $extension;
                        $file->move($destinationPath, $filename);
                        $input['img'] = $destinationPath . $filename;
                    }else {
                        // file is not valid
                        return response()->json(['error' => 'Invalid file.'], 400);
                    }
                }           
                else {
                    // Default img avatar
                    $input['img'] = 'images/feedbacks/feedback-default.png';
                }
    
                $feedback->update($input);
                return response()->json([
                    'message' => 'update successfully',
                ], 201);
            } else {
                return response()->json([
                    'message' => 'Feedback not found!',
                ], 404);
            }
        }catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        }
    }

    public function updateImgVoucherById(Request $request, $id){
        try{
            $voucher = $this->voucherRepository->getVoucherById($id);
            if (isset($voucher)) {
                $input = $request->all();
    
                // Check link image 
                if ($request->hasFile('img')) {
                    $file = $request->file('img');
                    if ($file->isValid()) {
                        if ($file->getSize() > 1024 * 1024) {
                            // file size exceeds 1MB
                            return response()->json(['error' => 'File size exceeds 1MB.'], 400);
                        }
                        $allowedExtensions = ['jpg', 'jpeg', 'png'];
                        $extension = strtolower($file->getClientOriginalExtension());
                        
                        if (!in_array($extension, $allowedExtensions)) {
                            // file extension not allowed
                            return response()->json(['error' => 'File type not allowed.'], 400);
                        }

                        $destination = $voucher->img;

                        if($destination != 'images/vouchers/voucher-default.png'){
                            if (File::exists($destination)) {
                                File::delete($destination);
                            }
                        }
    
                        $destinationPath = 'images/vouchers/';
                        $filename = time() . '.' . $extension;
                        $file->move($destinationPath, $filename);
                        $input['img'] = $destinationPath . $filename;
                    }else {
                        // file is not valid
                        return response()->json(['error' => 'Invalid file.'], 400);
                    }
                }           
                else {
                    // Default img avatar
                    $input['img'] = 'images/vouchers/voucher-default.png';
                }
    
                $voucher->update($input);
                return response()->json([
                    'message' => 'update successfully',
                ], 201);
            } else {
                return response()->json([
                    'message' => 'Voucher not found!',
                ], 404);
            }
        }catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        }
    }

    public function updateImgStoreById(Request $request, $id){
        try{
            $store = $this->storeRepository->getStoreById($id);
            if (isset($store)) {
                $input = $request->all();
    
                // Check link image 
                if ($request->hasFile('avatar')) {
                    $file = $request->file('avatar');
                    if ($file->isValid()) {
                        if ($file->getSize() > 1024 * 1024) {
                            // file size exceeds 1MB
                            return response()->json(['error' => 'File size exceeds 1MB.'], 400);
                        }
                        $allowedExtensions = ['jpg', 'jpeg', 'png'];
                        $extension = strtolower($file->getClientOriginalExtension());
                        
                        if (!in_array($extension, $allowedExtensions)) {
                            // file extension not allowed
                            return response()->json(['error' => 'File type not allowed.'], 400);
                        }

                        $destination = $store->img;

                        if($destination != 'images/stores/store-default.png'){
                            if (File::exists($destination)) {
                                File::delete($destination);
                            }
                        }
    
                        $destinationPath = 'images/stores/';
                        $filename = time() . '.' . $extension;
                        $file->move($destinationPath, $filename);
                        $input['avatar'] = $destinationPath . $filename;
                    }else {
                        // file is not valid
                        return response()->json(['error' => 'Invalid file.'], 400);
                    }
                }           
                else {
                    // Default img avatar
                    $input['avatar'] = 'images/stores/store-default.png';
                }
    
                $store->update($input);
                return response()->json([
                    'message' => 'update successfully',
                ], 201);
            } else {
                return response()->json([
                    'message' => 'store not found!',
                ], 404);
            }
        }catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        }
    }

    public function updateImgShipperUnitById(Request $request, $id){
        try{
            $shipperUnit = ShippingUnit::find($id);
            if (isset($shipperUnit)) {
                $input = $request->all();
    
                // Check link image 
                if ($request->hasFile('avatar')) {
                    $file = $request->file('avatar');
                    if ($file->isValid()) {
                        if ($file->getSize() > 1024 * 1024) {
                            // file size exceeds 1MB
                            return response()->json(['error' => 'File size exceeds 1MB.'], 400);
                        }
                        $allowedExtensions = ['jpg', 'jpeg', 'png'];
                        $extension = strtolower($file->getClientOriginalExtension());
                        
                        if (!in_array($extension, $allowedExtensions)) {
                            // file extension not allowed
                            return response()->json(['error' => 'File type not allowed.'], 400);
                        }

                        $destination = $shipperUnit->img;

                        if($destination != 'images/shipperUnits/shipperUnit-default.png'){
                            if (File::exists($destination)) {
                                File::delete($destination);
                            }
                        }
    
                        $destinationPath = 'images/shipperUnits/';
                        $filename = time() . '.' . $extension;
                        $file->move($destinationPath, $filename);
                        $input['avatar'] = $destinationPath . $filename;
                    }else {
                        // file is not valid
                        return response()->json(['error' => 'Invalid file.'], 400);
                    }
                }           
                else {
                    // Default img avatar
                    $input['avatar'] = 'images/shipperUnits/shipperUnit-default.png';
                }
    
                $shipperUnit->update($input);
                return response()->json([
                    'message' => 'update successfully',
                ], 201);
            } else {
                return response()->json([
                    'message' => 'shipperUnit not found!',
                ], 404);
            }
        }catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        }
    }

}

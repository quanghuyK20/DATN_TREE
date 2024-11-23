<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\Store;
use App\Repositories\ProductDetailRepositoryInterface;
use App\Repositories\ProductRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    protected $productRepository;
    protected $productDetailRepository;

    public function __construct(
        ProductRepositoryInterface $productRepository,
        ProductDetailRepositoryInterface $productDetailRepository
        )
    {
        $this->productRepository = $productRepository;
        $this->productDetailRepository = $productDetailRepository;
    }

    public function index()
    {
        try{
            $products = Product::all()->where('deleted_at', 0);
            return response()->json([ProductResource::collection($products)],200);
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
            $is_deleted = $request->get('is_deleted', null);
            $store_id = $request->get('store_id',null);
            $category_id = $request->get('category_id',null);

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
                'is_deleted' =>  $is_deleted,
                'store_id' => $store_id,
                'category_id' => $category_id
            ];

            $products = $this->productRepository->getListProducts($params);

            return response()->json($products, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    public function getProductsByParams(Request $request){
        try {
            // Get Params
            $txt_search = $request->get('txt_search', '');

            //Create object params
            $params = [
                'txt_search' => $txt_search
            ];

            $products = $this->productRepository->getListProductsByParams($params);

            return response()->json($products, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        };
    }

    public function createProduct(ProductRequest $request){
        try {
                $input = $request->all();
                // Default value
                $input['deleted_at'] = 0;
                $input['amount'] = 1;

                $product = $this->productRepository->createProduct($input);
                return response()->json([
                    'message' => 'Created product successfully',
                    'product' => new ProductResource($product),
                ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ], 500);
        }
    }

    public function getProductsSold(){
        try{
            $products = $this->productRepository->getProductsSold();
            return response()->json($products,200);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        }
    }

    public function store(Request $request)
    {
        try{
            $input = $request->all();
            $user = Auth::user();
            $id = $user->id;
            // dd($id);
            $store = Store::where('owner_id',$id)->first();
            if($store == null){
                return response()->json([
                    'message' => 'Vui lòng tạo Store trước khi tạo Product',
                ], 301);
            }

            $input['store_id'] = $store->id;
            $input['deleted_at'] = 0;

            if ($request->hasFile('img')) {
                $file = $request->file('img');
                $extention = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extention;
                $destinationPath = 'images/products';
                $file->move($destinationPath, $filename);
                $input['img'] = $destinationPath . "/" . $filename;
            }

            $product = Product::create($input);

            if ($request->hasFile('img_1')) {
                $file = $request->file('img_1');
                $extention = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extention;
                $destinationPath = 'images/products-details';
                $file->move($destinationPath, $filename);
                $input['img_1'] = $destinationPath . "/" . $filename;
            }
            if ($request->hasFile('img_2')) {
                $file = $request->file('img_2');
                $extention = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extention;
                $destinationPath = 'images/products-details';
                $file->move($destinationPath, $filename);
                $input['img_2'] = $destinationPath . "/" . $filename;
            }
            if ($request->hasFile('img_3')) {
                $file = $request->file('img_3');
                $extention = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extention;
                $destinationPath = 'images/products-details';
                $file->move($destinationPath, $filename);
                $input['img_3'] = $destinationPath . "/" . $filename;
            }
            if ($request->hasFile('img_4')) {
                $file = $request->file('img_4');
                $extention = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extention;
                $destinationPath = 'images/products-details';
                $file->move($destinationPath, $filename);
                $input['img_4'] = $destinationPath . "/" . $filename;
            }

            ProductDetail::create([
                'product_id' => $product->id,
                'desc_detail' => $input['desc_detail'],
                'img_1' => $input['img_1'],
                'img_2' => $input['img_2'],
                'img_3' => $input['img_3'],
                'img_4' => $input['img_4'],
            ]);

            return response()->json([
                'message' => 'Create product successfully!',
                'product' => new ProductResource($product),
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }

    public function show($id)
    {
        try{
            $product = $this->productRepository->getProductById($id);
            return response()->json($product,200);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }

    public function getProductsByStoreId($store_id){
        try {
            // $product = Product::all()->where('store_id', $store_id);
            $products = $this->productRepository->getProductByStoreId($store_id);
            return response()->json($products);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, $id)
    {
        try{
            $product = $this->productRepository->getProductAdminById($id);
            if ($product === null) {
                return response()->json([
                    'message' => 'Product not found!',
                ], 404);
            }

            $input = $request->all();

            $product->update($input);

            return response()->json([
                'message' => 'Update product successfully',
                'product' => new ProductResource($product),
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }


    public function softDeleteById($id)
    {
        try{
            $product = $this->productRepository->getProductAdminById($id);
            if (isset($product)) {
                if ($product['deleted_at'] == 1) {
                    return response()->json([
                        'message' => 'the product was previously deleted',
                    ], 403);
                }
                $input['deleted_at'] = 1;
                $product->update($input);
                return response()->json([
                    'message' => 'deleted successfully',
                ], 201);
            } else {
                return response()->json([
                    'message' => 'Product not found!',
                ], 404);
            }

        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };

    }

    public function deleteProductByOwner(Request $request,$id){
        try{
            $product = $this->productRepository->getProductAdminById($id);
            $productDetail = $this->productDetailRepository->getProductDetailById($id);
            if (!isset($product)) {
                return response()->json([
                    'message' => 'Product not found!',
                ], 404);

            }else {
                if(isset($productDetail)){
                    $productDetail->delete();
                }
                $product->delete();
                return response()->json([
                    'message' => 'deleted successfully',
                ], 201);
            }
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        }
    }
}

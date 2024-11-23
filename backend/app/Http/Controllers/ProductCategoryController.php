<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductCategoryRequest;
use App\Http\Resources\ProductCategoryResource;
use App\Models\ProductCategory;
use App\Repositories\ProductCategoryRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ProductCategoryController extends Controller
{
    protected $productCategoryRepository;

    public function __construct(ProductCategoryRepositoryInterface $productCategoryRepository)
    {
        $this->productCategoryRepository = $productCategoryRepository;
    }

    
    public function index()
    {
        try{
            $data = $this->productCategoryRepository->getListCategories();
            return response()->json([$data],200);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };   
       
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductCategoryRequest $request)
    {
        try{
            $input = $request->all();
            $productCategory = ProductCategory::create($input);

            return response()->json([
                'message' => 'Create productcategory successfully!',
                'food' => new ProductCategoryResource($productCategory),
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };   
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductCategory  $productCategory
     * @return \Illuminate\Http\Response
     */
    public function showById($id)
    {
        try{
            $productCategory = $this->productCategoryRepository->getCategoryById($id);

            if ($productCategory === null) {
                return response()->json([
                    'message' => 'ProductCategory not found!',
                ], 404);
            }
    
            return response()->json($productCategory);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };   
       
       
    }

    public function showByName(Request $request)
    {
        try{

            $name = $request->name;
            $productCategory = ProductCategory::where('name_jp', $name)->first();

            if ($productCategory === null) {
                return response()->json([
                    'message' => 'ProductCategory not found!',
                ], 404);
            }
    
            return response()->json(new ProductCategoryResource($productCategory));

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
     * @param  \App\Models\ProductCategory  $productCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{
            $productCategory = $this->productCategoryRepository->getCategoryById($id);

            if ($productCategory === null) {
                return response()->json([
                    'message' => 'ProductCategory not found',
                ], 404);
            }
    
            $input = $request->all();
    
            $productCategory->update($input);
    
            return response()->json([
                'message' => 'Update productCategory successfully',
                'productCategory' => new ProductCategoryResource($productCategory),
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e,
            ],500);
        };   
       
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductCategory  $productCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $productCategory = ProductCategory::where('id', '=', $id)->first();

        if ($productCategory === null) {
            return response()->json([
                'message' => 'ProductCategory not found',
            ], 404);
        }

        $destination = $productCategory->img;
        if (File::exists($destination)) {
            File::delete($destination);
        }
        ProductCategory::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Delete productCategory successfully',
        ], 201);
    }
}

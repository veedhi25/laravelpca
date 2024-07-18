<?php

namespace PickBazar\Http\Controllers;

use Exception;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use PickBazar\Database\Models\Tax;
use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\Type;
use Illuminate\Support\Facades\Schema;
use PickBazar\Database\Models\Product;
use PickBazar\Database\Models\Category;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Eloquent\Collection;
use PickBazar\Database\Models\MasterProduct;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Database\Models\VariationOption;
use PickBazar\Database\Repositories\ShopRepository;
use Cviebrock\EloquentSluggable\Services\SlugService;
use PickBazar\Http\Requests\MasterProductCreateRequest;
use PickBazar\Http\Requests\MasterProductUpdateRequest;
use PickBazar\Database\Repositories\MasterProductRepository;

class MasterProductController extends CoreController
{
    public $repository;

    public function __construct(MasterProductRepository $repository)
    {
        $this->repository = $repository;
    }


    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Product[]
     */
    public function index(Request $request)
    {

        $limit = $request->limit ?   $request->limit : 15;   

        return $this->repository->paginate($limit);
    }

    public function paginationProduct(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->with(['type', 'shop', 'categories', 'tags', 'variations.attribute'])->paginate($limit);
    }


    public function createdMasterProducts(Request $request)
    {
        $products_name=Product::where("shop_id",$request->shop_id)->pluck("name");
        $master_ids=MasterProduct::whereIn("name",$products_name)->pluck("id");
        return $master_ids;   
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param MasterProductCreateRequest $request
     * @return mixed
     */
    public function store(MasterProductCreateRequest $request)
    {
        if ($this->repository->adminPermission($request->user(), $request->shop_id)) {
            return $this->repository->storeProduct($request);
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param $slug
     * @return JsonResponse
     */
    public function show($slug, Request $request)
    {
        try {
            $limit = isset($request->limit) ? $request->limit : 10;
            $product = $this->repository
                ->with(['type', 'shop', 'categories', 'tags', 'variations.attribute.values', 'variation_options'])
                ->findOneByFieldOrFail('id', $slug);
            // $product->related_products = $this->repository->fetchRelated($slug, $limit);
            return $product;
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param MasterProductUpdateRequest $request
     * @param int $id
     * @return array
     */
    public function update(MasterProductUpdateRequest $request, $id)
    {
        $request->id = $id;
        return $this->updateProduct($request);
    }

    public function updateProduct(Request $request)
    {
        if ($this->repository->adminPermission($request->user(), $request->shop_id)) {
            $id = $request->id;
            return $this->repository->updateProduct($request, $id);
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function updateProductStatus(Request $request)
    {
        if ($this->repository->adminPermission($request->user(), $request->shop_id)) {
            $id = $request->id;
            return $this->repository->updateProduct($request, $id);
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            return $this->repository->findOrFail($id)->delete();
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    public function relatedProducts(Request $request)
    {
        $limit = isset($request->limit) ? $request->limit : 10;
        return $this->repository->fetchRelated($request->slug, $limit);
    }

    public function fetchFeatureProducts(Request $request)
    {
        
        $limit = isset($request->limit) ? $request->limit : 10;
        if($request->search){
            // dump($request->search);
            $search=json_decode(explode("name:",$request->search)[1]);
            // dd($search);    
            if($search){
                $shops=ShopRepository::getSortedShops($search);

                return Product::whereIn("shop_id",$shops)->where("is_featured",1)->get();
            }
        }
        return Product::where("is_featured",1)->limit($limit)->get();
        
    }

    public function search($slug)
    {
        $data=[];

        $names=Product::where('name', 'like', '%' . $slug . '%')->limit(10)->pluck("name");

        foreach($names as $name){
            array_push($data,[
                "label"=>$name,
                "value"=>$name
            ]);
        }

        $names=Category::where('name', 'like', '%' . $slug . '%')->limit(10)->pluck('name');

        foreach($names as $name){
            array_push($data,[
                "label"=>$name,
                "value"=>$name
            ]);
        }

        return $data;
    }

    public function migrate()
    {
        Schema::dropIfExists('master_products');
        Schema::create('master_products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string("slug")->nullable();
            $table->text("description")->nullable();
            $table->unsignedBigInteger("type_id")->nullable();
            $table->double("price")->nullable();
            $table->double("sale_price")->nullable();
            $table->string('sku')->nullable();
            $table->integer('quantity')->default(0);
            $table->integer("in_stock")->default(1);
            $table->integer("is_taxable")->default(0);
            $table->unsignedBigInteger('shipping_class_id')->nullable();
            $table->enum("status",['publish','draft'])->default("publish");
            $table->enum("product_type",["simple",'variable'])->default("simple");
            $table->string("unit")->nullable();
            $table->string("height")->nullable();
            $table->string("width")->nullable();
            $table->string("length")->nullable();
            $table->json("image")->nullable();
            $table->json("gallery")->nullable();
            $table->double("max_price")->nullable();
            $table->double("min_price")->nullable();
            $table->integer("is_featured")->default(0);
            $table->timestamp('deleted_at')->nullable();
            $table->timestamps();
        });
        
        $products=Product::all();   
        foreach($products as $product)
        {
            unset($product["shop_id"]);
            $data=$product->toArray();
            $master=MasterProduct::create($data);
            foreach($product->categories as $category){
                DB::table("category_master_product")->insert(
                    [
                        "category_id"=>$category->id,
                        "master_product_id"=>$master->id
                    ]);
            }
            foreach($product->variations as $attribute){
                DB::table("attribute_value_master_product")->insert(
                    [
                        "attribute_value_id"=>$attribute->id,
                        "master_product_id"=>$master->id
                    ]
                );
            }
            foreach($product->tags as $tag){
                DB::table("master_product_tag")->insert([
                    "tag_id"=>$tag->id,
                    "master_product_id"=>$master->id
                ]);
            }
        }

        return 'done';
    }

    public function storeShopProduct(Request $request)
    {
        $master=MasterProduct::find($request->master_id);
        $data=$master->toArray();
        unset($data["id"]);
        unset($data["created_at"]);
        unset($data["updated_at"]);
        if(isset($data["slug"])){
            unset($data["slug"]);
        }

        $slug=$this->getSlug($data['name']);

        $data["slug"]=$slug;
        $data["price"]=(double)$request->price;
        $data["sale_price"]=(double)$request->sale_price;
        $data["quantity"]=(double)$request->quantity;
        // if(isset($request->tax)){
        //     $data["tax"]=Tax::find($request->tax);
        // }
        $data["max_price"]=NULL;
        $data["min_price"]=NULL;
        $data["is_featured"]=NULL;
        $data["shop_id"]=$request->shop_id;
        $data=array_merge($data,compact(["shop_id"=>$request->shop_id]));
        $product=Product::create($data);

        foreach($master->categories as $category){
            DB::table("category_product")->insert(
                [
                    "category_id"=>$category->id,
                    "product_id"=>$product->id
                ]);
        }
        foreach($master->variations as $attribute){
            DB::table("attribute_product")->insert(
                [
                    "attribute_value_id"=>$attribute->id,
                    "product_id"=>$product->id
                ]
            );
        }
        foreach($master->tags as $tag){
            DB::table("product_tag")->insert([
                "tag_id"=>$tag->id,
                "product_id"=>$product->id
            ]);
        }
        return 1;
    }

    private function getSlug($name)
    {
        $is_unique=FALSE;
        while(!$is_unique){
            $permitted_chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
            $postfix=substr(str_shuffle($permitted_chars), 0, 4);

            $slug=str_replace(" ","-",$name)."-".$postfix;

            $product=Product::where('slug',$slug)->first();
            if(!$product){
                $is_unique=TRUE;
            }
        }

        return $slug;
    }




    public function importMasterVariationOptions(Request $request)
    {
        $requestFile = $request->file();
        $user = $request->user();

        if (count($requestFile)) {
            if (isset($requestFile['csv'])) {
                $uploadedCsv = $requestFile['csv'];
            } else {
                $uploadedCsv = current($requestFile);
            }
        } else {
            throw new PickbazarException(config('shop.app_notice_domain') . 'ERROR.CSV_NOT_FOUND');
        }

        if (!$this->repository->adminPermission($user)) {
            throw new PickbazarException(config('shop.app_notice_domain') . 'ERROR.NOT_AUTHORIZED');
        }
        if (isset($user->id)) {
            $file = $uploadedCsv->storePubliclyAs('csv-files', 'master-variation-options-' . Str::random(5) . '.' . $uploadedCsv->getClientOriginalExtension(), 'public');

            $attributes = $this->repository->csvToArray(storage_path() . '/app/public/' . $file);

            foreach ($attributes as $key => $attribute) {
                if (!isset($attribute['title']) || !isset($attribute['price'])) {
                    throw new PickbazarException("MARVEL_ERROR.WRONG_CSV");
                }
                unset($attribute['id']);
                $attribute['options'] = json_decode($attribute['options'], true);
                // try {
                    $product = Type::find($attribute['product_id']);
                    if (isset($product->id)) {
                        VariationOption::firstOrCreate($attribute);
                    }
                // } catch (Exception $e) {
                // }
            }
            return true;
        }
    }

    public function exportMasterVariableOptions(Request $request)
    {

        $filename = 'master-variable-options-' . Str::random(5) . '.csv';
        $headers = [
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Content-type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename=' . $filename,
            'Expires'             => '0',
            'Pragma'              => 'public'
        ];

        $products = $this->repository->get();

        $list = VariationOption::WhereIn('product_id', $products->pluck('id'))->get()->toArray();

        if (!count($list)) {
            return response()->stream(function () {
            }, 200, $headers);
        }
        # add headers for each column in the CSV download
        array_unshift($list, array_keys($list[0]));

        $callback = function () use ($list) {
            $FH = fopen('php://output', 'w');
            foreach ($list as $key => $row) {
                if ($key === 0) {
                    $exclude = ['id', 'created_at', 'updated_at'];
                    $row = array_diff($row, $exclude);
                }
                unset($row['id']);
                unset($row['updated_at']);
                unset($row['created_at']);
                if (isset($row['options'])) {
                    $row['options'] = json_encode($row['options']);
                }
                fputcsv($FH, $row);
            }
            fclose($FH);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function exportMasterProducts(Request $request)
    {
        $filename = 'master-products'.'.csv';
        $headers = [
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Content-type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename=' . $filename,
            'Expires'             => '0',
            'Pragma'              => 'public'
        ];

        $list = $this->repository->get()->toArray();
        if (!count($list)) {
            return response()->stream(function () {
            }, 200, $headers);
        }
        # add headers for each column in the CSV download
        array_unshift($list, array_keys($list[0]));

        $callback = function () use ($list) {
            $FH = fopen('php://output', 'w');
            foreach ($list as $key => $row) {
                if ($key === 0) {
                    $exclude = ['id', 'slug', 'deleted_at', 'created_at', 'updated_at', 'shipping_class_id','image','gallery'];
                    $row = array_diff($row, $exclude);
                }
                unset($row['id']);
                unset($row['deleted_at']);
                unset($row['shipping_class_id']);
                unset($row['updated_at']);
                unset($row['created_at']);
                unset($row['slug']);
                unset($row['image']);
                unset($row['gallery']);
                
                fputcsv($FH, $row);
            }
            fclose($FH);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function importMasterProducts(Request $request)
    {
        $requestFile = $request->file();

        $user = $request->user();

        if (count($requestFile)) {
            if (isset($requestFile['csv'])) {
                $uploadedCsv = $requestFile['csv'];
            } else {
                $uploadedCsv = current($requestFile);
            }
        }

        if (!$this->repository->adminPermission($user)) {
            throw new PickbazarException(config('shop.app_notice_domain') . 'ERROR.NOT_AUTHORIZED');
        }
        
        $file = $uploadedCsv->storePubliclyAs('csv-files', 'master-products'.'.' . $uploadedCsv->getClientOriginalExtension(), 'public');

        $products = $this->repository->csvToArray(storage_path() . '/app/public/' . $file);

        foreach ($products as $key => $product) {
            if (!isset($product['type_id'])) {
                throw new PickbazarException("MARVEL_ERROR.WRONG_CSV");
            }
            unset($product['id']);
            unset($product['max_price']);
            unset($product['min_price']);
            unset($product['sale_price']);
            unset($product['commission']);
            unset($product['is_featured']);
            unset($product['image']);
            unset($product['gallery']); 

            try {
                $type = Type::find($product['type_id']);
                if (isset($type->id)) {
                    MasterProduct::firstOrCreate($product);
                }
            } catch (Exception $e) {
            }
        }
        return true;
        
    }


}

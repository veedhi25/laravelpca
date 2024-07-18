<?php


namespace PickBazar\Database\Repositories;

use Exception;
use PickBazar\Enums\ProductType;
use PickBazar\Database\Models\Tax;
use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\Shop;
use PickBazar\Database\Models\Product;
use PickBazar\Database\Models\Category;
use PickBazar\Database\Models\ShopCategory;
use PickBazar\Exceptions\PickbazarException;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Validator\Exceptions\ValidatorException;
use Prettus\Repository\Exceptions\RepositoryException;

class ProductRepository extends BaseRepository
{

    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name'        => 'like',
        'shop_id',
        'status',
        'sale_price',
        'type.slug',
        'categories.slug',
    ];

    protected $dataArray = [
        'name',
        'price',
        'sale_price',
        'max_price',
        'min_price',
        'type_id',
        'product_type',
        'quantity',
        'unit',
        'description',
        'sku',
        'image',
        'gallery',
        'status',
        'height',
        'length',
        'width',
        'in_stock',
        'is_taxable',
        "is_offer",
        'is_brand_offer',
        'shop_id',
    ];

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Product::class;
    }

    public function storeProduct($request)
    {
        try {
            $data = $request->only($this->dataArray);
            $data['slug']=$this->getSlug($data['name']);

            $product = $this->create($data);
            if(isset($request->tax)){
                $product->tax=Tax::find($request->tax);
            }
     
            if (isset($request['categories'])) {
                $product->categories()->attach($request['categories']);
            }
            if (isset($request['tags'])) {
                $product->tags()->attach($request['tags']);
            }
            if (isset($request['variations'])) {
                $product->variations()->attach($request['variations']);
            }
            if (isset($request['variation_options'])) {
                $product->variation_options()->createMany($request['variation_options']['upsert']);
            }
            $product->categories = $product->categories;
            $product->variation_options = $product->variation_options;
            $product->variations = $product->variations;
            $product->type = $product->type;
            return $product;
        } catch (ValidatorException $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
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

    public function updateProduct($request, $id)
    {

        try {
            $product = $this->findOrFail($id);

            if(isset($request->is_featured)){
                $product->is_featured=$request->is_featured;
            }
            if (isset($request['categories'])) {
                $product->categories()->sync($request['categories']);
            }
            if(isset($request->tax)){
                $product->tax=Tax::find($request->tax);
            }
            if (isset($request['tags'])) {
                $product->tags()->sync($request['tags']);
            }
            if (isset($request['variations'])) {
                $product->variations()->sync($request['variations']);
            }

            if (isset($request['variation_options'])) {
                if (isset($request['variation_options']['upsert'])) {
                    foreach ($request['variation_options']['upsert'] as $key => $variation) {
                        if (isset($variation['id'])) {
                            $product->variation_options()->where('id', $variation['id'])->update($variation);
                        } else {
                            $product->variation_options()->create($variation);
                        }
                    }
                }
                if (isset($request['variation_options']['delete'])) {
                    foreach ($request['variation_options']['delete'] as $key => $id) {
                        try {
                            $product->variation_options()->where('id', $id)->delete();
                        } catch (Exception $e) {
                        }
                    }
                }
            }
            $product->update($request->only($this->dataArray));
            if ($product->product_type === ProductType::SIMPLE) {
                $product->variations()->delete();
                $product->variation_options()->delete();
            }
            $product->categories = $product->categories;
            $product->variation_options = $product->variation_options;
            $product->variations = $product->variations;
            $product->type = $product->type;
            $product->tags = $product->tags;
            return $product;
        } catch (ValidatorException $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }

    public function fetchRelated($slug, $limit = 10)
    {
        try {
            $product = $this->findOneByFieldOrFail('slug', $slug);
            $categories = $product->categories->pluck('id');
            $products = $this->whereHas('categories', function ($query) use ($categories) {
                $query->whereIn('categories.id', $categories);
            })->with('type')->limit($limit);
            return $products;
        } catch (Exception $e) {
            return [];
        }
    }

    public static function searchByValue($value)

    {
        $shop_ids=Product::where("status",1)->where("name","like","%".$value."%")->distinct()->pluck("shop_id")->toArray();
        $categories=Category::where("name","like","%".$value."%")->with("products")->distinct()->get();
        $shop_categories_ids=ShopCategory::where("name","like","%".$value."%")->pluck("id")->toArray();
        $select_shops=Shop::where("is_active",1)->where("name","like","%".$value."%")->pluck("id")->toArray();

        $shop_ids=array_merge($shop_ids,$select_shops);
        
        foreach($categories as $category){
            foreach($category->products as $product){
                array_push($shop_ids,$product->shop_id);
            }
        }

        foreach($shop_categories_ids as $category_id)

        { 
            $shops=Shop::all();
            foreach($shops as $shop){
                $category_array = ProductRepository::getCategoryId($shop->shop_categories);
                if(is_array($category_array)){
                    if(in_array($category_id,$category_array)){
                        array_push($shop_ids,$shop->id);
                    }
                }
            }
        }
        
        $shop_ids=array_unique($shop_ids);

        return $shop_ids;
    }

    public static function searchSalonByValue($search,$price)

    {
         $shop_ids=Product::where("status",1)->where("name",$search)->where('is_featured',1)->where('sale_price',$price)->distinct()->pluck("shop_id")->toArray();
        // $categories=Category::where("name","like","%".$search."%")->with("products")->distinct()->get();//
        // $shop_categories_ids=ShopCategory::where("name","like","%".$search."%")->pluck("id")->toArray();
        $select_shops=Shop::where("is_active",1)->where("name","like","%".$search."%")->pluck("id")->toArray();

        $shop_ids=array_merge($shop_ids,$select_shops);
        
        $shop_ids=array_unique($shop_ids);

        return $shop_ids;
    }


    private static function getCategoryId($shop_categories)

    {
        $shop_categories=json_decode($shop_categories);
        $ids=[];

        if(!is_array($shop_categories)){
            return "";
        }

        foreach($shop_categories as $category)
        {
            if(isset($category->name)){
                array_push($ids,$category->id);
            }
        }
        return $ids;
    }
    
}

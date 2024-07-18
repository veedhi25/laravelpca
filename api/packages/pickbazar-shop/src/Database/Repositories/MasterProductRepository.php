<?php


namespace PickBazar\Database\Repositories;

use Exception;
use PickBazar\Enums\ProductType;
use Illuminate\Support\Facades\DB;
use PickBazar\Database\Models\Tax;
use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\Shop;
use PickBazar\Database\Models\Product;
use PickBazar\Database\Models\Category;
use PickBazar\Database\Models\MasterProduct;
use PickBazar\Exceptions\PickbazarException;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Validator\Exceptions\ValidatorException;
use Prettus\Repository\Exceptions\RepositoryException;

class MasterProductRepository extends BaseRepository
{

    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name'        => 'like',
        'status',
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
        return MasterProduct::class;
    }

    public function storeProduct($request)
    {
        try {
            $data = $request->only($this->dataArray);
            $product = $this->create($data);
            if (isset($request['categories'])) {
                foreach($request['categories'] as $id){
                    DB::table("category_master_product")->insert(
                        [
                            "category_id"=>$id,
                            "master_product_id"=>$product->id
                        ]);
                }
                $product->categories()->sync($request['categories']);
            }
            if (isset($request['tags'])) {
                $product->tags()->attach($request['tags']);
            }
            if(isset($request->tax)){
              $product->tax=Tax::find($request->tax);
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
            $product->tags = $product->tags;
            return $product;
        } catch (ValidatorException $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
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
            $product = $this->findOneByFieldOrFail('id', $slug);
            $categories = $product->categories->pluck('id');
            $products = $this->whereHas('categories', function ($query) use ($categories) {
                $query->whereIn('categories.id', $categories);
            })->with('type')->limit($limit);
            return $products;
        } catch (Exception $e) {
            return [];
        }
    }


    
}
/*
Illuminate\Database\Eloquent\Collection {#1487
  #items: array:3 [
    0 => PickBazar\Database\Models\Category {#1488
      #table: "categories"
      +guarded: []
      #casts: array:1 [
        "image" => "json"
      ]
      #connection: "mysql"
      #primaryKey: "id"
      #keyType: "int"
      +incrementing: true
      #with: []
      #withCount: []
      +preventsLazyLoading: false
      #perPage: 15
      +exists: true
      +wasRecentlyCreated: false
      #attributes: array:11 [
        "id" => 162
        "name" => "Pulses ,Beasn & Atta"
        "slug" => "pulses-beasn-atta"
        "icon" => "Cooking"
        "image" => "{"id": 1880, "original": "http://api.retailunnati.com/images/61208ace61e0c.png", "thumbnail": "http://api.retailunnati.com/images/61208ace61e0c.png"}"
        "details" => "Pulses ,Beasn & Atta"
        "parent" => null
        "type_id" => 1
        "created_at" => "2021-08-21 05:11:25"
        "updated_at" => "2021-08-21 05:11:25"
        "deleted_at" => null
      ]
      #original: array:13 [
        "id" => 162
        "name" => "Pulses ,Beasn & Atta"
        "slug" => "pulses-beasn-atta"
        "icon" => "Cooking"
        "image" => "{"id": 1880, "original": "http://api.retailunnati.com/images/61208ace61e0c.png", "thumbnail": "http://api.retailunnati.com/images/61208ace61e0c.png"}"
        "details" => "Pulses ,Beasn & Atta"
        "parent" => null
        "type_id" => 1
        "created_at" => "2021-08-21 05:11:25"
        "updated_at" => "2021-08-21 05:11:25"
        "deleted_at" => null
        "pivot_master_product_id" => 1444
        "pivot_category_id" => 162
      ]
      #changes: []
      #classCastCache: []
      #dates: []
      #dateFormat: null
      #appends: []
      #dispatchesEvents: []
      #observables: []
      #relations: array:1 [
        "pivot" => Illuminate\Database\Eloquent\Relations\Pivot {#1491
          +incrementing: false
          #guarded: []
          #connection: "mysql"
          #table: "category_master_product"
          #primaryKey: "id"
          #keyType: "int"
          #with: []
          #withCount: []
          +preventsLazyLoading: false
          #perPage: 15
          +exists: true
          +wasRecentlyCreated: false
          #attributes: array:2 [
            "master_product_id" => 1444
            "category_id" => 162
          ]
          #original: array:2 [
            "master_product_id" => 1444
            "category_id" => 162
          ]
          #changes: []
          #casts: []
          #classCastCache: []
          #dates: []
          #dateFormat: null
          #appends: []
          #dispatchesEvents: []
          #observables: []
          #relations: []
          #touches: []
          +timestamps: false
          #hidden: []
          #visible: []
          #fillable: []
          +pivotParent: PickBazar\Database\Models\MasterProduct {#1462
            +guarded: []
            #table: "master_products"
            #casts: array:3 [
              "image" => "json"
              "gallery" => "json"
              "deleted_at" => "datetime"
            ]
            #connection: "mysql"
            #primaryKey: "id"
            #keyType: "int"
            +incrementing: true
            #with: []
            #withCount: []
            +preventsLazyLoading: false
            #perPage: 15
            +exists: true
            +wasRecentlyCreated: true
            #attributes: array:21 [
              "name" => "test"
              "price" => 23
              "sale_price" => 2
              "max_price" => null
              "min_price" => null
              "type_id" => 1
              "product_type" => "simple"
              "quantity" => 2
              "unit" => "12"
              "description" => "test"
              "sku" => "2"
              "image" => "[]"
              "gallery" => "[]"
              "status" => "publish"
              "height" => "3"
              "length" => "3"
              "width" => "3"
              "updated_at" => "2021-10-01 18:31:43"
              "created_at" => "2021-10-01 18:31:43"
              "id" => 1444
              "categories" => Illuminate\Database\Eloquent\Collection {#1487}
            ]
            #original: array:20 [
              "name" => "test"
              "price" => 23
              "sale_price" => 2
              "max_price" => null
              "min_price" => null
              "type_id" => 1
              "product_type" => "simple"
              "quantity" => 2
              "unit" => "12"
              "description" => "test"
              "sku" => "2"
              "image" => "[]"
              "gallery" => "[]"
              "status" => "publish"
              "height" => "3"
              "length" => "3"
              "width" => "3"
              "updated_at" => "2021-10-01 18:31:43"
              "created_at" => "2021-10-01 18:31:43"
              "id" => 1444
            ]
            #changes: []
            #classCastCache: []
            #dates: []
            #dateFormat: null
            #appends: []
            #dispatchesEvents: []
            #observables: []
            #relations: array:1 [
              "categories" => Illuminate\Database\Eloquent\Collection {#1487}
            ]
            #touches: []
            +timestamps: true
            #hidden: []
            #visible: []
            #fillable: []
            #forceDeleting: false
          }
          #foreignKey: "master_product_id"
          #relatedKey: "category_id"
        }
      ]
      #touches: []
      +timestamps: true
      #hidden: []
      #visible: []
      #fillable: []
    }
    1 => PickBazar\Database\Models\Category {#1489
      #table: "categories"
      +guarded: []
      #casts: array:1 [
        "image" => "json"
      ]
      #connection: "mysql"
      #primaryKey: "id"
      #keyType: "int"
      +incrementing: true
      #with: []
      #withCount: []
      +preventsLazyLoading: false
      #perPage: 15
      +exists: true
      +wasRecentlyCreated: false
      #attributes: array:11 [
        "id" => 28
        "name" => "Cooking"
        "slug" => "cooking"
        "icon" => "Cooking"
        "image" => "[]"
        "details" => null
        "parent" => null
        "type_id" => 1
        "created_at" => "2021-03-08 10:00:05"
        "updated_at" => "2021-03-08 10:00:05"
        "deleted_at" => null
      ]
      #original: array:13 [
        "id" => 28
        "name" => "Cooking"
        "slug" => "cooking"
        "icon" => "Cooking"
        "image" => "[]"
        "details" => null
        "parent" => null
        "type_id" => 1
        "created_at" => "2021-03-08 10:00:05"
        "updated_at" => "2021-03-08 10:00:05"
        "deleted_at" => null
        "pivot_master_product_id" => 1444
        "pivot_category_id" => 28
      ]
      #changes: []
      #classCastCache: []
      #dates: []
      #dateFormat: null
      #appends: []
      #dispatchesEvents: []
      #observables: []
      #relations: array:1 [
        "pivot" => Illuminate\Database\Eloquent\Relations\Pivot {#1480
          +incrementing: false
          #guarded: []
          #connection: "mysql"
          #table: "category_master_product"
          #primaryKey: "id"
          #keyType: "int"
          #with: []
          #withCount: []
          +preventsLazyLoading: false
          #perPage: 15
          +exists: true
          +wasRecentlyCreated: false
          #attributes: array:2 [
            "master_product_id" => 1444
            "category_id" => 28
          ]
          #original: array:2 [
            "master_product_id" => 1444
            "category_id" => 28
          ]
          #changes: []
          #casts: []
          #classCastCache: []
          #dates: []
          #dateFormat: null
          #appends: []
          #dispatchesEvents: []
          #observables: []
          #relations: []
          #touches: []
          +timestamps: false
          #hidden: []
          #visible: []
          #fillable: []
          +pivotParent: PickBazar\Database\Models\MasterProduct {#1462}
          #foreignKey: "master_product_id"
          #relatedKey: "category_id"
        }
      ]
      #touches: []
      +timestamps: true
      #hidden: []
      #visible: []
      #fillable: []
    }
    2 => PickBazar\Database\Models\Category {#1492
      #table: "categories"
      +guarded: []
      #casts: array:1 [
        "image" => "json"
      ]
      #connection: "mysql"
      #primaryKey: "id"
      #keyType: "int"
      +incrementing: true
      #with: []
      #withCount: []
      +preventsLazyLoading: false
      #perPage: 15
      +exists: true
      +wasRecentlyCreated: false
      #attributes: array:11 [
        "id" => 43
        "name" => "Health & Beauty"
        "slug" => "health-beauty"
        "icon" => "BeautyHealth"
        "image" => "[]"
        "details" => null
        "parent" => null
        "type_id" => 1
        "created_at" => "2021-03-08 10:11:08"
        "updated_at" => "2021-03-08 10:11:08"
        "deleted_at" => null
      ]
      #original: array:13 [
        "id" => 43
        "name" => "Health & Beauty"
        "slug" => "health-beauty"
        "icon" => "BeautyHealth"
        "image" => "[]"
        "details" => null
        "parent" => null
        "type_id" => 1
        "created_at" => "2021-03-08 10:11:08"
        "updated_at" => "2021-03-08 10:11:08"
        "deleted_at" => null
        "pivot_master_product_id" => 1444
        "pivot_category_id" => 43
      ]
      #changes: []
      #classCastCache: []
      #dates: []
      #dateFormat: null
      #appends: []
      #dispatchesEvents: []
      #observables: []
      #relations: array:1 [
        "pivot" => Illuminate\Database\Eloquent\Relations\Pivot {#1483
          +incrementing: false
          #guarded: []
          #connection: "mysql"
          #table: "category_master_product"
          #primaryKey: "id"
          #keyType: "int"
          #with: []
          #withCount: []
          +preventsLazyLoading: false
          #perPage: 15
          +exists: true
          +wasRecentlyCreated: false
          #attributes: array:2 [
            "master_product_id" => 1444
            "category_id" => 43
          ]
          #original: array:2 [
            "master_product_id" => 1444
            "category_id" => 43
          ]
          #changes: []
          #casts: []
          #classCastCache: []
          #dates: []
          #dateFormat: null
          #appends: []
          #dispatchesEvents: []
          #observables: []
          #relations: []
          #touches: []
          +timestamps: false
          #hidden: []
          #visible: []
          #fillable: []
          +pivotParent: PickBazar\Database\Models\MasterProduct {#1462}
          #foreignKey: "master_product_id"
          #relatedKey: "category_id"
        }
      ]
      #touches: []
      +timestamps: true
      #hidden: []
      #visible: []
      #fillable: []
    }
  ]
}


*/
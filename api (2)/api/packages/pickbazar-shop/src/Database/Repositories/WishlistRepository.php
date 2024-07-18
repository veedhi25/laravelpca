<?php

namespace PickBazar\Database\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\Variation;
use PickBazar\Database\Models\Wishlist;
use Prettus\Repository\Criteria\RequestCriteria;
use PickBazar\Exceptions\PickbazarException;


class WishlistRepository extends BaseRepository
{
    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
            //
        }
    }

    /**
     * @var array[]
     */
    protected $dataArray = [
        'user_id',
        'product_id',
        'variation_option_id'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Wishlist::class;
    }

    /**
     * @param $request
     * @return LengthAwarePaginator|JsonResponse|Collection|mixed
     */
    public function storeWishlist($request)
    {
        try {
            $user_id = $request->user()->id;
            $wishlist = $this->findOneWhere((['user_id' => $user_id, 'product_id' => $request['product_id']]));
            if (empty($wishlist)) {
                $request['user_id'] = $user_id;
                $wishlistInput = $request->only($this->dataArray);
                return $this->create($wishlistInput);
            }
        } catch (\Exception $e) {
            throw new PickbazarException('ALREADY_ADDED_TO_WISHLIST_FOR_THIS_PRODUCT');
        }
    }

    /**
     * @param $request
     * @return LengthAwarePaginator|JsonResponse|Collection|mixed
     */
    public function toggleWishlist($request)
    {
        try {
            $user_id = $request->user()->id;
            $wishlist = $this->findOneWhere((['user_id' => $user_id, 'product_id' => $request['product_id']]));
            if (empty($wishlist)) {
                $request['user_id'] = $user_id;
                $wishlistInput = $request->only($this->dataArray);
                $this->create($wishlistInput);
                return true;
            } else {
                $this->delete($wishlist->id);
                return false;
            }
        } catch (\Exception $e) {
            throw new PickbazarException('SOMETHING_WENT_WRONG');
        }
    }
}

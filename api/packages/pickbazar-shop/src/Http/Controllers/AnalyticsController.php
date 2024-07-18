<?php

namespace PickBazar\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use PickBazar\Enums\Permission;
use Illuminate\Support\Facades\DB;
use PickBazar\Database\Models\Bill;
use PickBazar\Database\Models\Shop;
use PickBazar\Database\Models\Product;
use PickBazar\Exceptions\PickbazarException;
use Illuminate\Validation\ValidationException;
use PickBazar\Database\Repositories\AddressRepository;
use Spatie\Permission\Models\Permission as ModelsPermission;

class AnalyticsController extends CoreController
{
    public $repository;

    public function __construct(AddressRepository $repository)
    {
        $this->repository = $repository;
    }


    public function analytics(Request $request)
    {
        $user = $request->user();

        if ($user && ($user->hasPermissionTo(Permission::SUPER_ADMIN) || $user->hasPermissionTo(Permission::STORE_OWNER) || $user->hasPermissionTo(Permission::CUSTOMER))) {
            // $totalRevenueQuery = DB::table('orders')->whereDate('created_at', '>', Carbon::now()->subDays(30));
            $totalRevenueQuery = DB::table('orders');

            if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
                $totalRevenue = $totalRevenueQuery->sum('paid_total');
            } else {
                $totalRevenue = $totalRevenueQuery->where('shop_id', '=', $user->id)->sum('paid_total');
            }

            $todaysRevenueQuery = DB::table('orders')->whereDate('created_at', '>', Carbon::now()->subDays(1));

            if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
                $todaysRevenue = $todaysRevenueQuery->sum('paid_total');
            } else {
                $todaysRevenue = $todaysRevenueQuery->where('shop_id', '=', $user->id)->sum('paid_total');
            }
            $totalOrdersInLast30Days = DB::table('orders')->whereDate('created_at', '>', Carbon::now()->subDays(30))->count();
            $totalOrdersQuery = DB::table('orders');

            if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
                $totalOrders = $totalOrdersQuery->count();
            } else {
                $totalOrders = $totalOrdersQuery->where('shop_id', '=', $user->id)->count();
            }
            if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
                $totalShops = Shop::count();
            } else {
                $totalShops = Shop::where('owner_id', '=', $user->id)->count();
            }
            $customerPermission = ModelsPermission::where('name', Permission::CUSTOMER)->first();
            $newCustomers = $customerPermission->users()->whereDate('created_at', '>', Carbon::now()->subDays(30))->count();
            //total customers
            $totalCustomers = $customerPermission->users()->count();
            // todays orders
            $todaysOrders = DB::table('orders')->whereDate('created_at', '>', Carbon::now()->subDays(1))->count();
            //total orders in last 30days
            // $totalOrdersInLast30Days = $customerPermission->users()->whereDate('created_at', '>', Carbon::now()->subDays(30))->count();
            $totalYearSaleByMonthQuery =
                DB::table('orders')->selectRaw(
                    "sum(paid_total) as total, DATE_FORMAT(created_at,'%M') as month"
                )->whereYear('created_at', date('Y'));
            if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
                $totalYearSaleByMonth = $totalYearSaleByMonthQuery->groupBy('month')->get();
            } else {
                $totalYearSaleByMonth = $totalYearSaleByMonthQuery->where('shop_id', '=', $user->id)->groupBy('month')->get();
            }


            $months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];

            $processedData = [];

            foreach ($months as $key => $month) {
                foreach ($totalYearSaleByMonth as $value) {
                    if ($value->month === $month) {
                        $processedData[$key] = $value;
                    } else {
                        $processedData[$key] = ['total' => 0, 'month' => $month];
                    }
                }
            }

            $invoice_bills = Bill::all();
            $bill_transfered_amount=0;
            foreach($invoice_bills as $bill){
                $bill_transfered_amount+=$bill->approved_amount;
            }
            return [
                'totalRevenue' => $totalRevenue,
                'totalShops' => $totalShops,
                'todaysRevenue' => $todaysRevenue,
                'totalOrders' => $totalOrders,
                'todaysOrders' => $todaysOrders,
                'totalOrdersInLast30Days' => $totalOrdersInLast30Days,
                'newCustomers' =>  $newCustomers,
                'totalCustomers' => $totalCustomers,
                'totalYearSaleByMonth' => $processedData,
                'bill_transfered_amount' =>$bill_transfered_amount
            ];
        }
        throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
    }


    // total users
    public function totalUsers(Request $request)
    {
        // $user = $request->user();

        // if (isset($user)) {
            $totalUsersQuery = DB::table('users');

            // if ($user) {
                $totalUsers = $totalUsersQuery->count();
                //totalshops
                $totalShops = Shop::count();

                //total shops minus total users
                $users =   $totalUsers - $totalShops;
            // } else {
                // $totalUsers = $totalUsersQuery->where('shop_id', '=', $user->id)->count();
            // }
            return [
                'totalUsers' => $users,
            ];
        // }
        throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
    }

    public function popularProducts(Request $request)
    {
        $limit = $request->limit ? $request->limit : 10;
        $products_query = Product::withCount('orders')->with(['type', 'shop'])->orderBy('orders_count', 'desc')->limit($limit);
        if (isset($request->shop_id)) {
            $products = $products_query->where('shop_id', "=", $request->shop_id)->get();
        } else {
            $products = $products_query->get();
        }

        return $products;
    }
}

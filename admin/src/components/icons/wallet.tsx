
import React,{useState, useEffect} from 'react';
import MobileNavigation from "@components/layout/mobile-navigation";
import ProductFeedLoaderTwo from "@components/ui/loaders/product-feed-loader-two";
import Footer from '@components/footer/Footer';
import Navbar from '@components/layout/navbar/navbar';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProfileSidebar from "@components/profile/profile-sidebar";
import {useWalletCommissionQuery} from '@data/user/use-wallet-commission-query'
import usePrice from "@utils/use-price";
import { PriceWalletIcon } from "@components/icons/price-wallet";
import { DollarIcon } from "@components/icons/dollar";
import { useCustomerQuery } from "@data/customer/use-customer.query";


const ReferralActivity = () => {

    const { data:customerData } = useCustomerQuery();
    
    const { data,isLoading:loading } = useWalletCommissionQuery({
        limit: 10 as number,
        search:"",
    });

    const { price: totalEarnings } = usePrice(
        data && {
            amount: data?.balance?.total_earnings!,
        }
    );

    const { price: currentBalance } = usePrice(
        data && {
            amount: data?.balance?.current_balance!,
        }
    );
    const { price: withdrawnAmount } = usePrice(
        data && {
            amount: data?.balance?.withdrawn_amount!,
        }
    );
    const { price: bill_transfered_amount } = usePrice(
        data && {
            amount: data?.bill_transfered_amount!,
        }
    );

    function formateDate(date:string):string{
        var temp=date.substring(0,10).split('-');
        
        return temp[2]+"/"+temp[1]+"/"+temp[0];
    }

    function orders_count(){
        if(data){
            return data.customer_level?.length+data.level1?.length+data.level2?.length+data.level3?.length;
        }
    }

    // console.log('wallet data', data);

    Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop]
    }
    return total
}

	const [accepted, setAccepted ] = useState([]);

    if (loading) {
        return (
          <div className="hidden xl:block">
            <div className="w-full h-52 flex justify-center mt-8 px-2">
              <ProductFeedLoaderTwo />
            </div>
          </div>
        );
      }


      const month = ["Jan", "Feb", "March", "April", "May", "June",
                     "July", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        

        var today = new Date();
        var currMonth = today.getMonth();
        var currYear = today.getFullYear();
        var lastMonth = currMonth - 1;
        
        // let lastMonth = today.getMonth();
        var relevantYear = currYear;
        // console.log('lastMonth',lastMonth);
        // console.log('current month',currMonth);

        var total = data?.customer_level?.filter((i:any) => {
            
            var date = new Date(i.created_at);
            // // console.log(data.customer_level);
            // console.log('created at',date);
            // console.log('curr month',currMonth);
            // console.log('year',date.getFullYear());
            // console.log('order month',date.getMonth());
            
            // console.log('last month',lastMonth);
        
            return date.getMonth() === lastMonth && date.getFullYear() === relevantYear;
        }).reduce((prev, curr) => prev +  parseFloat(curr.earning),0);

        var level_1 = data?.level1?.filter((i:any) => {
            
            var date = new Date(i.created_at);
            // // console.log(data.customer_level);
            // console.log('created at',date);
            // console.log('curr month',currMonth);
            // console.log('year',date.getFullYear());
            // console.log('order month',date.getMonth());
            
            // console.log('last month',lastMonth);
        
            return date.getMonth() === lastMonth && date.getFullYear() === relevantYear;
        }).reduce((prev, curr) => prev +  parseFloat(curr.earning),0);

        var level_1_purchase = data?.level1?.filter((i:any) => {
            
            var date = new Date(i.created_at);
            // // console.log(data.customer_level);
            // console.log('created at',date);
            // console.log('curr month',currMonth);
            // console.log('year',date.getFullYear());
            // console.log('order month',date.getMonth());
            
            // console.log('last month',lastMonth);
        
            return date.getMonth() === lastMonth && date.getFullYear() === relevantYear;
        }).reduce((prev, curr) => prev +  parseFloat(curr.commission_value),0);

        var level_2 = data?.level2?.filter((i:any) => {
            
            var date = new Date(i.created_at);
            // // console.log(data.customer_level);
            // console.log('created at',date);
            // console.log('curr month',currMonth);
            // console.log('year',date.getFullYear());
            // console.log('order month',date.getMonth());
            
            // console.log('last month',lastMonth);
        
            return date.getMonth() === lastMonth && date.getFullYear() === relevantYear;
        }).reduce((prev, curr) => prev +  parseFloat(curr.earning),0);

        var level_2_purchase = data?.level2?.filter((i:any) => {
            
            var date = new Date(i.created_at);
            // // console.log(data.customer_level);
            // console.log('created at',date);
            // console.log('curr month',currMonth);
            // console.log('year',date.getFullYear());
            // console.log('order month',date.getMonth());
            
            // console.log('last month',lastMonth);
        
            return date.getMonth() === lastMonth && date.getFullYear() === relevantYear;
        }).reduce((prev, curr) => prev +  parseFloat(curr.commission_value),0);

        var level_3 = data?.level3?.filter((i:any) => {
            
            var date = new Date(i.created_at);
            // // console.log(data.customer_level);
            // console.log('created at',date);
            // console.log('curr month',currMonth);
            // console.log('year',date.getFullYear());
            // console.log('order month',date.getMonth());
            
            // console.log('last month',lastMonth);
        
            return date.getMonth() === lastMonth && date.getFullYear() === relevantYear;
        }).reduce((prev, curr) => prev +  parseFloat(curr.earning),0);

        var level_3_purchase = data?.level3?.filter((i:any) => {
            
            var date = new Date(i.created_at);
            // // console.log(data.customer_level);
            // console.log('created at',date);
            // console.log('curr month',currMonth);
            // console.log('year',date.getFullYear());
            // console.log('order month',date.getMonth());
            
            // console.log('last month',lastMonth);
        
            return date.getMonth() === lastMonth && date.getFullYear() === relevantYear;
        }).reduce((prev, curr) => prev +  parseFloat(curr.commission_value),0);

        // console.log('total',total);
        // console.log('data',data)

	return (
        <> 
              {/* <div className=''>
                        {
                            data.customer_level?.map( item => item.earning).reduce((prev,next) => prev+next)
                        }
             </div> */}
		<div className='invitation-status-page bg-white lg:bg-gray-100 flex flex-col'>  

            <Navbar label=''/>

            <div className='flex mx-0 md:mx-8 -space-x-4 lg:mx-auto lg:space-x-0 '>
                
                <ProfileSidebar className="lg:sticky lg:top-22 flex-shrink-0 hidden mt-0 sm:mt-0 lg:mt-14 xl:block xl:w-80 ml-0 md:ml-8" />  

                <div className="flex flex-col  justify-evenly p-4 w-full lg:mx-8  lg:mt-6">
                    <div className='invite-tabs flex flex-col bg-white p-4 w-full mx-4 text-left lg:mt-5 '>
                        <div className="users-list lg:mt-10">
                           <div className='flex items-center justify-between'> <h1 className="text-lg mb-5 font-semibold text-heading">Your Wallet</h1>
                           <p className=" mb-5 font-light text-gray-600 text-md">{customerData?.me?.name}</p></div>

                            {/* Mini Dashboard */}
                            <div className="order-4 mx-auto xl:order-3 col-span-12 xl:col-span-9">
                                <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-2 lg:gap-5 bg-light p-4 mx-auto rounded h-full">
           

                                    <div className="space-y-3 shadow-lg border  w-full" style={{maxWidth:"450px",maxHeight:'200px'}}>
                                        <div className="">

                                            <div className="flex items-center py-3 px-4 border-b border-gray-100">

                                                <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#C7AF99] text-light">
                                                        <PriceWalletIcon width={16} />
                                                </div>

                                                <div className="ml-3">
                                                    <p className="text-md lg:text-lg font-semibold text-sub-heading mb-0.5">
                                                    {totalEarnings}
                                                    </p>
                                                    <p className="text-sm text-gray-700 mt-0">
                                                        {("Total Earning")}
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 shadow-lg border" style={{maxWidth:"450px",maxHeight:'200px'}}>
                                        <div className="">
                                            <div className="flex items-center  py-3 px-4">
                                                <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#FFA7AE] text-light">
                                                    <DollarIcon width={12} />
                                                </div>

                                                <div className="ml-3">
                                                    <p className="text-md lg:text-lg font-semibold text-sub-heading mb-0.5">
                                                        {currentBalance}
                                                    </p>
                                                    <p className="text-sm text-gray-700 mt-0">
                                                        {("Current Balance")}
                                                    </p>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>

                                    <div className="space-y-3 shadow-lg border" style={{maxWidth:"450px",maxHeight:'200px'}}>
                                        <div className="">
                                            <div className="flex items-center  py-3 px-4">
                                                <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#FFA7AE] text-light">
                                                    <DollarIcon width={12} />
                                                </div>

                                                <div className="ml-3">
                                                    <p className="text-md lg:text-lg font-semibold text-sub-heading mb-0.5">
                                                    ₹{Math.abs(data?.customer_level?.map( item => item.earning).reduce((prev,next) => (prev + parseFloat(next)) ,0)).toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-700 mt-0">
                                                        {("Leader earning")}
                                                    </p>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3 shadow-lg border  w-full" style={{maxWidth:"450px",maxHeight:'200px'}}>
                                        <div className="">

                                            <div className="flex items-center py-3 px-4 border-b border-gray-100">

                                                <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#C7AF99] text-light">
                                                        <PriceWalletIcon width={16} />
                                                </div>

                                                <div className="ml-3">
                                                    <p className="text-md lg:text-lg font-semibold text-sub-heading mb-0.5">
                                                    ₹{total.toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-700 mt-0">
                                                        {("Leader last month earning")}
                                                    </p>
                                                </div>

                                            </div>

                                        </div>
                                    </div>


                                    <div className="space-y-3 shadow-lg border" style={{maxWidth:"450px",maxHeight:'200px'}}>
                                        <div className="">
                                            <div className="flex items-center  py-3 px-4">
                                                <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#FFA7AE] text-light">
                                                    <DollarIcon width={12} />
                                                </div>

                                                <div className="ml-3">
                                                    <p className="text-md lg:text-lg font-semibold text-sub-heading mb-0.5">
                                                        {/* {Math.abs(data?.level1?.map( item => item.earning).reduce((prev,next) => (prev + parseFloat(next)) ,0).toFixed(2))} */}
                                                        ₹{level_1.toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-700 mt-0">
                                                        {("1st Family (last month earning)")}
                                                    </p>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>


                                    <div className="space-y-3 shadow-lg border" style={{maxWidth:"450px",maxHeight:'200px'}}>
                                        <div className="">
                                            <div className="flex items-center  py-3 px-4">
                                                <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#FFA7AE] text-light">
                                                    <DollarIcon width={12} />
                                                </div>

                                                <div className="ml-3">
                                                    <p className="text-md lg:text-lg font-semibold text-sub-heading mb-0.5">
                                                    {/* ₹{Math.abs(data?.level1?.map( item => item.commission_value).reduce((prev,next) => (prev + parseFloat(next)) ,0).toFixed(2))} */}
                                                        ₹{level_1_purchase.toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-700 mt-0">
                                                        {("1st Family (last month purchase)")}
                                                    </p>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>

                                    

                                    <div className="space-y-3 shadow-lg border" style={{maxWidth:"450px",maxHeight:'200px'}}>
                                        <div className="">
                                            <div className="flex items-center  py-3 px-4">
                                                <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#FFA7AE] text-light">
                                                    <DollarIcon width={12} />
                                                </div>

                                                <div className="ml-3">
                                                    <p className="text-md lg:text-lg font-semibold text-sub-heading mb-0.5">
                                                        {/* {Math.abs(data?.level2?.map( item => item.earning).reduce((prev,next) => (prev-next) ,0).toFixed(2))} */}
                                                        ₹{level_2.toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-700 mt-0">
                                                        {("2nd Family (last month earning)")}
                                                    </p>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>

                                    <div className="space-y-3 shadow-lg border" style={{maxWidth:"450px",maxHeight:'200px'}}>
                                        <div className="">
                                            <div className="flex items-center  py-3 px-4">
                                                <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#FFA7AE] text-light">
                                                    <DollarIcon width={12} />
                                                </div>

                                                <div className="ml-3">
                                                    <p className="text-md lg:text-lg font-semibold text-sub-heading mb-0.5">
                                                    {/* ₹{Math.abs(data?.level2?.map( item => item.commission_value).reduce((prev,next) => (prev + parseFloat(next)) ,0).toFixed(2))} */}
                                                        ₹{level_2_purchase.toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-700 mt-0">
                                                        {("2nd Family (last month purchase)")}
                                                    </p>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>

                                    <div className="space-y-3 shadow-lg border" style={{maxWidth:"450px",maxHeight:'200px'}}>
                                        <div className="">
                                            <div className="flex items-center  py-3 px-4">
                                                <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#FFA7AE] text-light">
                                                    <DollarIcon width={12} />
                                                </div>

                                                <div className="ml-3">
                                                    <p className="text-md lg:text-lg font-semibold text-sub-heading mb-0.5">
                                                        {/* {Math.abs(data?.level3?.map( item => item.earning).reduce((prev,next) => (prev-next) ,0).toFixed(2))} */}
                                                        ₹{level_3.toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-700 mt-0">
                                                        {("3rd Family (last month earning)")}
                                                    </p>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>

                                    <div className="space-y-3 shadow-lg border" style={{maxWidth:"450px",maxHeight:'200px'}}>
                                        <div className="">
                                            <div className="flex items-center  py-3 px-4">
                                                <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#FFA7AE] text-light">
                                                    <DollarIcon width={12} />
                                                </div>

                                                <div className="ml-3">
                                                    <p className="text-md lg:text-lg font-semibold text-sub-heading mb-0.5">
                                                    {/* ₹{Math.abs(data?.level3?.map( item => item.commission_value).reduce((prev,next) => (prev + parseFloat(next)) ,0).toFixed(2))} */}
                                                        ₹{level_3_purchase.toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-700 mt-0">
                                                        {("3rd Family (last month purchase)")}
                                                    </p>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>



                                    <div className="space-y-3 shadow-lg border" style={{maxWidth:"450px",maxHeight:'200px'}}>
                                        <div className="">
                                            <div className="flex items-center py-3 px-4">
                                                <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#6EBBFD] text-light">
                                                <PriceWalletIcon width={16} />
                                                </div>

                                                <div className="ml-3">
                                                    <p className="text-md lg:text-lg font-semibold text-sub-heading mb-0.5">
                                                        {withdrawnAmount}
                                                    </p>
                                                    <p className="text-sm text-gray-700 mt-0">
                                                        {("Withdrawn Amount")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="space-y-3 shadow-lg border" style={{maxWidth:"450px",maxHeight:'200px'}}>
                                        <div className="">
                                            <div className="flex items-center py-3 px-4">
                                                <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#6EBBFD] text-light">
                                                   <DollarIcon width={12} />
                                                </div>

                                                <div className="ml-3">
                                                    <p className="text-md lg:text-lg font-semibold text-sub-heading mb-0.5">
                                                        {bill_transfered_amount}
                                                    </p>
                                                    <p className="text-sm text-gray-700 mt-0">
                                                        {("Transfered Amount")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                            </div>
                        </div>

                    </div>
                    </div>


                    <div className='invite-tabs flex flex-col bg-white p-4 w-full mx-4 text-left mt-5 px-8 overflow-x-scroll'>
                        <div className="users-list mt-10">
                            <h1 className="text-lg mb-5 font-semibold text-heading">Leader Transactions</h1>
                            <table className='border-collapse overflow-x-scroll border w-full'>
                                <thead className=' font-normal text-10px md:text-md lg:text-lg p-10'>
                                    <tr className='p-10  font-normal text-10px md:text-md lg:text-sm '>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Date</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Shop name</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Order Id</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Order Value</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Earning</th>
                                    </tr>
                                </thead>
                                <tbody>

                                {
                                    (data?.customer_level?.length==0)&&(
                                        <>
                                        <tr>
                                            <td colSpan="5" className='text-center p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-md font-md text-gray-600'>
                                                No record found
                                            </td>
                                        </tr>
                                        </>
                                    )
                                }

                                {(data?.customer_level).map((commission):any => (
                                    
                                    <tr className='bg-white overflow-x-scroll' key={commission.id}>
                                        <td className=' p-1  border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs lg:text-lg font-lg text-gray-600'>{formateDate(commission.created_at)}</td>
                                        <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-lg font-lg text-gray-600' >{commission.shop_name}</td>
                                        <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-lg font-lg text-gray-600' >{commission.order_track_number}</td>
                                        <td className='p-1 border-b-2  lg:px-4 lg:py-4 sm:text-10px  text:xs lg:text-lg font-lg text-gray-600' >₹{commission.commission_value}</td>
                                        <td className='p-1 border-b-2  lg:px-4 lg:py-4 sm:text-10px  text:xs lg:text-lg font-bold text-green-600' >₹{commission.earning}</td>
                                        {/* <td className='p-1 border-b-2  lg:px-4 lg:py-4 sm:text-10px  text:xs lg:text-md font-md text-gray-600' >₹{
                                        commission?.earning?.reduce((prev, next) => prev + next)
                                        }</td> */}
                                        
                                        
                                    </tr>
                                ))}
                                </tbody>
                                
                            </table>
                        </div>                      
                    </div>

                   


                    <div className='invite-tabs flex flex-col bg-white p-4 w-full mx-4 text-left mt-5 px-8'>
                        <div className="users-list mt-10">

                            <h1 className="text-lg mb-5 font-semibold text-heading">1st Family Transactions</h1>
                            <table className='border-collapse border w-full'>
                                <thead className=' font-normal text-10px md:text-md lg:text-lg p-10'>
                                    <tr className='p-10  font-normal text-10px md:text-md lg:text-sm '>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Date</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Order Id</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Order Value</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Earning</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        (data?.level1?.length==0)&&(
                                            <>
                                                <tr>
                                                    <td colSpan="5" className='text-center p-1 border-b-2  lg:px-4 lg:py-4 text:10px 
                                                                               sm:text-xs  lg:text-md font-md text-gray-600'>
                                                        No record found
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    }
                                    {(data?.level1).map((commission) => (
                                        <tr className='bg-white' key={commission.id}>
                                            <td className=' p-1  border-b-2 lg:px-4 lg:py-4 text:10px sm:text-xs lg:text-lg font-md text-gray-600'>{formateDate(commission.created_at)}</td>
                                            <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-lg font-md text-gray-600' >{commission.order_track_number}</td>
                                            <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-lg font-md text-gray-600' >₹{commission.commission_value}</td>
                                            <td className='p-1 border-b-2  lg:px-4 lg:py-4 sm:text-10px  text:xs lg:text-lg font-bold text-green-600' >₹{commission.earning}</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>                      
                    </div>

                    <div className='invite-tabs flex flex-col bg-white p-4 w-full mx-4 text-left mt-5 px-8'>
                        <div className="users-list mt-10">
                            <h1 className="text-lg mb-5 font-semibold text-heading">2nd Family Transactions</h1>
                                <table className='border-collapse border w-full'>
                                    <thead className=' font-normal text-10px md:text-md lg:text-lg p-10'>
                                        <tr className='p-10  font-normal text-10px md:text-md lg:text-sm '>
                                            <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Date</th>
                                            <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Order Id</th>
                                            <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Order Value</th>
                                            <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Earning</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                            (data?.level2?.length==0)&&(
                                                <>
                                                <tr>
                                                    <td colSpan="5" className='text-center p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-md font-md text-gray-600'>
                                                        No record found
                                                    </td>
                                                </tr>
                                                </>
                                            )
                                        }
                                        {( data?.level2).map((commission) => (
                                            <tr className='bg-white' key={commission.id}>
                                                <td className=' p-1  border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs lg:text-lg font-md text-gray-600'>{formateDate(commission.created_at)}</td>
                                                <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-lg font-md text-gray-600' >{commission.order_track_number}</td>
                                                <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-lg font-md text-gray-600' >₹{commission.commission_value}</td>
                                                <td className='p-1 border-b-2  lg:px-4 lg:py-4 sm:text-10px  text:xs lg:text-lg font-md text-green-600' >₹{commission.earning}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                        </div>                      
                    </div>

                    <div className='invite-tabs flex flex-col bg-white p-4 w-full mx-4 text-left mt-5 px-8'>
                        <div className="users-list mt-10">

                            <h1 className="text-lg mb-5 font-semibold text-heading">3rd Family Transactions</h1>
                            <table className='border-collapse border w-full'>
                                <thead className=' font-normal text-10px md:text-md lg:text-lg p-10'>
                                    <tr className='p-10  font-normal text-10px md:text-md lg:text-sm '>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Date</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Order Name</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Order Value</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Earning</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (data?.level3?.length==0)&&(
                                            <>
                                            <tr>
                                                <td colSpan="5" className='text-center p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-md font-md text-gray-600'>
                                                    No record found
                                                </td>
                                            </tr>
                                            </>
                                        )
                                    }
                                    {( data?.level3).map((commission) => (
                                        <tr className='bg-white' key={commission.id}>
                                            <td className=' p-1  border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs lg:text-xl font-md text-gray-600'>{formateDate(commission.created_at)}</td>
                                            <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-xl font-md text-gray-600' >{commission.order_track_number}</td>
                                            <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-xl font-md text-gray-600' >₹{commission.commission_value}</td>
                                            <td className='p-1 border-b-2  lg:px-4 lg:py-4 sm:text-10px  text:xs lg:text-xl font-md text-gray-600' >₹{commission.earning}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>                      
                    </div>
                </div>
		    </div>
        </div>


        <div><Footer/></div> 
        <MobileNavigation search={false} />

        </>
	)
}

export default ReferralActivity;

export const getStaticProps = async ({ locale }: any) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  };

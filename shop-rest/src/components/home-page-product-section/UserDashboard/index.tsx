
import React, { useState } from 'react'
import UserCurrentBalance from './user-current-balance'
import UserInviteCard from './user-invite-card'
import UserProfile from './user-profile'
import UserTotalEarning from './user-total-earning'
import UserUploadInvoiceCard from './user-upload-invoice-card'
import UserWithdrawCard from './user-withdraw-card'
import UserWithdrawnAmount from './user-withdrawn-amount'
import { useCustomerQuery } from "@data/customer/use-customer.query";
import usePrice from "@utils/use-price";
import {useWalletCommissionQuery} from '@data/user/use-wallet-commission-query'
import { useUI } from "@contexts/ui.context";
import AuthorizedMenu from '@components/layout/navbar/authorized-menu';


export default function UserDashboard() {

    const { data } = useCustomerQuery();

    const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

    
    const { data:wallet, isLoading:loading } = useWalletCommissionQuery({
        limit: 10 as number,
        search:"",
    });

    const { price: totalEarnings } = usePrice(
        data && {
            amount: data?.me?.balance?.total_earnings!,
        }
    );

    const { price: currentBalance } = usePrice(
        data && {
            amount: data?.me?.balance?.current_balance!,
        }
    );
    const { price: withdrawnAmount } = usePrice(
        data && {
            amount: data?.me?.balance?.withdrawn_amount!,
        }
    );
    const { price: bill_transfered_amount } = usePrice(
        data && {
            amount: data?.me?.bill_transfered_amount!,
        }
    );

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

        var this_month= data?.customer_level?.filter((i:any) => {
                    
        var date = new Date(i.created_at);
        // // console.log(data.customer_level);
        // console.log('created at',date);
        // console.log('curr month',currMonth);
        // console.log('year',date.getFullYear());
        // console.log('order month',date.getMonth());
        
        // console.log('last month',lastMonth);

        return date.getMonth() === currMonth && date.getFullYear() === relevantYear;
        }).reduce((prev, curr) => prev +  parseFloat(curr.earning),0);

            // console.log('customerData',data)

            var last_month_earning = data?.customer_level?.filter((i:any) => {
            
                var date = new Date(i.created_at);
                // // console.log(data.customer_level);
                // console.log('created at',date);
                // console.log('curr month',currMonth);
                // console.log('year',date.getFullYear());
                // console.log('order month',date.getMonth());
                
                // // console.log('last month',this_month.toFixed(2));
            
                return date.getMonth() === lastMonth && date.getFullYear() === relevantYear;
            }).reduce((prev, curr) => prev +  parseFloat(curr.earning),0);
              

            // console.log('earning',this_month)

            const [props, setProps] = useState();

            // console.log('data',data)
            // function relDiff(a, b) {
            //     return  100 * Math.abs( ( a - b ) / ( (a+b)/2 ) );
            //    }
            //    // example
            //    // console.log(relDiff(this_month, last_month_earning))
  return (

        <div className='grid grid-cols-1 lg:flex items-center w-full mt-0  lg:py-3
                        px-0 lg:px-3 lg:space-x-5 bg-gray-100'>

            <div className='w-auto xl:w-100'>
                <UserProfile data={data?.me}/>
            </div>

            <div className='grid grid-cols-2  border-b lg:border-b-0  place-content-center mt-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2   gap-1 lg:gap-3 h-full p-  lg:w-full'>

                {/* <div className='grid grid-cols-2 lg:flex gap-3 h-48 items-center'> */}
                    {/* <div className='col-span-2'> */}
                    <UserTotalEarning isAuthorize={isAuthorize} 
                                      totalEarnings={totalEarnings}/>
                    <UserWithdrawnAmount isAuthorize={isAuthorize} 
                                         withdrawnAmount={withdrawnAmount}
                                         />
                    {/* </div> */}
                     
                     
                {/* </div> */}
                {/* <div className='grid grid-cols-2 lg:grid lg:grid-cols-2 xl:flex gap-3 h-48 items-center'> */}
                    <UserWithdrawCard currentBalance={currentBalance} />
                    <UserInviteCard />
                    <UserUploadInvoiceCard />
                    <UserCurrentBalance isAuthorize={isAuthorize} 
                                        currentBalance={currentBalance}/>
                {/* </div> */}

            </div>

        </div>
  )
}

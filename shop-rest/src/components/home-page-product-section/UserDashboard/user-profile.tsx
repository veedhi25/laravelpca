
import { ArrowCircleRightIcon } from '@heroicons/react/outline';
import React from 'react';
import { useRouter } from "next/router";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUI } from "@contexts/ui.context";
import { useState, useEffect } from 'react';
import { useAnalyticsQuery } from '@data/analytics/use-analytics.query';
import Image from 'next/image';

export default function UserProfile({data}:any) {

    const { openModal } = useModalAction();
    const router = useRouter();
  
    const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();
  
    function getLink() {
          
      isAuthorize ? router.push('/user/referral-network') :
        openModal("OTP_REGISTER")
  
  }

  //setInterval to increment the value by 2 every minute
    const [value, setValue] = useState(102166);

    //useEffect
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setValue(value + 2);
    //     }, 10000);
    //     return () => clearInterval(interval);
    // }, [value]);

    // setInterval(() => {
    //   setValue(value + 2);
    // }, 60000);

    

    const { data:analytics, isLoading: loading } = useAnalyticsQuery()

    // console.log('analytics', analytics)

    const users = (analytics?.totalUsers + 200000)
    
    var x=users;
    x=x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    
    

  return (

        <div className='flex flex-col justify-evenly rounded-xl lg:h-110 xl:space-y-4 2xl:py-5 shadow-3xl w-full  bg-gradient-to-r from-red-50   to-blue-50 drop-shadow-2xl p-6  sm:p-3'>
        
            {/* <div className=''> */}
            <div className='flex space-x-3 justify-between items-center border-b pb-3 '>
                {/* <span className='rounded-full w-10 h-10 border bg-red-400'></span> */}
                <div className=''>
                    <h3 className='text-gray-600 text-xl font-light'>Hey, <span className='text-gray-800 font-semibold'>
                        {data ? data?.name.split(' ')[0] : 'Guest'}
                    </span></h3>
                    <p className='text-md text-gray-400 font-light'>Welcome to Acharyakulam Community</p>
                </div>
                <div className=' flex lg:hidden justify-around items-start mt-2 space-y-3'>
                           <Image quality='40' 
                        height={56}
                        width={56}
                        src='/boy.png'
                        // src={data ? data?.profile?.avatar?.thumbnail : '/boy.png'} 
                        alt='profile'
                        className='rounded-full'
                        //   className='h-16 w-16 border rounded-full' alt='profile'
                        />
                        {/* <p className='text-lg  font-semibold'>{!!data ? data?.name : 'Guest'}</p> */}
                    </div>
            </div>
            {/* </div> */}

            <div className='flex flex-col 2xl:space-y-8 w-full space-y-3'>
                <div className='space-y-8 text-center'>
                    
                <div className='hidden lg:flex justify-around items-start mt-2 space-y-3'>
                           <Image quality='40' 
                        height={56}
                        width={56}
                        src='/boy.png'
                        // src={data ? data?.profile?.avatar?.thumbnail : '/boy.png'} 
                        alt='profile'
                        className='rounded-full'
                        //   className='h-16 w-16 border rounded-full' alt='profile'
                        />
                        <p className='text-lg  font-semibold'>{!!data ? data?.name : 'Guest'}</p>
                    </div>


                    <div className='font-semibold text-xl'><span>Acharyakulam Community Count</span> 
                      <p className='font-bold text-gray-600 mt-3 text-3xl'>{res}</p>
                    </div>
                </div>

                <div className='flex space-y-8 flex-col'>
                        <button onClick={getLink}  
                                className='flex flex-col bg-gradient-to-l  transition duration-500 from-magenta to-blue-500 
                                         text-white text-center rounded-lg p-3'>
                            <span className='font-bold text-3xl'> Explore </span>
                            <p className='text-xl font-semibold'>Your Community</p>
                        </button>
                        {/* <span onClick={getLink}  className='cursor-pointer flex items-center'>
                            <p className='text-sm hover:text-indigo-600 font-light'>Explore Your Community</p>
                            <ArrowCircleRightIcon className='h-7 w-7 ml-1 '/>
                        </span> */}
                </div>
            </div>

        </div>
  )
}

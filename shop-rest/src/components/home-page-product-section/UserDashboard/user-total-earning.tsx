import CartCounterButton from '@components/cart/cart-counter-button'
import { CaretDown } from '@components/icons/caret-down'
import { CaretUp } from '@components/icons/caret-up'
import { ArrowNarrowUpIcon } from '@heroicons/react/outline'
import React from 'react'
import { useRouter } from "next/router";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUI } from "@contexts/ui.context";
import Image from 'next/image'

export default function UserTotalEarning({totalEarnings}:any) {

  
  function relDiff(a, b) {
    return  100 * Math.abs( ( a - b ) / ( (a+b)/2 ) );
   }
   // example
   relDiff(11240, 11192)
   const { openModal } = useModalAction();
  const router = useRouter();

  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

  function getLink() {
    isAuthorize ? router.push('/user/wallet') :
      openModal("OTP_REGISTER")
  }

  return (

    <div className='relative flex-1 flex-col pl-6 sm:pl-0 border-r sm:border-r-0 lg:hover:drop-shadow-2xl  lg:py-8  bg-white h-44 lg:h-full  justify-center rounded-lg lg:rounded-xl p-2 px-3'>

    <div className='flex items-start h-full  align-center space-x-4 justify-evenly'>
            
            <div className='hidden sm:flex relative rounded-full px-2 bg-magenta w-16 h-16 '>
                 <Image quality='40' src='/dashboard/rupees.png' layout='fill'
                   className='absolute m-auto  h-12 w-12 ' 
                   alt='money' />
            </div>
            
            <div className='text-xl font-light w-auto md:w-36 xl:w-40 2xl:w-48 text-gray-500'>
                {/* <div className='flex text-left flex-col'> */}
                    <h4 className='font-semibold text-sm md:text-sm xl:text-lg 2xl:text-xl text-gray-800 '>
                          Total Earning
                    </h4>
                    <p className='flex items-center text-lg  xl:text-2xl mt-4 font-light text-gray-600'>
                          {isAuthorize ? totalEarnings : '₹' + ' ' + '0.00'} 
                    </p>
                    
                {/* </div> */}
                <div className=' flex flex-col text-xl md:w-36 xl:w-44 2xl:w-48 font-light text-gray-500'>
                  <div className='flex flex-col  h-28 lg:h-auto w-44 md:w-auto space-y-1'>
                    <p className=' items-center space-x-2 text-sm w-44 lg:w-auto font-light text-gray-500'>
                      <span className='text-2xl '></span>Get<span className=' font-semibold text- '>FLAT 4%</span> <br/>
                      <span className=''>on every order</span>
                    </p>
                  </div>

                  <div className=''>
                    <button onClick={getLink} className=' bottom-2 lg:bottom-6 absolute bg-gradient-to-r from-green-500 to-magenta px-5 
                    hover:from-green-600 hover:to-yellow-600 text-sm
                              text-white font-semibold lg:px-4 xl:px-9 py-1 lg:py-1 xl:py-2 rounded-lg shadow-md'>
                      View
                    </button>
                  </div>
                </div>

            </div> 
                
        </div>

        {/* <div className=''>
        

          <button onClick={getLink} className=' left-12 lg:left-6 xl:left-16 bottom-2 absolute bg-gradient-to-r from-blue-300 to-blue-600 px-3 
          hover:from-blue-500 hover:to-blue-800
                     text-white font-semibold lg:px-4 xl:px-7 py-1 lg:py-2 xl:py-2 rounded-lg shadow-md'>
            View
          </button>
               
        </div> */}
       

    </div>
  )
}

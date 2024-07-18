import React from 'react'
import { useRouter } from "next/router";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUI } from "@contexts/ui.context";
import Image from 'next/image';


export default function UserWithdrawCard({currentBalance}:any) {
  const { openModal } = useModalAction();
  const router = useRouter();

  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

  function getLink() {
		
    isAuthorize ? router.push('/user/withdraws/create') :
      openModal("OTP_REGISTER")

}
  return (

    <div className='flex-1 flex-col h-44 pl-6 sm:pl-0 lg:h-full lg:py-8 border-r sm:border-r-0 lg:hover:drop-shadow-2xl  
                    bg-white rounded-lg lg:rounded-lg p-2 px-3'>
        
        <div className='flex items-start  space-x-4 justify-evenly'>
            
            {/* <div className='w-20'> */}
            <div className='hidden sm:flex relative rounded-full px-2 pt-2 bg-green-200 w-16 h-16 '>
                  <Image  quality='40' src='/dashboard/money-withdrawal.png' layout='fill' className='w-12 h-12' alt='money' />
            </div>
            {/* </div> */}
            
            <div className=' flex flex-col text-xl md:w-36 xl:w-44 2xl:w-48 font-light text-gray-500'>
                  <div className='flex flex-col  h-28 w-44 md:w-auto space-y-1 '>
                      <h4 className='font-semibold text-xs sm:text-sm xl:text-lg  2xl:text-xl text-gray-800 '>
                            Request Withdraw
                      </h4>
                      <span className='text-xs lg:text-sm py-2 h-28 lg:h-auto text-gray-500'>
                            Get instant cash in bank <br/>
                           <span className='font-semibold'>zero service</span> charges.<br/>
                          Available : <span className='font-semibold text-lg '>{isAuthorize ? currentBalance : '₹' + ' ' + '0.00'}</span>
                      </span>
                  </div>

                  <div className=''>
                    <button onClick={getLink} className=' font-semibold drop-shadow-lg lg:mt-10
                              bg-gradient-to-r from-green-400 to-green-800 hover:from-green-600 hover:to-green-600 
                              text-white  text-sm px-3 lg:px-3 xl:px-7 py-1 lg:py-1 xl:py-2 rounded-lg'>
                        Request
                    </button>
                  </div>
            </div> 
            
                
        </div>

    </div>
  )
}

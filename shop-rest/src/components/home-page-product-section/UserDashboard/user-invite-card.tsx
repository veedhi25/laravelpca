import React from 'react'
import { useRouter } from "next/router";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUI } from "@contexts/ui.context";
import Image from 'next/image';

export default function UserInviteCard() {
  const { openModal } = useModalAction();
  const router = useRouter();

  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

  function getLink() {
		
    isAuthorize ? router.push('/user/invite') :
      openModal("OTP_REGISTER")

}

  return (

    <div className='flex-1 flex-col h-44 pl-6 sm:pl-0 lg:h-full lg:py-8 border-r sm:border-r-0 lg:hover:drop-shadow-2xl  
                  bg-white rounded-lg lg:rounded-lg p-2 px-3'>      

        <div className='flex items-start space-x-4  justify-evenly'>
          
          {/* <div className='w-20'> */}
          {/* <div className='relative rounded-full px-2 pt-1 bg--800  '>
               < Image        quality='40' src='/dashboard/add-friend.png' layout='fill' className=' ' alt='money' />
          </div> */}

          <div className='hidden sm:flex relative rounded-full px-2  bg-magenta w-16 h-16 '>
                 <Image  quality='40' src='/dashboard/add-friend.png' layout='fill'
                   className='absolute m-auto  h-12 w-12 ' 
                   alt='money' />
          </div>
          {/* </div> */}

            <div className='flex flex-col w-auto md:w-36 xl:w-44 2xl:w-48 text-lg space-y-2 font-light text-gray-500'>
                <div className='flex flex-col h-28 space-y-1 '>
                    <h4 className='font-semibold text-xs sm:text-sm xl:text-lg 2xl:text-xl text-gray-800 '>
                          Invite Friends
                  </h4>
                  <span className='text-xs lg:text-sm py-2 h-28 w-44  lg:w-auto text-gray-500'>
                      Get   <span className='font-semibold'>₹10 cashback </span>  
                        per user  registered with you  
                        and see your network
                        
                  </span>
                </div>

                <div className=''>
                  <button onClick={getLink} className=' font-semibold lg:mt-8 
                          text-sm  bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-600 hover:to-red-600
                             text-white  px-5 lg:px-5 xl:px-7 py-1 lg:py-1 xl:py-2 rounded-lg'>
                      Invite
                  </button>
                </div>
            </div> 
                
        </div>

       
       

    </div>
  )
}

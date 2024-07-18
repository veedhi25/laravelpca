import React from 'react'
import { useRouter } from "next/router";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUI } from "@contexts/ui.context";
import Image from 'next/image';

export default function UserUploadInvoiceCard() {

  const { openModal } = useModalAction();
  const router = useRouter();

  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

  function getLink() {
		
    isAuthorize ? router.push('/user/upload-invoice/upload-form') :
      openModal("OTP_REGISTER")

}

  return (
      
    <div className='flex-1 flex-col h-44 pl-6 sm:pl-0 border-r sm:border-r-0 lg:h-full lg:py-8  lg:hover:drop-shadow-2xl  
                  bg-white rounded-lg lg:rounded-lg p-2 px-3'>        
          <div className='flex items-start space-x-4 h-full justify-evenly'>
          
                <div className='hidden sm:flex relative rounded-full pl-2 pt-2 bg-indigo-100 w-16 h-16 '>
                      <Image  quality='40' src='/dashboard/photo.png' layout='fill' className='w-12 h-12' alt='money' />
                </div>
                <div className='flex flex-col text-lg w-auto md:w-36 xl:w-40 2xl:w-44 lg:text-2xl space-y-2 font-light text-gray-500'>
                    <div className='flex flex-col h-28 space-y-2 '>
                        <h4 className='font-semibold text-xs sm:text-sm xl:text-lg  2xl:text-xl text-gray-800 '>
                                Upload Invoice
                        </h4>
                        <p className='text-xs lg:text-sm h-28 whitespace-normal  w-44 md:w-auto text-gray-500'>
                            Upload Invoice/Bill and <br/> get  <span className='font-semibold'>5% </span>  
                            cashback <br/> upto ₹50 per bill 
                        </p>
                    </div> 
                    <div className=''>
                        <button onClick={getLink} className=' font-semibold text-sm lg:mt-8
                                  bg-gradient-to-r from-green-500 to-blue-800 hover:from-green-700 hover:to-blue-900
                                  text-white  px-5 lg:px-3 xl:px-7 py-1 lg:py-1 xl:py-2 rounded-lg'>
                            Upload
                        </button>
                    </div>
                </div>
                
                  
          </div>

     

        {/* <p className='absolute bottom-0 text-blue-600 text-sm left-5 '>
          Terms & Conditions</p> */}
    </div>
  )
}

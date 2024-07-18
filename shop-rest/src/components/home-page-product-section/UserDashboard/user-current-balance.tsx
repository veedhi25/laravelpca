import Image from 'next/image'
import React from 'react'

export default function UserCurrentBalance({currentBalance,isAuthorize}:any) {


  return (

        <div className='flex-1 flex-col pl-6 sm:pl-0 lg:hover:drop-shadow-2xl  lg:py-8 bg-white h-44 lg:h-full rounded-lg lg:rounded-lg p-2 px-'>
            
            <div className='flex items-start space-x-0 justify-evenly'>
            
                <div className='hidden sm:flex relative rounded-full px-2 pt-1 bg-yellow-200 w-16 h-16 '>
                    <Image  quality='40' src='/dashboard/wallet.png' layout='fill' className='w-12 h-12' alt='money' />
                </div>
                
                <div className='flex flex-col text-sm lg:text-xl w-auto md:w-36 xl:w-44 2xl:w-48 font-light text-gray-500'>
                    <h4 className='font-semibold whitespace-nowrap text-xs  sm:text-sm xl:text-lg 2xl:text-xl text-gray-800 '>
                        Current Balance
                    </h4>
                    <p className='text-lg lg:text-xl xl:text-2xl text-gray-700 mt-4 font-light'>
                    {isAuthorize ? currentBalance : '₹' + ' ' + '0.00'} 
                    </p>
                    <span className='text-xs lg:text-sm py-2 h-28  text-gray-500'>
                            Available amount that you     <br/>
                            can withdraw any time. <br/>
                        <span className='font-semibold'> No service charges.</span> 
                    </span>
                </div> 
                    
            </div>

        </div>

  )
}

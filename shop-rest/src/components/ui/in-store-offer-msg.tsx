import React from 'react'

export default function InStoreOfferMessage() {
  
  return (

    <div className='flex flex-col justify-center  text-center bg-white h-60 w-60'>
       
        <div className='flex flex-col items-center justify-center'>
          <div className='text-5xl font-bold'>
            <span role='img' className='text-5xl' aria-label='emoji'>
              🤗
            </span>
          </div>
          </div>

           <span className='text-center p-2  font-semibold text-gray-700'>
            This offer is only available in-stores.
           </span>
    </div>
  )
}

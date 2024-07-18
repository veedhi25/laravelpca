import React from 'react';
import Image from 'next/image';


export default function OfferImageView(offer:any) {

    const url =  offer?.data?.offer;

    console.log('view', url)

  return (


    <div className='flex flex-col h-screen w-full bg-white'>

        <img 
        src={offer?.data?.offer?.image?.thumbnail} 
        // layout='fill' 
        // quality={40}
        // objectFit='contain'
        className='object-contain h-full w-full'
        alt={offer?.data?.offer?.name} />
         
        
    </div>
  )
}

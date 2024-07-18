import React from 'react'
 import { useLocation } from "@contexts/location/location.context";

import { useEffect, useState } from 'react';


export default function SearchBarModal() {

    const {getLocation} =useLocation()

    const handleLocation = () => {
        setLocation(!location);
    }

    const [location, setLocation] = useState(false);

  return (

        <div className='h-110 w-96 bg-white'>

            <div className='h-full w-full '>

                                {/* <input onClick = {handleLocation} 
                                        defaultValue = {getLocation?.formattedAddress}  
                                        className =' shadow-md text-gray-500 placeholder:text-gray-500  
                                                     rounded-lg text-sm rounded-l-lg rounded-r-none h-12 outline-none active:border-gray-400
                                                    border-2 border-e-0  focus:border-accent pr-4  border-gray-400 pl-2 ' 
                                        placeholder = 'Enter location' id='location_id' /> */}
                                
                                    <div className='flex lg:w-3/5'>
                                            {/* <DropDown  getLoc={handleLocation} /> */}
                                    </div>

                                </div>

        </div>
  )
}

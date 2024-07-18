import getAddress from "@components/geoCode/geo-code"
import { MapPin } from '@components/icons/map-pin';
import { useLocation } from "@contexts/location/location.context";
import { useEffect, useState } from "react";
import  { useRouter } from 'next/router';
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useUI } from "@contexts/ui.context";
import { useUpdateCustomerMutation } from "@data/customer/use-update-customer.mutation";
import { useUpdateUserMutation } from "@data/customer/use-update-user.mutation";

export default function CityButton({lat, lng, city,
    onChange
  }:{
    onChange: any;
    lat: any;
    lng: any;
    city: any;
  }){

    const router = useRouter();

    const pathname = router.pathname;

    
    const {addLocation, getLocation} =useLocation();

  const {isAuthorize} = useUI();

 
    // useEffect(() => {
    //   const location: any = {
    //     lat:  30.7320 ,
    //     lng:  76.7726 ,
    //     formattedAddress:  'Chandigarh'  ,
    //   };
      
    //    pathname == '/salon-near-me'  && addLocation(location);

    //      if(getLocation?.formattedAddress === null){
    //        getLoc();
    //      }
       
    //    }, [addLocation,pathname])

    const [spin, setSpin] = useState(false);

    function getLoc() {
        setSpin((setSpin) => !setSpin);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            alert("Geolocation is not supported by this browser.");
        }
    }

    async function showPosition(position:any) {
       
        var address = await getAddress({lat:lat,lng:lng})
        // console.log('address',address);

        const location: any = {
            lat:  lat,
            lng:  lng,
            formattedAddress:  city,
          };

        // console.log(location);
        addLocation(location);

        onChange(location);
    }

    return (

        <>
            <button onClick = {showPosition} 
               className=' flex float-left  hover:border-gray-400 text-sm sm:text-sm md:text-md w-48 lg:w-40 items-center justify-center
                           relative bg-gray-50 border transition duration-500 ease-in-out  transform active:-translate-y-1 active:scale-95 
                           text-gray-600 p-2  text-center rounded-full   shadow-md font-md '> 
                  {/* <span className='mr-1 md:mr-1.5 md:w-4'><img src='/gps-white.png' className={`${spin ? 'animate-pulse' : 'animate-none'} */}
                  {/* mx-1 md:-mx-1  object-cover w-3 h-3 sm:w-4 sm:h-4`}/></span> */}
                {city}    
            </button>
        </>

    )
    // <button onClick={handleCurrentLocation} className = {` ${ active ? 'block' : 'hidden'}  absolute flex items-center shadow-2xl font-semibold placeholder:text-gray-50 rounded w-60 top-22 ml-1 bg-gray-50 text-accent  py-4`}>
    // <img src='/gps.png' className=' mr-5 ml-2  text-green-400  w-6 h-6'/> Get Current Location </button>

}

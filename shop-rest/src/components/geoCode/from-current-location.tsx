import getAddress from "@components/geoCode/geo-code"
import { MapPin } from '@components/icons/map-pin';
import { useLocation } from "@contexts/location/location.context";
import { useUI } from "@contexts/ui.context";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useUpdateCustomerMutation } from "@data/customer/use-update-customer.mutation";
import { useUpdateUserMutation } from "@data/customer/use-update-user.mutation";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function GetCurrentLocation({
    onChange
  }:{
    onChange: any;
  }){
    const {addLocation} =useLocation()
    const router = useRouter();

    const {data} = useCustomerQuery();

    const { mutate: updateProfile, isLoading: loading } =
    useUpdateCustomerMutation();

    const { mutate: updateUser, isLoading: loadingUser } =
    useUpdateUserMutation();

    const {isAuthorize} = useUI();

    const pathname = router.pathname;

    useEffect(() => {

      if(addLocation?.formattedAddress === null){
        getLoc();
      }

    }, [addLocation, location])

    useEffect(()=>{
      const location: any = {
        lat:  30.7320 ,
        lng:  76.7726 ,
        formattedAddress:  'Chandigarh',
      };
       pathname == '/salon-near-me' || pathname == '/restaurant-deals-near-me'   && addLocation(location);
    },[])

    function getLoc() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
             
        } else { 
            alert("Geolocation is not supported by this browser.");
        }
    }

    async function showPosition(position:any) {
       
        var address = await getAddress({lat:position.coords.latitude,lng:position?.coords.longitude})
        // console.log(address);

        const location: any = {
            lat: position.coords.latitude,
            lng: position?.coords.longitude,
            formattedAddress: address,
          };

        addLocation(location);



        onChange(location);

    }

    return (
        <>
            <button onClick = {getLoc} className=' flex items-start justify-center text-xs sm:text-sm relative bg-white border mt-3 px-1 p-1 sm:px-1 2xl:px-8 2xl:p-2  rounded-lg text-accent font-semibold' > 
              <img src='/gps.png' className=' mr-2 ml-2  text-green-400   w-3 h-3 sm:w-6 sm:h-6'/>     current location   
            </button>
        </>
    )
    // <button onClick={handleCurrentLocation} className = {` ${ active ? 'block' : 'hidden'}  absolute flex items-center shadow-2xl font-semibold placeholder:text-gray-50 rounded w-60 top-22 ml-1 bg-gray-50 text-accent  py-4`}>
    // <img src='/gps.png' className=' mr-5 ml-2  text-green-400  w-6 h-6'/> Get Current Location </button>

}

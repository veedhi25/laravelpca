import getAddress from "@components/geoCode/geo-code"
import { MapPin } from '@components/icons/map-pin';
import { useLocation } from "@contexts/location/location.context";
import { getLocation } from "@contexts/location/location.utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { useUpdateCustomerMutation } from "@data/customer/use-update-customer.mutation";
import { useUpdateUserMutation } from "@data/customer/use-update-user.mutation";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useUI } from "@contexts/ui.context";


export default function GetCurrentLocation({
    onChange
  }:{
    onChange: any;
    
  }){
    const {addLocation} = useLocation();

    const [spin, setSpin] = useState(false);
    const router = useRouter();

    const pathname = router.pathname;

    var options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000
        //session time
      };

       const [btn, setBtn] = useState('Detect');

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      console.log('path',router.pathname)

      const {getLocation} =useLocation();
 
      const[address,setAddress] = useState('');

      const {data} = useCustomerQuery();

      const { mutate: updateProfile, isLoading: loading } =
      useUpdateCustomerMutation();
  
      const { mutate: updateUser, isLoading: loadingUser } =
      useUpdateUserMutation();

      const {isAuthorize} = useUI();


       useEffect(() => {

        const location: any = {
          lat: '30.7320',
          lng: '76.7726',
          formattedAddress: 'Chandigarh',
        };
        
        if(getLocation?.length === 0){
         router.pathname == '/salon-near-me' || 
         router.pathname == '/restaurant-deals-near-me' &&  
         addLocation(location) ;
        }
      
      }, [router.pathname])

      console.log('getloc',getLocation)
      

      const getLoc = () => {
        setSpin(true);
        setBtn('Detecting...');
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            showPosition,
            handleError,
            options
          );
        } else {
          alert('Geolocation is not supported by this browser.');
          setBtn('Detect');
          setSpin(false);
        }
      };

      const handleError = (error) => {
        alert(`ERROR(${error.code}): ${error.message}`);
        setBtn('Detect');
        setSpin(false);
      };
    
 
    async function showPosition(position:any) {

        var address = await getAddress({
            lat:position?.coords?.latitude,
            lng:position?.coords?.longitude
        });
        
        // alert(address);

        // console.log('address',address)
        
        const location: any = {
            lat: position.coords?.latitude,
            lng: position?.coords?.longitude,
            formattedAddress: address,
          };

          // window.location.reload();

        // console.log('lat lng',location)

        // alert(location);
        addLocation(location);
       
        setBtn('Detect');
        onChange(getLoc);
    }

    const url = typeof window !== 'undefined' && window?.location?.href

    return (

        <> 
          { url && url?.includes('/register' || '/invite') ?
              <button onClick = {getLoc} className=' flex float-left  sm:mx-0 items-center  text-sm sm:text-sm md:text-md 
                                text-white relative bg-blue-600 transition duration-500 ease-in-out  transform active:-translate-y-1 active:scale-95 
                                  rounded   p-2 mb-3 whitespace-nowrap   shadow-md font-md '> 
                      <span className='mr-1 md:mr-1.5 md:w-4'>
                          <img src='/gps-white.png' 
                              className={`${spin ? 'animate-pulse' : 'animate-none'}
                                          mx-1 md:-mx-1  object-cover w-3 h-3 sm:w-4 sm:h-4`}/>
                      </span>
                  Get current location     
              </button>
              : 
              <button onClick = {getLoc} 
                      className='relative rounded font-semibold bg-blue-700 p-2 px-3 text-white mb-3 
                                 flex float-left mx-4  sm:mx-0 items-center text-sm sm:text-sm md:text-md'>
                {btn} 
              </button>
          }
        </>
    )
    // <button onClick={handleCurrentLocation} className = {` ${ active ? 'block' : 'hidden'}  absolute flex items-center shadow-2xl font-semibold placeholder:text-gray-50 rounded w-60 top-22 ml-1 bg-gray-50 text-accent  py-4`}>
    // <img src='/gps.png' className=' mr-5 ml-2  text-green-400  w-6 h-6'/> Get Current Location </button>

}


import { useEffect, useState } from 'react';
import JoinButton from "@components/layout/navbar/join-button";
import { useUI } from "@contexts/ui.context";
import AuthorizedMenu from '@components/layout/navbar/authorized-menu';
import { CaretDown } from '@components/icons/caret-down';
import DropDown from "@components/ui/dropDown"
import GooglePlacesAutocomplete from "@components/form/google-places-autocomplete";
import { useRouter } from "next/router";
import Logo from "@components/ui/logo";
import GetCurrentLocation from "@components/geoCode/get-current-location"
import { useLocation } from "@contexts/location/location.context";
import MobileJoinButton from '@components/layout/navbar/mobile-join-button';
import CityButton from '@components/geoCode/city-buttton';
import { SearchIcon } from '@components/icons/search-icon';
import { useModalAction } from "@components/ui/modal/modal.context";
import Link from 'next/link';
import Image from 'next/image';
// import { useShopAvailabilityQuery } from '@data/home/use-shop-availability-query';
import { useUpdateCustomerMutation } from '@data/customer/use-update-customer.mutation';
import { useCustomerQuery } from '@data/customer/use-customer.query';


const cities = //create object of major  indian cities with lat, lng and city name
    [
        {
            city: "Chandigarh",
            lat: 30.7320,
            lng: 76.7726
        },
        
        {
            city: "Mohali",
            lat: 30.714274,
            lng: 76.722701
        },

        {
            city: "Panchkula",
            lat: 30.690112,
            lng: 76.847901
        },

        {
            city:'Shimla',
            lat: 31.1048,
            lng: 77.1734
        },

        {
            city: "Ambala",
            lat: 30.3643,
            lng: 76.7721
        },
        
        {
            city:'Amritsar',
            lat: 31.633,
            lng: 74.87
        },
        {
            city:'Jalandhar',
            lat: 31.32,
            lng: 75.57
        },
        {
            city:'Ludhiana',
            lat: 30.89,
            lng: 75.85
        },
        {
            city:'Jaipur',
            lat: 26.9124,
            lng: 75.7873
        },
        {
            city:'Kota',
            lat: 30.3,
            lng: 76.22
        },
        {
            city: "Delhi",
            lat: 28.7041,
            lng: 77.1025
        },
        {
            city:'Gurgaon',
            lat: 28.4600,
            lng: 77.0300
        },
        {
            city:'Patna',
            lat: 25.59,
            lng: 85.13
        },
        {
            city:'Gwalior',
            lat: 26.22,
            lng: 78.17
        },
        {
            city:'Guwahati',
            lat: 26.14,
            lng: 91.73
        },
        {
            city:'Ranchi',
            lat: 23.34,
            lng: 85.31,
        },
        {
            city:'Surat',
            lat: 21.17,
            lng: 72.83,
        },
        {
            city: 'Kanpur',
            lat: 26.44,
            lng: 80.33
        },
        {
            city: "Ahemdabad",
            lat: 23.0225,
            lng: 72.5714
        },
        {
            city: "Kolkata",
            lat: 22.5726,
            lng: 88.3639
        },
        {
            city: "Mumbai",
            lat: 19.0760,
            lng: 72.8777
        },
        {
            city:'Nashik',
            lat: 20.01,
            lng: 73.02
        },
        {
            city: "Bangalore",
            lat: 12.9716,
            lng: 77.5946
        },
        {
            city: "Hyderabad",
            lat: 17.3850,
            lng: 78.4867
        },
        {
            city:'Varanasi',
            lat: 25.3,
            lng: 82.97
        },
        {
            city:'Vadodara',
            lat: 22.31,
            lng: 73.19,
        },
        {
            city: "Chennai",
            lat: 13.0827,
            lng: 80.2707
        },
        {
            city:'Vishakhapatnam',
            lat: 17.68,
            lng: 83.22
        }
    ]
  


export default function HeaderMiddle({searchbar}:any) {

    const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

    const [JoinBtn, setJoinButton] = useState(true);

    console.log('searchbar',searchbar)
    useEffect(() => {
        isAuthorize && setJoinButton(false)
    }, [isAuthorize])

    

    const truncate = (txt:any, n:number) => {
      return  txt.length > 10 ? txt.substring(0, n) : txt
    }

    const {getLocation} =useLocation();

    console.log('getlocation',getLocation)
    
    const router = useRouter();

    const {data:userData} = useCustomerQuery();

    const [click, setClick ] = useState(false);

    const [hasLocation, setHasLoction] = useState(false);

    const { mutate: updateProfile } =
    useUpdateCustomerMutation();

    console.log('profile id', userData);

    const handleLocation = async  (newLocation:string) => {
 
        setLocation(!location);

        await updateProfile(    
            { 
              id: userData?.me?.id,
              current_location: newLocation,
            },
            {
              onSuccess: (data) => {
                console.log("Location updated  ");
              },
              onError: (error) => {
                console.log("Location update error:");
                // You can display an error message to the user here.
              },
            }
        );
        
    }

    const { openModal } = useModalAction();

    function handleSearchModal() {
        return openModal("SEARCH_BAR_MODAL");
    }

    const [location, setLocation] = useState(false);
   
    const closeNav = () => {
        setClick(!click)
    }

    const [address, setAddress] = useState('');

   
    const closeLocation = () => {
        setLocation(!location)
    }

    const openNav = () => {
        setClick(!click);
    }

    useEffect(()=>{
        if(!getLocation?.formattedAddress?.length){
            setLocation(true);
            setHasLoction(false);
        //  
        } else {
            setAddress(getLocation?.formattedAddress);
            
            setHasLoction(true);
            setLocation(false);
            // closeLocation(); 
        }
    },[getLocation?.formattedAddress])

    
    function changeLocation(data:any){
       
        var location=JSON.stringify(data);
        // console.log(data?.formattedAddress);
        document.getElementById("location_id").value=data?.formattedAddress;
        setLocation(data?.formattedAddress);
        setAddress(data?.formattedAddress);

           

        if(location){
            setHasLoction(true);
            closeLocation(); 
            
        }

        var { query ,pathname} = router;
        var pathname="/"+router.locale+pathname
        
        router.push(
            {
                pathname,
                query: query,
            },
            {
                pathname,
                query: query,
            },
        );

        handleLocation(data);
        //  updateProfile(
        //     {
        //       id: userData?.me?.id,
        //       current_location: {getLocation},
        //     },
        //     {
        //       onSuccess: (data) => {
        //         console.log('Location updated in ', getLocation?.formattedAddress);
        //       },
        //       onError: (error) => {
        //         console.log("Location updated error:");
        //         // You can display an error message to the user here.
        //       },
        //     }
        //    );
    }

    console.log('Location updated out', getLocation?.formattedAddress )


    // const {
    //     data,
    //     isLoading: loading,
    //     isFetchingNextPage,
    //     fetchNextPage,
    //     hasNextPage,
    //     error,
    //   } = useShopAvailabilityQuery({
    //     limit: 16 as number,
    //     search:"",
    //     location : ((getLocation?.formattedAddress) ? JSON.stringify(getLocation):null ) as any
    //   });

    //   const shop_check = data?.ShopAvailability?.data?.check;

    // console.log('Login', isAuthorize);
    // console.log('getlocation',getLocation);

    
    return (

        <div>hi</div>

    )
}




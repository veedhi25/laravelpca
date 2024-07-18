import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import { LocationInput } from "@ts-types/generated";
import React, { useState ,useEffect } from "react";
import { useTranslation } from "next-i18next";
import Loader from "@components/ui/loader/loader";
import { useLocation } from "@contexts/location/location.context";
import { useCreateLogMutation } from "@data/log/use-create-log.mutation";
import useOnClickOutside from "@utils/use-click-outside";
import { MapIcon } from "@heroicons/react/outline";


const libraries: Libraries = ["places"];
// data,
// data: LocationInput;
export default function GooglePlacesAutocomplete({address,closeLocation,
  onChange
}: {
  onChange: any;
  address :any
}) {
  const { t } = useTranslation();
  const [loc,setLocation]=useState(address);
  const {addLocation,getLocation} =useLocation()
  const { mutate: createLog, isLoading: loading } = useCreateLogMutation();

  useEffect(()=>{
    setLocation(getLocation?.formattedAddress)
  },[getLocation]);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google_map_autocomplete",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    libraries,
  });

  const [autocomplete, setAutocomplete] = React.useState<any>(null);

  const onLoad = React.useCallback(function callback(autocompleteInstance) {
    setAutocomplete(autocompleteInstance);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    
    setAutocomplete(null);
  }, []);

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();
    

    if (!place.geometry || !place.geometry.location) {
      
      // console.log("Returned place contains no geometry");
      return;
    }  

    setLocation(place.formatted_address);
    const location: any = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      formattedAddress: place.formatted_address,
    };

    for (const component of place.address_components) {
      // @ts-ignore remove once typings fixed
      const componentType = component.types[0];

      switch (componentType) {
        case "postal_code": {
          location["zip"] = component.long_name;
          break;
        }

        case "postal_code_suffix": {
          location["zip"] = `${location?.zip}-${component.long_name}`;
          break;
        }

        case "locality":
          location["city"] = component.long_name;
          break;

        case "administrative_area_level_1": {
          location["state"] = component.short_name;
          break;
        }

        case "country":
          location["country"] = component.long_name;
          break;
      }
    }

    if (onChange) {
      addLocation(location);
      
      onChange(location);
      

      createLog({location:location.formattedAddress}, {
        onSuccess: (data: any) => {
         
          // console.log(data)
        },
        onError: (error: any) => {
          
        },
      });
    }
  };

  if (loadError) {
    return <div>{t("common:text-map-cant-load")}</div>;
  }

  return isLoaded ? (
    
      <Autocomplete
        onLoad={onLoad}
     
        onPlaceChanged={onPlaceChanged}
        onUnmount={onUnmount}
        fields={["address_components", "geometry.location", "formatted_address"]}
        types={["establishment", "geocode"]}
        className="flex"
      >

       <div style={{zIndex:9}} className='flex w-full mx-4 sm:mx-0 items-center'>

          <div className='relative flex text-center  items-center '>
              <img style={{zIndex:10}} src='/placeholder.png' 
                  className='absolute ml-6 md:ml-7 text-center object-contain h-4 w-4 '/>
              <span className=' sm:p-3  bg-white sm:px-2 w-4 border-l-2 h-14 rounded-lg 
                                rounded-r-none border-r-0 border-2'/>
          </div>  
          
         <div style={{zIndex:8}} className='flex w-full'>
           <input
          type = "text"
          // placeholder={t("common:placeholder-search-location")}
          placeholder='Enter your location'
          value={loc}
          onChange={(e) => setLocation(e.target.value)}
          style={{zIndex:100}}
         
          className='border-l-0 z-50 outline-none w-full   sm:w-2/3 md:w-2/3 lg:w-1/3 h-14 
                     rounded-l-none sm:p-3 md:p-2 rounded-lg  px-7 sm:px-6 md:px-9 border-2'
        /></div>
        </div>

      </Autocomplete>

  ) : (

    <div className="flex">
      <Loader simple={true} className="w-6 h-6" />
    </div>
  );
}

import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import Loader from "@components/ui/loader/loader";
import { useCreateLogMutation } from "@data/log/use-create-log.mutation";


const libraries: Libraries = ["places"];

export default function GooglePlacesAutocomplete({address,
  onChange
}: {
  onChange: any;
  address :any
}) {
  const { t } = useTranslation();
  const [loc,setLocation]=useState(address);
  const { mutate: createLog, isLoading: loading } = useCreateLogMutation();

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
    let locality = '';
    let area = '';
    place.address_components.forEach((component: any) => {
        if (component.types[0] === 'locality') {
            locality = component.long_name;
        }
        if (component.types[0] === 'administrative_area_level_2') {
            area = component.long_name;
        }
    });

    const location: any = {
      locality: locality,
      area:  area,
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

        <input
          type = "text"
          defaultValue={loc}
          style={{borderRadius:"5px"}}
          className="p-3 pl-8  mx-8 w-full  sm:px-8 sm:w-full sm:mx-auto  xmd:mx-4 md:w-full md:mx-auto 
                      2xl:p-3 lg:p-3 lg:mx-auto  lg:w-full 2xl:w-full 2xl:mx-auto font-light
                      focus:border-accent focus:bg-light bg-gray-80
                      outline-none text-xs sm:text-sm md:text-base lg:text-lg 
                    border-gray-300 border "
        />

      </Autocomplete >

  ) : (

    <div className="flex">
      <Loader simple={true} className="w-6 h-6" />
    </div>
  );
}

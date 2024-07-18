
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import { LocationInput } from "@ts-types/generated";
import React from "react";
import { useTranslation } from "next-i18next";
import Loader from "@components/ui/loader/loader";


const libraries: Libraries = ["places"];
export default function GooglePlacesAutocomplete({
  onChange,
  data,
}: {
  onChange: any;
  data: LocationInput;
}) {
  const { t } = useTranslation();
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

  const [geoLocation, setGeoLocation] = React.useState<any>(null);

  const onPlaceChanged = () => {

    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      // console.log("Returned place contains no geometry");
      return;
    }

      const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      formattedAddress: place?.formatted_address,
      // city: place.address_components?.find((c) => c.types.includes("locality"))?.short_name ,
      // state: place.address_components?.find((c) => c.types.includes("administrative_area_level_1"))?.long_name,
      // country: place.address_components?.find((c) => c.types.includes("country")),
      // street: place.address_components?.find((c) => c.types.includes("street_number")),
      // postal_code: place.address_components?.find((c) => c.types.includes("postal_code")) ,
      // sector: place.address_components?.find((c) => c.types.includes("sublocality_level_1"))?.short_name && place.address_components?.find((c) => c.types.includes("locality"))?.short_name,
      // area2: place.address_components?.find((c) => c.types.includes("sublocality_level_2"))?.short_name + '' ,
      // floor: place.address_components?.find((c) => c.types.includes("floor"))?.long_name + '' ,
      // landmark : place.address_components?.find((c) => c.types.includes("landmark")) ,
    };

    setGeoLocation(location);

    // console.log('location',location)

    for (const component of place.address_components) {
      // @ts-ignore remove once typings fixed
      const componentType = component.types[0];

      switch (componentType) {
        case "postal_code": {
          location["zip"] = component.long_name;
          break;
        }

        case "street_number": {
          location["street_number"] = component.long_name;
          break;
        }

      //town_square
      case "town_square": {
        location["town_square"] = component.long_name;
        break;
      }

      //floor
      case "floor": {
        location["floor"] = component.long_name;
        break;
      }

      //landmark
      case "landmark": {
        location["landmark"] = component.long_name;
        break;
      }

      //sublocality_level_1
      case "sublocality_level_1": {
        location["sector"] = component.long_name;
        break;
      }

      case "sublocality_level_2": {
        location["area"] = component.long_name;
        break;
      }

      case "route": {
        location["route"] = component.long_name;
          break;
      }
      
        //sector/area/locality
        case "neighborhood":
        case "locality": {
          location["neighborhood"] = component.long_name;
          break;
        }
        //state/province

        case "establishment": {
          location["establishment"] = component.long_name;
          break;
        }

        case "postal_code_suffix": {
          location["zip"] = `${location?.zip}-${component.long_name}`;
          break;
        }

        case "locality": {
          location["city"] = component.long_name;
          break;
        }

        case "administrative_area_level_1": {
          location["state"] = component.long_name;
          break;
        }

        //neighborhood
        case "neighborhood": {
          location["sector"] = component.long_name;
          break;
        }

        case "country":{
          location["country"] = component.long_name;
          break;
        }
      }
    }

    if (onChange) {
      onChange(location);
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
        type="text"
        placeholder={t("form:placeholder-search-location")}
        defaultValue={data?.formattedAddress}
        className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent"
      />
    </Autocomplete>
  ) : (
    <Loader simple={true} className="w-6 h-6" />
  );
}





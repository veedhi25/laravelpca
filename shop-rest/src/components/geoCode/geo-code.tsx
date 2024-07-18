import Geocode from "react-geocode";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

Geocode.setLanguage("en");

export default async function getAddress ({lat,lng}:any){

    var response= await Geocode.fromLatLng(lat, lng)
    var address=response.results[0].address_components[1].long_name + ' ,' + response.results[0].address_components[4].long_name
    
    // console.log(address,"address2");
    return address
}
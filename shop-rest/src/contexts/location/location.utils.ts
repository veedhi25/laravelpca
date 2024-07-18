export interface Location {
  lat: number;
  lng: number;
  address:any;
}

export interface UpdateLocationInput extends Partial<Omit<Location, "id">> {}


// Simple CRUD for Location
export function addLocation(Locations: Location[], Location: Location) {
  return [...Locations, Location];
}
export function getLocation(Locations: Location[]) {
  return Locations;
}
export function removeLocation() {
  return [];
}





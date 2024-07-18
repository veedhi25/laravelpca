import React from "react";
import { LocationReducer, State, initialState } from "./location.reducer";
import { Location } from "./location.utils";
import { useLocalStorage } from "@utils/use-local-storage";
import { LOCATION } from "@utils/constants";


interface LocationProviderState extends State {
  addLocation: (Location: Location) => void;
  removeLocation: () => void;
  clearLocation: () => void;
  getLocation: State;
}

export const LocationContext = React.createContext<LocationProviderState | undefined>(
  undefined
);


LocationContext.displayName = "LocationContext";


export const useLocation = () => {
  const context = React.useContext(LocationContext);
  if (context === undefined) {
    throw new Error(`useLocation must be used within a LocationProvider`);
  }
  return context;
};


export const LocationProvider: React.FC = (props) => {

  const [savedLocation, saveLocation] = useLocalStorage(
    LOCATION,
    JSON.stringify(initialState)
  );
  
  const [state, dispatch] = React.useReducer(
    LocationReducer,
    JSON.parse(savedLocation!)
  );

  React.useEffect(() => {
    saveLocation(JSON.stringify(state));
  }, [state, saveLocation]);

  const addLocation = (Location: Location) =>
    dispatch({ type: "ADD_LOCATION", Location });
  const removeLocation = () =>
    dispatch({ type: "REMOVE_LOCATION" });
  const clearLocation = () =>
    dispatch({ type: "RESET_LOCATION"});
  const getLocation = state.Locations;

  const value = React.useMemo(
    () => ({
      ...state,
      addLocation,
      removeLocation,
      clearLocation,
      getLocation,
    }),
    [state]
  );

  return <LocationContext.Provider value={value} {...props} />;
};

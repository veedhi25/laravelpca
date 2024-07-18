import {
  Location,
  addLocation,
  removeLocation,
  
} from "./location.utils";


type Action =
  | { type: "ADD_LOCATION";  Location: Location }
  | { type: "REMOVE_LOCATION";  }
  | { type: "RESET_LOCATION" };

export interface State {
  Locations: any;
  
}
export const initialState: State = {
  Locations: [],
};

export function LocationReducer(state: State, action: Action): State {

  switch (action.type) {
    case "ADD_LOCATION": {
      const Location = action.Location;
      return generateFinalState(state, Location);
    }

    case "REMOVE_LOCATION": {
      const Locations = removeLocation();
      return generateFinalState(state, Locations);
    }

    case "RESET_LOCATION":
      return initialState;
    default:
      return state;
  }
}

const generateFinalState = (state: State, Locations: any) => {
  return {
    ...state,
    Locations: Locations,
  };
};

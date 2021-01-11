import { createStore } from "redux";

const reducer = (state, action) => {
  switch (action.type) {
    case "DISSEMINATION_AREA_SELECTED":
      return {
        ...state,
        map: {
          ...state.map,
          selectedDisseminationArea: action.data.disseminationArea,
        },
      };
    case "MAP_CLICK":
      const { location, map } = action.data;
      return {
        ...state,
        map: {
          mapInstance: map,
          selectedLocation: location,
        },
      };
  }
  console.warn("unhanlded action:", action.type);
  return state;
};

export function initStore(pageProps) {
  return createStore(reducer, {
    map: {
      mapInstance: null,
      selectedLocation: null,
      selectedDisseminationArea: null,
    },
    startLocation: null,
    stats: {
      ageGroups: null,
    },
    ...pageProps,
  });
}
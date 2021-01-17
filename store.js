import { createStore } from "redux";

const reducer = (state, action) => {
  switch (action.type) {
    case "DISSEMINATION_AREAS_CHANGED":
      return {
        ...state,
        map: {
          ...state.map,
          selectedDisseminationAreas: action.data.areas,
        },
      };
    case "LNGLATS_ADD":
      return {
        ...state,
        map: {
          ...state.map,
          selectedLngLats: [...state.map.selectedLngLats, action.data.lngLat],
        },
      };
    case "LNGLATS_SET":
      return {
        ...state,
        map: {
          ...state.map,
          selectedLngLats: action.data.lngLats,
        },
      };
  }
  console.warn("unhanlded action:", action.type);
  return state;
};

export function initStore(pageProps) {
  return createStore(reducer, {
    map: {
      selectedDisseminationAreas: [],
      selectedLngLats: [],
    },
    startLocation: null,
    ...pageProps,
  });
}

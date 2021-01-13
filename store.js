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
  }
  console.warn("unhanlded action:", action.type);
  return state;
};

export function initStore(pageProps) {
  return createStore(reducer, {
    map: {
      selectedDisseminationAreas: [],
    },
    startLocation: null,
    stats: {
      ageGroups: null,
    },
    ...pageProps,
  });
}

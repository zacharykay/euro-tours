import reducer from "../reducers/filter_reducer";
import { ActionKind } from "../reducers/filter_reducer";
import { tours } from "../tours";

import React, { FC, useEffect, useContext, useReducer } from "react";

export type State = {
  all_tours: any[];
  filtered_tours: any[];
  filters: {
    price: number;
    max_price: number;
    min_price: number;
    groupSize: string;
    city: string;
    rating: number;
    guidedTour: boolean;
    entranceIncludedOnly: boolean;
  };
  showFilters: boolean;
};

const initialStore: State = {
  all_tours: [],
  filtered_tours: [],
  filters:
    {
      price: 0,
      max_price: 0,
      min_price: 0,
      groupSize: "all",
      city: "all",
      rating: 0,
      guidedTour: false,
      entranceIncludedOnly: false,
    },
  showFilters: true,
};

// type Reducer<State, Action> = (state: State, action: Action) => State;

export const FilterContext = React.createContext<any>({} as any);
// export const FilterContext = React.createContext<State>({} as any); Can't type like this because does not allow created functions, only allows interface on FilterContext object,
// export const FilterContext = React.createContext({} as ReturnType<typeof FilterProvider>);
// export const FilterContext = React.createContext<State | undefined>(undefined);

export const FilterProvider: FC = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialStore);

  // Initial Load
  useEffect(
    () => {
      dispatch({ type: ActionKind.LOAD_TOURS, payload: tours });
    },
    [ tours ]
  );

  // Apply Filtration
  useEffect(
    () => {
      dispatch({ type: ActionKind.APPLY_FILTERS, payload: null });
    },
    [ tours, state.filters ]
  );

  // Update Filter Values
  const updateFilters = (e: any) => {
    let filterName = e.target.name;
    let filterValue = e.target.value;

    if (filterName === "price") {
      filterValue = Number(filterValue);
      console.log("PRICE_VAL", filterValue);
    }
    if (filterName === "groupSize") {
      filterValue = e.target.value;
    }
    if (filterName === "city") {
      filterValue = e.target.dataset.city;
    }
    if (filterName === "rating") {
      filterValue = Number(e.target.value);
    }
    if (filterName === "guidedTour") {
      filterValue = e.target.checked;
    }
    if (filterName === "entranceIncludedOnly") {
      filterValue = e.target.checked;
    }

    dispatch({
      type: ActionKind.UPDATE_FILTERS,
      payload: { filterName, filterValue },
    });
  };

  const toggleFiltersMenu = () => {
    dispatch({
      type: ActionKind.TOGGLE_FILTERS_MENU,
    });
  };

  return (
    <FilterContext.Provider value={{ ...state, updateFilters, toggleFiltersMenu }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};

// export const useFilterContext = () => {
//     const context = useContext(FilterContext);
//     if (context === undefined) {
//         throw new Error("useFilterContext must be within FilterContextProvider")
//     }

// 	return context;
// };

// function filterReducer (state = initialStore, action: { type: string }) {
// 	switch (action.type) {
// 		case 'CHANGE PRICE':
// 			return { price: 1 };
// 	}

// 	return state;
// }
// };

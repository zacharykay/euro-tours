import reducer from "../reducers/filter_reducer";
import { ActionKind } from "../reducers/filter_reducer";
import { tours } from "../tours";

import React, { FC, useEffect, useContext, useReducer } from "react";

import axios from "axios";

interface FormData {
  name: string | undefined;
  city: string | undefined;
  country: string | undefined;
  price: number | undefined;
  hours: number | undefined;
  rating: string | undefined;
  guided_tour: boolean | undefined;
  group_size: string | undefined;
  entrance_fees_included: boolean | undefined;
  description: string | undefined;
  image_url: string | undefined;
  image_alt: string | undefined;
}

export type State = {
  tours_data: any[];
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
  form_data: FormData;
  showFilters: boolean;
  stickyHeader: boolean;
};

export const defaultFormData: FormData = {
  name: "",
  city: "",
  country: "",
  price: 0,
  hours: 0,
  rating: "none",
  guided_tour: false,
  group_size: "none",
  entrance_fees_included: false,
  description: "",
  image_url: "",
  image_alt: "",
};

const initialStore: State = {
  tours_data: [],
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
  form_data: defaultFormData,
  showFilters: true,
  stickyHeader: true,
};

// type Reducer<State, Action> = (state: State, action: Action) => State;

export const FilterContext = React.createContext<any>({} as any);
// export const FilterContext = React.createContext<State>({} as any); Can't type like this because does not allow created functions, only allows interface on FilterContext object,
// export const FilterContext = React.createContext({} as ReturnType<typeof FilterProvider>);
// export const FilterContext = React.createContext<State | undefined>(undefined);

export const FilterProvider: FC = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialStore);

  const fetchData = async (url: string) => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      dispatch({ type: ActionKind.GET_DATA_SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch Data
  useEffect(() => {
    fetchData("http://localhost:4000/api");
  }, []);

  // Initial Load
  useEffect(
    () => {
      if (state.tours_data.length > 0) {
        dispatch({ type: ActionKind.LOAD_TOURS, payload: state.tours_data });
      }
    },
    [ state.tours_data ]
  );

  // Apply Filtration
  useEffect(
    () => {
      dispatch({ type: ActionKind.APPLY_FILTERS, payload: null });
    },
    [ state.filters ]
  );

  const handleFormData = (e: any) => {
    let formName = e.target.name;
    let formValue = e.target.value;

    if (typeof formValue === "number") {
      formValue = Number(formValue);
    }

    if (formName === "guided_tour" || formName === "entrance_fees_included") {
      formValue = e.target.checked;
    }

    dispatch({ type: ActionKind.UPDATE_FORM, payload: { formName, formValue } });
  };

  const clearFormData = () => {
    dispatch({ type: ActionKind.CLEAR_FORM, payload: { defaultFormData } });
  };

  // Update Filter Values
  const updateFilters = (e: any) => {
    let filterName = e.target.name;
    let filterValue = e.target.value;

    if (filterName === "price") {
      filterValue = Number(filterValue);
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
    <FilterContext.Provider
      value={{
        ...state,
        updateFilters,
        toggleFiltersMenu,
        handleFormData,
        clearFormData,
      }}
    >
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

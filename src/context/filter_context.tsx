import reducer from "../reducers/filter_reducer";
import { ActionKind } from "../reducers/filter_reducer";

import React, { FC, useEffect, useContext, useReducer } from "react";

// import axios from "axios";

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
  initializeFilters: boolean;
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
  initializeFilters: false,
};

export const FilterContext = React.createContext<any>({} as any);

export const FilterProvider: FC = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialStore);

  const fetchData = async (url: string) => {
    // let headers = new Headers();

    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Authorization', 'Basic');
    // headers.append('Origin', 'http://localhost:3000');

    // interface Error {
    //   status?: number;
    //   message?: string;
    // }

    

    try {
      const response = await fetch(url,  {method: 'GET', headers: {"Content-Type": "application/json",
      "Accept": "application/json", "Authorization": "Basic", "Origin": "http://localhost:3000",}, mode: 'cors'});
      const data = await response.json();
      dispatch({ type: ActionKind.GET_DATA_SUCCESS, payload: data });

      if (!response.ok) {
        throw new Error(data.message);
      }
    } catch (err) {
      let errr = new Error("Not working");
      console.log(err, `URL of: '${url}' requested`, errr);
    }
  }
      
    //   fetch(sign_in, {
    //     mode: 'cors',
    //     credentials: 'include',
    //     method: 'POST',
    //     headers: headers
    // })


      
      // const response = await axios.get(url, {
      //   method: "GET",
      //   headers:
      //     {
      //       "Content-Type": "application/json",
      //       "Accept": "application/json",
      //       "Authorization": "Basic",
      //       // "Origin": "*",
      //     },
      //     mode: cors
      
  

  //   function performSignIn() {

  //     fetch(sign_in, {
  //         mode: 'cors',
  //         credentials: 'include',
  //         method: 'POST',
  //         headers: headers
  //     })
  //     .then(response => response.json())
  //     .then(json => console.log(json))
  //     .catch(error => console.log('Authorization failed: ' + error.message));
  // }

  // const apiDomain: string | undefined = process.env.API_DOMAIN;
  const domain: string = "https://euro-tours-api.herokuapp.com/api";
  // const testDomain: string = 'http://localhost:4000/api'

  // Fetch Data
  useEffect(
    () => {
      fetchData(domain);
    },
    [ domain ]
  );

  // Show Tours After Initial Load
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

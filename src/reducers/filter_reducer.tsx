// import { FC } from 'react';
import Filters from "../components/Filters";
import { State } from "../context/filter_context";
import { tours } from "../tours";

export enum ActionKind {
  UPDATE_FILTERS = "UPDATE_FILTERS",
  APPLY_FILTERS = "APPLY_FILTERS",
  LOAD_TOURS = "LOAD_TOURS",
  TOGGLE_FILTERS_MENU = "TOGGLE_FILTERS_MENU",
  GET_DATA_SUCCESS = "GET_DATA_SUCCESS",
}

type Action = {
  type: ActionKind;
  payload?: any;
};

const filter_reducer = (state: State, action: Action): State => {
  const { type, payload } = action;

  console.log("STATE", state.filters);

  switch (type) {
    // Set Data to Fetched Data from API
    case ActionKind.GET_DATA_SUCCESS:
      console.log("PAYLOAD", payload);
      return { ...state, tours_data: [ ...payload ] };

    // Initial Load
    case ActionKind.LOAD_TOURS:
      // console.log("PAY", payload[0]);
      let highestPrice = action.payload.map((place: any) => {
        return place.price;
      });
      console.log("HighestPrice 1", highestPrice);
      highestPrice = Math.max(...highestPrice);
      console.log("HighestPrice 2", highestPrice);
      return {
        ...state,
        all_tours: [ ...payload ],
        filtered_tours: [ ...payload ],
        filters: { ...state.filters, price: highestPrice, max_price: highestPrice },
      };

    // Update Filter Values
    case ActionKind.UPDATE_FILTERS:
      const { filterName, filterValue } = payload;
      console.log(
        "filterValue:",
        filterValue,
        "state.filters.rating:",
        state.filters.rating
      );
      return { ...state, filters: { ...state.filters, [filterName]: filterValue } };

    case ActionKind.TOGGLE_FILTERS_MENU:
      return { ...state, showFilters: !state.showFilters };

    // Apply Filtration
    case ActionKind.APPLY_FILTERS:
      const { all_tours } = state;
      let temp_tours: any[] = all_tours;
      const {
        price,
        groupSize,
        city,
        rating,
        guidedTour,
        entranceIncludedOnly,
      } = state.filters;

      // Group Size Filter
      if (groupSize !== "all") {
        temp_tours = temp_tours.filter((tour) => {
          return tour.group_size === groupSize;
        });
      }
      // City Filter
      if (city !== "all") {
        console.log("CITIES");
        temp_tours = temp_tours.filter((tour) => {
          return tour.city === city;
        });
      }
      // Tour Price Filter
      temp_tours = temp_tours.filter((tour) => {
        return tour.price <= price;
      });
      // Tour Rating Filter
      temp_tours = temp_tours.filter((tour) => {
        return tour.rating >= rating;
      });
      // Guided Tours Only Filter
      if (guidedTour) {
        temp_tours = temp_tours.filter((tour) => {
          return tour.guided_tour === true;
        });
      }
      if (entranceIncludedOnly) {
        temp_tours = temp_tours.filter((tour) => {
          return tour.entrance_fees_included === true;
        });
      }

      console.log("FILTRATION", { ...state, filtered_tours: temp_tours });
      return { ...state, filtered_tours: temp_tours };
  }

  // throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;

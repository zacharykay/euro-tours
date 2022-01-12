import { State } from "../context/filter_context";
import { defaultFormData } from "../context/filter_context";

export enum ActionKind {
  UPDATE_FILTERS = "UPDATE_FILTERS",
  APPLY_FILTERS = "APPLY_FILTERS",
  LOAD_TOURS = "LOAD_TOURS",
  TOGGLE_FILTERS_MENU = "TOGGLE_FILTERS_MENU",
  GET_DATA_SUCCESS = "GET_DATA_SUCCESS",
  UPDATE_FORM = "UPDATE_FORM",
  CLEAR_FORM = "CLEAR_FORM",
}

type Action = {
  type: ActionKind;
  payload?: any;
};

const filter_reducer = (state: State, action: Action): State => {
  const { type, payload } = action;

  switch (type) {
    // Set Data to Fetched Data from API
    case ActionKind.GET_DATA_SUCCESS:
      return { ...state, tours_data: [ ...payload ] };

    // Update Form as Typing Occurs
    case ActionKind.UPDATE_FORM:
      const { formName, formValue } = payload;
      return { ...state, form_data: { ...state.form_data, [formName]: formValue } };

    // Clear Form on Submit
    case ActionKind.CLEAR_FORM:
      const { defaultFormData } = payload;
      return { ...state, form_data: defaultFormData };

    // Initial Load
    case ActionKind.LOAD_TOURS:
      let highestPrice = action.payload.map((place: any) => {
        return place.price;
      });

      highestPrice = Math.max(...highestPrice);
      return {
        ...state,
        all_tours: [ ...payload ],
        filtered_tours: [ ...payload ],
        filters: { ...state.filters, price: highestPrice, max_price: highestPrice },
      };

    // Update Filter Values
    case ActionKind.UPDATE_FILTERS:
      const { filterName, filterValue } = payload;
      return { ...state, filters: { ...state.filters, [filterName]: filterValue } };

    // Toggle Filters Sidebar Menu
    case ActionKind.TOGGLE_FILTERS_MENU:
      return { ...state, showFilters: !state.showFilters, initializeFilters: true };

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

      // console.log("FILTRATION", { ...state, filtered_tours: temp_tours });
      return { ...state, filtered_tours: temp_tours };
  }

  // throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;

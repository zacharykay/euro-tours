import { FC } from "react";
import { useFilterContext } from "../context/filter_context";
// import { tours } from "../tours.js";
// import { getUniqueValues } from '../utils/helpers';
import Emoji from "./Emoji";
import "../css/filters.scss";

interface Props {}

const Filters: FC<Props> = () => {
  const { filters, updateFilters } = useFilterContext();

  interface CityInterface {
    city: string;
    flag: string;
    country?: string;
  }
  const cities: CityInterface[] = [
    {
      city: "Amsterdam",
      flag: "🇳🇱",
      country: "Netherlands",
    },
    {
      city: "Barcelona",
      flag: "🇪🇸",
      country: "Spain",
    },
    {
      city: "Florence",
      flag: "🇮🇹",
      country: "Italy",
    },
    {
      city: "London",
      flag: "🇬🇧",
      country: "England",
    },
    {
      city: "Munich",
      flag: "🇩🇪",
      country: "Germany",
    },
    {
      city: "Paris",
      flag: "🇫🇷",
      country: "France",
    },
  ];

  return (
    <section className="filters-section">
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Price Filter */}
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <div className="range-container">
            <input
              type="range"
              name="price"
              id="price"
              min="0"
              max="30000"
              step="2500"
              list="tickmarks"
              value={filters.price}
              onChange={updateFilters}
            />
            <datalist style={{ display: "flex" }} id="tickmarks">
              <option value="0" label="$0" />
              <option value="5000" />
              <option value="10000" />
              <option value="15000" label="$150" />
              <option value="20000" />
              <option value="25000" />
              <option value="30000" label="$300" />
            </datalist>
          </div>
        </div>

        {/* Cities Filter */}
        <div className="form-control">
          <div className="btn-container">
            <button
              className="city-btn"
              data-city="all"
              name="city"
              onClick={updateFilters}
            >
              <Emoji symbol="🇪🇺" label="European Union Flag" /> All Europe
            </button>
            {cities.map((place, idx) => {
              const { city, flag, country } = place;
              if (city === "all") {
                return (
                  <button key={idx} className="city-btn" data-city="all" name="cities">
                    All
                  </button>
                );
              }
              return (
                <button
                  key={idx}
                  className="city-btn"
                  data-city={city}
                  name="city"
                  onClick={updateFilters}
                >
                  <Emoji symbol={flag} label={country ? country : ""} /> {city}
                </button>
              );
            })}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="form-control">
          <div className="rating-container">
            <label htmlFor="1-star">Min. Rating</label>
            <div className="rate-area">
              <input
                type="radio"
                id="5-star"
                name="rating"
                value="5"
                onChange={updateFilters}
              />
              <label htmlFor="5-star" title="Incredible" />
              <input
                type="radio"
                id="4-star"
                name="rating"
                value="4"
                onChange={updateFilters}
              />
              <label htmlFor="4-star" title="Great" />
              <input
                type="radio"
                id="3-star"
                name="rating"
                value="3"
                onChange={updateFilters}
              />
              <label htmlFor="3-star" title="Good" />
              <input
                type="radio"
                id="2-star"
                name="rating"
                value="2"
                onChange={updateFilters}
              />
              <label htmlFor="2-star" title="Not Good" />
              <input
                type="radio"
                id="1-star"
                name="rating"
                value="1"
                onChange={updateFilters}
              />
              <label htmlFor="1-star" title="Wouldn't recommend" />
            </div>
          </div>
        </div>

        {/* Group Size Filter */}
        <div className="form-control">
          <label htmlFor="groupSize">Group Size</label>
          <select
            name="groupSize"
            id="groupSize"
            value={filters.groupSize}
            onChange={updateFilters}
          >
            <option value="all">all</option>
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
          </select>
        </div>

        {/* Guided or Self-Guided Filter */}
        <div className="form-control">
          <div className="checkbox-container">
            <label htmlFor="guidedTour">Guided Only</label>
            <input
              type="checkbox"
              name="guidedTour"
              id="guidedTour"
              checked={filters.guidedTour}
              onChange={updateFilters}
            />
          </div>
        </div>

        {/* Entrance Included Filter */}
        <div className="form-control">
          <div className="checkbox-container">
            <label htmlFor="entranceIncludedOnly">Includes Entry</label>
            <input
              type="checkbox"
              name="entranceIncludedOnly"
              id="entranceIncludedOnly"
              checked={filters.entranceIncludedOnly}
              onChange={updateFilters}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default Filters;

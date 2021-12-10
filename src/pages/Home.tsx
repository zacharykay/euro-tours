import { useState, useEffect, Fragment } from "react";
import Filters from "../components/Filters";
import { useFilterContext } from "../context/filter_context";

import TourCard from "../components/TourCard";
import Hero from "../components/Hero";

const Home = () => {
  const { filtered_tours, showFilters } = useFilterContext();

  // console.log('Tours', filtered_tours);

  return (
	//   <Fragment>
    <main className="main-container">
	
      <div
        className={
          showFilters ? (
            "filters-hidden filters-wrapper"
          ) : (
            "filters-visible filters-wrapper"
          )
        }
      >
        <Filters />
      </div>
      {/* {showFilters && } */}
	  <Hero/>
	  {/* <div className='card-container-wrapper'> */}
      <div
        className={
          showFilters ? (
            "card-container slide-cards-left"
          ) : (
            "card-container slide-cards-right"
          )
        }
        // style={showFilters ? { marginLeft: "10rem" } : { marginLeft: "0" }}
      >
        {filtered_tours.map((tour: any) => {
          return <TourCard key={tour.id} {...tour} />;
        })}
      {/* </div> */}
	  </div>
    </main>
	// </Fragment>
  );
};

export default Home;

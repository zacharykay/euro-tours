import { useState, useEffect } from 'react';
import Filters from '../components/Filters';
import { useFilterContext } from '../context/filter_context';

import TourCard from '../components/TourCard';

const Home = () => {
	const { filtered_tours } = useFilterContext();

	// console.log('Tours', filtered_tours);

	return (
		<main className="main-container">
			<Filters />
			<div className="card-container">
				{filtered_tours.map((tour) => {
					return <TourCard key={tour.id} {...tour} />;
				})}
			</div>
		</main>
	);
};

export default Home;

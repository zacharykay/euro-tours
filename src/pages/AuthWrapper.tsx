import { FC } from 'react';

import { useAuth0 } from '@auth0/auth0-react';



const AuthWrapper:FC = ({ children }) => {
	const { isLoading, error } = useAuth0();

	if (isLoading) {
		return (
			<section style={{minHeight: '100vh', display: 'grid', placeItems: 'center'}}>
				<h1>Loading...</h1>
			</section>
		);
	}

	if (error) {
		return (
			<section style={{minHeight: '100vh', display: 'grid', placeItems: 'center'}}>
				<h1>{error.message}</h1>
			</section>
		);
	}

	return <>{children}</>;
};



export default AuthWrapper;

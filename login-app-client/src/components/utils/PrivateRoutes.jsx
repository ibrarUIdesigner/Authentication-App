import React from 'react';
import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PrivateRoutes = () => {
	let auth = { token: localStorage.getItem('token') };

	useEffect(() => {
		if (!auth.token) {
			// Show a toast error if the user is not authenticated
			toast.error('Unauthorized access! Please log in.');
		}
	}, [auth.token]);
	return auth.token ? (
		<>
			<Outlet />
		</>
	) : (
		<Navigate to='/login' />
	);
};

export default PrivateRoutes;

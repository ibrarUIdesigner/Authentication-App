import { useEffect, useState } from 'react';
import userService from '../services/user.service';
const BASE_URL = import.meta.env.VITE_APP_SERVER;

export default function useFetchData(query) {
	const [getData, setData] = useState({
		isLoading: false,
		apiData: undefined,
		status: null,
		serverError: null,
	});

	useEffect(() => {
		console.log(query);
		if (!query) return;
		const fetchData = async () => {
			try {
				setData((prev) => ({ ...prev, isLoading: true }));
				const params = {
					username: localStorage.getItem('username'),
				};
				const headers = {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					Accept: 'application/json',
				};

				const { data, status, error } = await userService.GetProfile(
					`${BASE_URL}/profile/${query}`,
					'',
					headers,
				);

				if (!data) {
					console.log(data, status, error);
					setData((prev) => ({
						...prev,
						serverError: error.message,
						status: error.statusCode,
						apiData: null,
					}));
				} else {
					setData((prev) => ({
						...prev,
						apiData: data,
						status: status,
						serverError: null,
					}));
				}
			} catch (error) {
				const {
					response: {
						data: { message, code },
					},
				} = error;

				setData((prev) => ({
					...prev,
					isLoading: false,
					serverError: message,
					status: code,
				}));
			}
		};

		//? CALL FETCH DATA FUNCTION
		fetchData();
	}, [query]);

	return [getData, setData];
}

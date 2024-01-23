import axios from 'axios';
import { useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_APP_SERVER;

export default function usePostDataHook(query, isFormSubmitted, payload) {
	const [data, setData] = useState({
		response: null,
		serverError: undefined,
		code: null,
	});

	//
	useEffect(() => {
		console.log('QUERY URL', query);
		const PostDataRequests = async () => {
			try {
				if (!isFormSubmitted) return;
				console.log(isFormSubmitted);
				const { data, status, error } = await axios.post(
					`${BASE_URL}/${query}`,
					payload,
				);

				let res = await axios.post(`${BASE_URL}/${query}`, payload);
				console.log(res);
				console.log(data, status, error);
				if (!data) {
					setData((prev) => ({
						...prev,
						serverError: error.name,
						code: error.code,
						response: null,
					}));
				} else {
					setData((prev) => ({
						...prev,
						response: data,
						code: status,
						serverError: null,
					}));
				}
			} catch (error) {
				console.log(error);
				const {
					response: {
						data: { message, code },
					},
				} = error;
				setData((prev) => ({
					...prev,
					serverError: message,
					code: code,
				}));
			}
		};
		PostDataRequests();
	}, [query, isFormSubmitted]);

	return [data, setData];
}

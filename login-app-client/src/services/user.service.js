import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_SERVER;

const userService = {
	//? LOGIM USER ENDPOINT
	LoginUser: async (payload) => {
		try {
			const { data } = await axios.post(`${BASE_URL}/login`, payload);
			return data;
		} catch (error) {
			const {
				response: { data },
			} = error;
			return data;
		}
	},

	//? GET PROFILE DETAILS
	GetProfile: async (url, params, headers) => {
		try {
			const data = await axios.get(url, { params, headers });

			return data;
		} catch (error) {
			const {
				response: { data },
			} = error;

			return data;
		}
	},

	//? UPDATE USER PROFILE
	UpdateUserProfile: async (payload, userId) => {
		try {
			const { data } = await axios.put(`${BASE_URL}/update-profile`, payload, {
				params: { id: userId },
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					Accept: 'application/json',
				},
			});
			return data;
		} catch (error) {
			const {
				response: { data },
			} = error;
			return data;
		}
	},
};

export default userService;

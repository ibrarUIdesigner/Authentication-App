import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	Login,
	Profile,
	Register,
	PageNotFound,
	Recovery,
	Otp,
	ResetPassword,
} from './components';
import { PrivateRoutes } from './components/utils';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
	{
		path: '/',
		element: <PrivateRoutes />,
		children: [
			{
				path: '/',
				element: <Profile />,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},

	{
		path: '/recover-password',
		element: <Recovery />,
	},

	{
		path: '/otp-code',
		element: <Otp />,
	},

	{
		path: '/reset-password',
		element: <ResetPassword />,
	},

	{
		path: '*',
		element: <PageNotFound />,
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
			<Toaster reverseOrder />
		</>
	);
}

export default App;

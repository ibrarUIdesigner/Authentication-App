import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import globals from '../styles/Global.module.css';
import { Input, Error, Button } from './utils';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import userService from '../services/user.service';
import { useAuthStore } from '../store/store';
import useFetchData from '../hooks/fetch.hooks';
import { useNavigate } from 'react-router-dom';

// import { userValidate } from '../helpers/validationUtils';

const Profile = () => {
	const navigate = useNavigate('');
	const [userData, setUserData] = useState(null);
	const [image, setImage] = useState(null);
	const username = useAuthStore((state) => state.auth.username);
	const [{ apiData, status, serverError }] = useFetchData(
		username || localStorage.getItem('username'),
	);
	const { handleSubmit, handleChange, values, errors } = useFormik({
		initialValues: {
			firstName: userData?.firstName || '',
			lastName: userData?.lastName || '',
			email: userData?.email || '',
			mobile: userData?.mobile || '',
			address: userData?.address || '',
			profile: image ?? userData?.profile,
		},
		enableReinitialize: true,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			console.log(values);
			UpdateUserProfile(values);
		},
	});

	useEffect(() => {
		if (apiData && status === 200) {
			setUserData(apiData?.data);
		} else {
			if (serverError == 'jwt expired' && status == 500) {
				toast.error(serverError);
				setTimeout(() => {
					localStorage.clear();
					navigate('/login');
				}, 1500);
			}
		}
	}, [apiData]);

	//* UPDATE THE USER PROFILE DATA
	const UpdateUserProfile = async (values) => {
		try {
			const results = await userService.UpdateUserProfile(
				values,
				apiData.data._id,
			);
			toast.success('updated success ...');

			console.log(results);
		} catch (error) {
			console.log('ERROR: ', error);
		}
	};

	//* ON IMAGE HANDLER
	const imageHandler = async (e) => {
		console.log(e.target.files[0]);

		let resultimage = await base64Url(e.target.files[0]);
		setImage(resultimage);
	};

	//* BASE64 IMAGE
	const base64Url = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);

			reader.readAsDataURL(file);
		});
	};

	//* HANDLE LOGOUT
	const handleLogout = () => {
		localStorage.clear();
		toast.success('Logout successfully..');
		setTimeout(() => {
			navigate('/login');
		}, 1000);
	};

	return (
		<>
			<Toaster reverseOrder />
			<div className={styles.bgBlue}>
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<strong>Profile {username} </strong>
						<p>You can update the details</p>
					</div>

					<form onSubmit={handleSubmit}>
						<div
							className={
								'text-center flex items-center space-x-6 m-auto justify-center'
							}
						>
							<div className='shrink-0'>
								<img
									src={image ?? userData?.profile}
									className='h-16 w-16 object-cover rounded-full'
									alt='Current profile photo'
								/>
							</div>
							<label className='block'>
								<span className='sr-only'>Choose profile photo</span>
								<input
									type='file'
									onChange={(e) => imageHandler(e)}
									className={globals.File}
								/>
							</label>
						</div>

						<div className='grid gap-4 mb-6 md:grid-cols-2 mt-[50px]'>
							<div className=''>
								<label htmlFor='firstName' className={globals.Label}>
									firstname :
								</label>
								<Input
									placeholder={'First Name'}
									type={'text'}
									id={'firstName'}
									onchange={handleChange}
									value={values.firstName}
								/>
								{errors.firstName && <Error error={errors.firstName} />}
							</div>
							<div className=''>
								<label htmlFor='lastName' className={globals.Label}>
									lastname :
								</label>
								<Input
									placeholder={'Last Name'}
									type={'text'}
									id={'lastName'}
									onchange={handleChange}
									value={values.lastName}
								/>
								{errors.lastName && <Error error={errors.lastName} />}
							</div>

							<div className=''>
								<label htmlFor='mobile' className={globals.Label}>
									mobile :
								</label>
								<Input
									placeholder={'Mobile'}
									type={'text'}
									id={'mobile'}
									onchange={handleChange}
									value={values.mobile}
								/>
								{errors.mobile && <Error error={errors.mobile} />}
							</div>
							<div className=''>
								<label htmlFor='email' className={globals.Label}>
									email :
								</label>
								<Input
									placeholder={'Eamil'}
									type={'email'}
									id={'email'}
									onchange={handleChange}
									value={values.email}
								/>
								{errors.email && <Error error={errors.email} />}
							</div>
						</div>
						<div className='mb-4'>
							<label htmlFor='address' className={globals.Label}>
								address :
							</label>
							<Input
								placeholder={'Address'}
								type={'text'}
								id={'address'}
								onchange={handleChange}
								value={values.address}
							/>
							{errors.address && <Error error={errors.address} />}
						</div>

						<Button type={'submit'} btnText={'Update'} />
					</form>

					<p className='text-center text-xs mt-5'>
						Dont have any account yet?
						<button
							onClick={() => handleLogout()}
							className='text-purple-700 font-medium ml-2'
							to='/login'
						>
							Logout
						</button>
					</p>
				</div>
			</div>
		</>
	);
};

export default Profile;

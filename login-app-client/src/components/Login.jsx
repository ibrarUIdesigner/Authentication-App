import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import globals from '../styles/Global.module.css';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { Input, Button, Error } from './utils';
import toast, { Toaster } from 'react-hot-toast';
import { validateLoginForm } from '../helpers/formValidations';
import userService from '../services/user.service';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import usePostDataHook from '../hooks/post.hooks';

const Login = () => {
	const [payload, setPayload] = useState(null);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [data] = usePostDataHook('login', isFormSubmitted, payload);
	const setUserName = useAuthStore((state) => state.setUsername);
	const { username } = useAuthStore((state) => state.auth);
	const navigate = useNavigate('');

	const { handleSubmit, handleChange, values, errors } = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		validateOnBlur: false,
		validateOnChange: false,
		validate: validateLoginForm,
		onSubmit: async (values) => {
			setUserName(values.username);
			setPayload(values);
			handleLoginUser();
		},
	});

	//*  LOGIN USER
	const handleLoginUser = async () => {
		setIsFormSubmitted(true);
		if (data.response) {
			console.log('FFSDSDSDFS');
		}

		if (!data.response) {
			console.log('SOMTHINF IS WROG WITH LOGIN');
			console.log(data);
		} else {
			console.log('DATA IS COMING');
			console.log(data);

			if (data.code !== 201) {
				toast.error('data.serverError');
				toast.error(data.serverError);
			} else {
				toast.success('sign in successfully.!');
				localStorage.setItem('username', username);
				localStorage.setItem('token', data?.response?.token);
				navigate('/');
			}
		}
	};

	return (
		<>
			<Toaster reverseOrder />
			<div className={styles.bgBlue}>
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<strong>Agent Login </strong>
						<p>Hey, Enter your details to get sign in to your account</p>
					</div>

					<div className='form m-auto'>
						<form onSubmit={handleSubmit}>
							<div className='mb-4'>
								<label htmlFor='username' className={globals.Label}>
									Username :
								</label>

								<Input
									type={'text'}
									onchange={handleChange}
									value={values.username}
									id={'username'}
									placeholder={'username'}
								/>

								{errors.username && <Error error={errors.username} />}
							</div>

							<div className='mb-4'>
								<label htmlFor='password' className={globals.Label}>
									Password :
								</label>
								<Input
									type={'password'}
									onchange={handleChange}
									value={values.password}
									id={'password'}
									placeholder={'password'}
								/>

								{errors.password && <Error error={errors.password} />}
							</div>

							<Button type={'submit'} btnText={'Sign in'} />

							<p className='text-center text-xs mt-5'>
								Dont have any account yet?
								<Link
									className='text-purple-700 font-medium ml-2'
									to='/register'
								>
									Register here
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;

import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import globals from '../styles/Global.module.css';

import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { Input, Button, Error } from './utils';
import toast, { Toaster } from 'react-hot-toast';
import { validateRegisterForm } from '../helpers/formValidations';
import usePostDataHook from '../hooks/post.hooks';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const navigate = useNavigate('');
	const [submit, setSbmit] = useState(false);
	const [payload, setPayload] = useState(null);
	const [data] = usePostDataHook('register', submit, payload);
	const { handleSubmit, handleChange, values, errors } = useFormik({
		initialValues: {
			username: '',
			password: '',
			email: '',
		},
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			setPayload(values);
			RegisterUser();
		},
	});

	//* REGISTER USER
	const RegisterUser = () => {
		// setSbmit((prev) => !prev);
		setSbmit(true);
		console.log(data.code);
		if (data.code !== 201) {
			toast.error(data.serverError);
		} else {
			toast.success('User created ....');
			navigate('/login');
		}
	};
	return (
		<>
			<Toaster reverseOrder />
			<div className={styles.bgBlue}>
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<strong>Agent Account</strong>
						<p>Hey, Enter your details to create your new account</p>
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
									placeholder={'Username'}
								/>

								{errors.username && <Error error={errors.username} />}
							</div>

							<div className='mb-4'>
								<label htmlFor='email' className={globals.Label}>
									Email :
								</label>

								<Input
									type={'email'}
									onchange={handleChange}
									value={values.email}
									id={'email'}
									placeholder={'Email'}
								/>

								{errors.username && <Error error={errors.email} />}
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
									placeholder={'Password'}
								/>

								{errors.password && <Error error={errors.password} />}
							</div>

							<Button type={'submit'} btnText={'Register'} />

							<p className='text-center text-xs mt-5'>
								Already have an account?
								<Link className='text-purple-700 font-medium ml-2' to='/login'>
									Login
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;

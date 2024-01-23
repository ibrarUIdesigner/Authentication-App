import React from 'react';
import styles from '../styles/Login.module.css';
import globals from '../styles/Global.module.css';
import { useFormik } from 'formik';
import { Input, Button, Error } from './utils';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
	const navigate = useNavigate('');
	//* initial form
	const { handleSubmit, handleChange, errors, values } = useFormik({
		initialValues: {
			password: '',
			conf_password: '',
		},
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			navigate('/login');
			console.log(values);
		},
	});
	return (
		<>
			<div className={styles.bgBlue}>
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<strong>Reset Password</strong>
						<p>enter your email address to get an OTP code</p>
					</div>

					<div className='form m-auto'>
						<form onSubmit={handleSubmit}>
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

							<div className='mb-4'>
								<label htmlFor='conf_password' className={globals.Label}>
									Confirm Password :
								</label>

								<Input
									type={'password'}
									onchange={handleChange}
									value={values.conf_password}
									id={'conf_password'}
									placeholder={'confirm password'}
								/>

								{errors.conf_password && <Error error={errors.conf_password} />}
							</div>

							<Button type={'submit'} btnText={'Reset'} />
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default ResetPassword;

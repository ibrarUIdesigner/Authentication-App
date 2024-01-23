import React from 'react';
import styles from '../styles/Login.module.css';
import globals from '../styles/Global.module.css';
import { useFormik } from 'formik';

import { Input, Button, Error } from './utils';
import { useNavigate } from 'react-router-dom';
import { validateRecoveryForm } from '../helpers/formValidations';

const Recovery = () => {
	const navigate = useNavigate();
	//* initial form
	const { handleSubmit, handleChange, errors, values } = useFormik({
		initialValues: {
			email: '',
		},
		validate: validateRecoveryForm,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			navigate('/otp-code');
			console.log(values);
		},
	});

	return (
		<>
			<div className={styles.bgBlue}>
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<strong>Recover Password</strong>
						<p>enter your email address to get an OTP code</p>
					</div>

					<div className='form m-auto'>
						<form onSubmit={handleSubmit}>
							<div className='mb-4'>
								<label htmlFor='email' className={globals.Label}>
									Email :
								</label>

								<Input
									type={'text'}
									onchange={handleChange}
									value={values.email}
									id={'email'}
									placeholder={'email address'}
								/>

								{errors.email && <Error error={errors.email} />}
							</div>

							<Button type={'submit'} btnText={'GET OTP'} />
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Recovery;

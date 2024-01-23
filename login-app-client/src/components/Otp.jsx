import React from 'react';
import styles from '../styles/Login.module.css';
import globals from '../styles/Global.module.css';
import { useFormik } from 'formik';
import { Input, Button, Error } from './utils';
import { ValidateOTPCODE } from '../helpers/formValidations';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
	const navigate = useNavigate();
	//* initial form
	const { handleSubmit, handleChange, errors, values } = useFormik({
		initialValues: {
			otp: '',
		},
		validateOnBlur: false,
		validateOnChange: false,
		validate: ValidateOTPCODE,
		onSubmit: async (values) => {
			console.log(values);
			navigate('/reset-password');
		},
	});
	return (
		<>
			<div className={styles.bgBlue}>
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<strong>OTP Code</strong>
						<p>enter your email address to get an OTP code</p>
					</div>

					<div className='form m-auto'>
						<form onSubmit={handleSubmit}>
							<div className='mb-4'>
								<label htmlFor='otp' className={globals.Label}>
									OTP :
								</label>

								<Input
									type={'number'}
									onchange={handleChange}
									value={values.email}
									id={'otp'}
									placeholder={'OTP_CODE'}
								/>

								{errors.otp && <Error error={errors.otp} />}
							</div>

							<Button type={'submit'} btnText={'SUBMIT'} />
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Otp;

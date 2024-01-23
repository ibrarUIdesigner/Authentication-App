import {
	validateUsername,
	validatePassword,
	validateEmail,
	validateOTPCode,
} from './validationUtils';

export function validateLoginForm(values) {
	const errors = {};
	errors.username = validateUsername(values.username);
	errors.password = validatePassword(values.password);

	const { username, password } = errors;

	if (!username && !password) return;
	return errors;
}

export function validateRegisterForm(values) {
	const errors = {};

	//
	const validationRules = {
		username: validateUsername,
		password: validatePassword,
		email: validateEmail,
	};

	// Iterate through properties and apply validation
	Object.keys(validationRules).forEach((properrty) => {
		errors[properrty] = validationRules[properrty](values[properrty]);
	});

	// Filter out properties with no errors
	const propertiesWithErrors = Object.keys(errors).filter(
		(property) => errors[property],
	);

	if (propertiesWithErrors.length === 0) {
		return;
	}

	return errors; // Return validation errors if any
}

export function validateRecoveryForm(values) {
	const errors = {};

	errors.email = validateEmail(values.email);

	const { email } = errors;
	if (!email) return;

	return errors;
}

export function ValidateOTPCODE(values) {
	const errors = {};
	errors.otp = validateOTPCode(values.otp);
	const { otp } = errors;
	if (!otp) return;

	return errors;
}

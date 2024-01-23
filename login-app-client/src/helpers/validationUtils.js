export function validateUsername(username) {
	if (!username) {
		return 'Username is required';
	} else if (username.includes(' ')) {
		return 'Invalid username';
	} else if (username.length < 3) {
		return 'Username must be greater than 3 Characters';
	}

	return null; // No error
}

export function validatePassword(password) {
	if (!password) {
		return 'Password is required';
	} else if (password.trim() === '') {
		return 'Invalid Password';
	} else if (password.length < 5) {
		return 'Password must be greater than 5 characters';
	}

	return null; // No error
}

export function validateEmail(email) {
	var filter = /\S+@\S+\.\S+/;
	if (!email) {
		return 'Email address is required';
	} else if (!filter.test(email)) {
		return 'Please provide a valid email address';
	}
	return null; // No error
}

export function validateOTPCode(otpCode) {
	const OTP = otpCode.toString();
	console.log(OTP.length);
	if (OTP.length !== 6 || OTP == '') {
		return 'Invalid OTP code';
	}
	return null;
}

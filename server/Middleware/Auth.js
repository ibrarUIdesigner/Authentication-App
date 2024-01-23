var jwt = require('jsonwebtoken');
const AppError = require('../ErrorHandlers/appError');

exports.ProtectedRoutesToken = async (req, res, next) => {
	try {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		}

		//? CHECK IF TOKEN IS AVAILABLE OR VERIFIED
		if (!token)
			return next(new AppError('Please login to access this route ... ', 401));

		//? VERIFY THE TOKEN
		const decoded = await jwt.verify(token, process.env.SECRETE);
		req.user = decoded;
		return next();
	} catch (error) {
		return next(error);
	}
};

exports.LocalAppVariables = (req, res, next) => {
	req.app.locals = {
		OTP: null,
		restartSession: false,
	};

	next();
};

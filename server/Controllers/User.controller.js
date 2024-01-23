const bcrypt = require('bcrypt');
const USERS = require('../Schema/Users.schema');
const AppError = require('../ErrorHandlers/appError');
var jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');

/** POST: POST: http://localhost:5000/api/login
 
 @param:{
	"username":"example",
	"email":"example@123",
	"password":"example@123",
 }
 
 */

exports.registerUser = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		const saltRounds = 10;

		//? CHECK IF USERNAME ALREADY EXISTS
		const checkUsername = await USERS.findOne({ username });
		if (checkUsername) {
			return next(new AppError('Username already exists', 400));
		}

		//? CHECK IF EMAIL ALREADY EXISTS
		const checkEamil = await USERS.findOne({ email });
		if (checkEamil) {
			return next(new AppError('Email addres must be uniques', 400));
		}

		let encodedPassword = await bcrypt.hash(password, saltRounds);

		const hashedUser = {
			username,
			email,
			password: encodedPassword,
		};

		if (encodedPassword) {
			await USERS.create(hashedUser);
			return res.status(201).json({ message: 'success', data: hashedUser });
		}
	} catch (error) {
		return next(error);
	}
};

/** POST: http://localhost:5000/api/login
 * @param :{
   "username" : "exmaple123",
    "password" : "example123"
  }
 */
exports.UserLogin = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		console.log(username, password);
		const user = await USERS.findOne({ username }).select('+password');

		console.log('USER', user);

		//? CHECK IF NO EMAIL AND PASSWORDS
		if (!username || !password)
			return next(
				new AppError('Please enter username or password to login...', 400),
			);

		//? CHECK IF USER EXISTS IN DATABASE
		if (!user || user.length < 0)
			return next(new AppError('User doesnt exist...', 404));

		//? COMPARE PASSWORD
		const comparePass = await bcrypt.compare(password, user.password);
		if (!comparePass) return next(new AppError('Invalid Details...', 400));

		//? CREATE TOKEN
		const token = await jwt.sign({ payload: user._id }, process.env.SECRETE, {
			expiresIn: process.env.EXPIRESIN,
		});

		return res.status(201).json({ code: 201, user, token });
	} catch (error) {
		return next(error);
	}
};

/** GET: http://localhost:5000/api/profile/:username
   GET ACTIVE PROFILE INFO
 */

exports.GetUserProfile = async (req, res, next) => {
	try {
		const { username } = req.params;
		const user = await USERS.findOne({ username });

		if (!user) return next(new AppError('User not found...', 404));

		return res.status(200).json({
			message: 'success',
			data: user,
		});
	} catch (error) {
		return next(error);
	}
};

/** PUT: http://localhost:5000/api/update-profile
   @param:{
	id:"userID"
   }

   body:{
	firstname:"ali",
	lastname:"malik",
	address:"Lahore",
	mobile:"03028131491",
	prifile:"image",
   }
 */
exports.UpdateUser = async (req, res, next) => {
	try {
		const { payload } = req.user;
		const user = await USERS.findById({ _id: payload });

		if (!user) return next(new AppError('User not found...', 404));
		const updatedUser = await USERS.findByIdAndUpdate(
			{ _id: payload },
			req.body,
			{
				new: true,
			},
		);

		return res.status(201).json({
			message: 'Success...!',
			query: req.query,
			user: updatedUser,
		});
	} catch (error) {
		return next(error);
	}
};

/** GET: http://localhost:5000/api/generate-otp */
exports.GenerateOTPCode = async (req, res, next) => {
	req.app.locals.OTP = await otpGenerator.generate(6, {
		lowerCaseAlphabets: false,
		specialChars: false,
		upperCaseAlphabets: false,
	});
	return res.status(200).json({
		otp: req.app.locals.OTP,
	});
};

/** GET: http://localhost:5000/api/verify-otp */
exports.VerifyOTPCode = async (req, res, next) => {
	const { code } = req.query;

	console.log(parseInt(req.app.locals.OTP));
	console.log(parseInt(code));
	console.log(parseInt(req.app.locals.OTP) === parseInt(code));

	if (parseInt(req.app.locals.OTP) === parseInt(code)) {
		req.app.locals.OTP = null;
		req.app.locals.restartSession = true;

		return res.status(200).json({
			message: 'OTP verified successfully...',
		});
	}

	return next(new AppError('OTP Code expires or invalid', 400));
};

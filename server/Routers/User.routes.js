const express = require('express');
const {
	GetUserProfile,
	UserLogin,
	registerUser,
	UpdateUser,
	GenerateOTPCode,
	VerifyOTPCode,
} = require('../Controllers/User.controller');
const {
	ProtectedRoutesToken,
	LocalAppVariables,
} = require('../Middleware/Auth');
const { VerifyUser } = require('../Middleware/VerifyUser');

const router = express.Router();

/** POST METHODS */

router.route('/login').post(UserLogin);
router.route('/register').post(registerUser);
router.route('/update-profile').put(ProtectedRoutesToken, UpdateUser);

router.route('/profile/:username').get(ProtectedRoutesToken, GetUserProfile);
router
	.route('/generate-otp')
	.get(VerifyUser, LocalAppVariables, GenerateOTPCode);
router.route('/verify-otp').get(VerifyUser, VerifyOTPCode);

module.exports = router;

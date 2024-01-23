const AppError = require('../ErrorHandlers/appError');
const UsersSchema = require('../Schema/Users.schema');

exports.VerifyUser = async (req, res, next) => {
	try {
		const { username } = req.method === 'GET' ? req.query : req.body;
		let user = await UsersSchema.findOne({ username });
		if (!user) return next(new AppError('User not found...', 404));

		next();
	} catch (error) {
		return next(error);
	}
};

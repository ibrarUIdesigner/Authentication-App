//* DEVELOPMEMNT ERRROS
const DevelopmentErrors = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'fails';

	console.error(`An error occurred: ${err.message}`);

	return res.status(err.statusCode).json({
		code: err.statusCode,
		status: err.status,
		name: err.name,
		message: err.message,
		error: err,
		stack: err.stack,
	});
};

//* PRODUCTIONS ERROR
const ProductionErrors = (err, req, res, next) => {
	const { message } = err;

	console.log('message', message);

	return res.status(err.status).json({
		message: message,
	});
};

const errorHandler = (err, req, res, next) => {
	if (process.env.MODE === 'development')
		DevelopmentErrors(err, req, res, next);
	else ProductionErrors(err, req, res, next);
};

module.exports = errorHandler;

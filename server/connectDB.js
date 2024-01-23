const mongoose = require('mongoose');

const ConnectDataBase = async (DATABASE) => {
	try {
		const conn = await mongoose.connect(DATABASE);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

module.exports = ConnectDataBase;

const ConnectDataBase = require('./connectDB');
const app = require('./index');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 8000;
const MODE = process.env.MODE;
const DATABASE = process.env.DATABASE;

//* DATABASE CONNECTION
ConnectDataBase(DATABASE);

const connection = () => {
	console.log(
		`Example app listening at http://localhost:${PORT} in ${MODE} mode`,
	);
};

app.listen(PORT, connection);

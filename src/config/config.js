// Import the dotenv module and configure it
const dotenv = require("dotenv");
dotenv.config();

// Assign values to variables
const port = process.env.PORT || 3000;

const dbConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
};

// Export the variables
module.exports = {
	dbConfig: dbConfig,
	port: port,
};

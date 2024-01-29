const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { config } = require("dotenv");
// const morgan = require('morgan');

const winston = require("winston");
// const expressWinston = require("express-winston");

const { port } = require("./src/config/config.js");
const authRoutes = require("./src/routes/authRoutes.js");
const pagesRoutes = require("./src/routes/pagesRoutes.js");
const crudRoutes = require("./src/routes/crudRoutes.js");

const HTML_BASE_URL = __dirname + "/src/view";

config();

const app = express();
app.use(express.json());
// app.use(morgan('dev'));
/* app.use(
	expressWinston.logger({
		transports: [
			new winston.transports.Console(),
			// new winston.transports.File({ filename: 'logs/app.log' })
		],
		format: winston.format.combine(
			winston.format.json(),
			winston.format.timestamp(),
			winston.format.prettyPrint()
		),
		meta: true,
		// msg: "HTTP {{req.method}} {{req.url}}",
		expressFormat: true,
		colorize: false,
	})
); */

const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
	),
	transports: [
		new winston.transports.Console(),
		// new winston.transports.File({ filename: "logs/app.log" }),
	],
});

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	// logger.log("error", "This is an error message");
	// logger.log("warn", "This is a warning message");
	// logger.log("info", "This is an info message");
	// logger.log("verbose", "This is a verbose message");
	// logger.log("debug", "This is a debug message");
	// logger.log("silly", "This is a silly message");
	logger.log("info", `Request to ${req.url}`);
	const targetUrl = path.join(HTML_BASE_URL, "index.html");
	res.sendFile(targetUrl);
});

app.get("/resetPassword", (req, res) => {
	logger.log("info", `Request to ${req.url}`);
	const targetUrl = path.join(HTML_BASE_URL, "reset-password.html");
	res.sendFile(targetUrl);
});

app.get("/notfound", (req, res) => {
	logger.log("info", `Request to ${req.url}`);
	const targetUrl = path.join(HTML_BASE_URL, "404.html");
	res.sendFile(targetUrl);
});
app.use("/auth", authRoutes);
app.use("/pages", pagesRoutes);
app.use("/crud", crudRoutes);

app.use((req, res) => {
	logger.log("info", `Request to ${req.url} got redirected`);
	res.redirect("/notfound");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

const express = require("express");
const { config } = require("dotenv");
const bodyParser = require("body-parser");

const { port } = require("./src/config/config.js");
const authRoutes = require("./src/routes/authRoutes.js");
const contextRoutes = require("./src/routes/contextRoutes.js");

config();

const app = express();
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array()); 
app.use(
	express.static("public", {
		maxAge: 0, // Set the maximum age for caching (1 day in this case)
	})
);
app.use((req, res, next) => {
	res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
	next();
});
app.use("/auth", authRoutes);
app.use("/context", contextRoutes);
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

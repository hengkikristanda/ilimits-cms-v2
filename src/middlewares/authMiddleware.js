// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
	try {
		// Retrieve the JWT token from the HTTP-only cookie
		const token = req.cookies.token;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized" });
		}

		// Verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Attach the user ID to the request object for further processing
		req.userId = decoded.userId;

		next();
	} catch (error) {
		console.error(error);
		return res.status(401).json({ error: "Unauthorized" });
	}
};

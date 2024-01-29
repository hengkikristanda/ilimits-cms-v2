// authenticateMiddleware.js
const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
	try {
		const token = req.headers.authorization || req.cookies.access_token;
		if (!token) {
			throw new Error("Unauthorized: No token provided");
		}

		// Verify the token using the secret key
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Check expiration
		if (decoded.expiresIn <= Date.now() / 1000) {
			throw new Error("Unauthorized: Token has expired");
		}

		// Attach the user information to the request for further handling in route handlers
		req.user = decoded;

		// Move to the next middleware or route handler
		next();
	} catch (error) {
		console.error(error);
		const errorMessage = "401";
		return res.redirect(`/?error=${encodeURIComponent(errorMessage)}`);
	}
};

module.exports = isAuthenticated;

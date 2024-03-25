const winston = require("winston");
const { validateInputPassword } = require("../utils/commonUtils");

const ResponseBody = require("../model/ResponseBody");

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

/* const register = async (req, res) => {
	try {
		const { username, password, retypePassword } = req.body;

		if (password !== retypePassword) {
			throw new Error("Password mismatch");
		}

		const isUserNameExists = await usersServices.findByUserId(username);
		if (isUserNameExists) {
			throw new Error("Username already exists");
		}

		usersServices.register(username, password);
		res.status(201).json({ message: "User registered successfully!" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}; */

const login = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const { username, password } = req.body;

		responseBody.responseMessage = "Invalid username or password";

		if (!username || !password) {
			return res.status(400).json(responseBody);
		}

		const authEndPoint = process.env.AUTH_END_POINT + "/users/login";

		console.log(`Send Login Request to: ${authEndPoint}`);

		const apiResponse = await fetch(authEndPoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		if (apiResponse.ok) {
			const responseData = await apiResponse.json();

			let options = {
				maxAge: process.env.TOKEN_EXP_TIME,
				httpOnly: true,
				sameSite: "none",
				secure: true,
			};

			let commonInfo = {
				maxAge: process.env.TOKEN_EXP_TIME,
				httpOnly: false,
				sameSite: "none",
				secure: false,
			};

			console.log(responseData.response);

			res.cookie("active_userId", responseData.response.userId, options);
			res.cookie("access_token", responseData.response.token, options);
			res.cookie("loggedInUser", responseData.response.userName);
			res.redirect("/pages/home");
		} else {
			const errorResponseData = await apiResponse.json();
			res.status(apiResponse.status).json(errorResponseData);
		}
	} catch (error) {
		responseBody.responseMessage = "Something went wrong";
		res.status(500).json(responseBody);
	}
};

const logout = async (req, res) => {
	try {
		// Clear the HTTP-only cookie containing the token
		res.clearCookie("access_token");
		res.clearCookie("loggedInUser");
		res.clearCookie("active_userId");

		// Optionally, perform server-side actions like token invalidation or logging out

		// res.status(200).json({ message: "Logout successful" });
	} catch (error) {
		console.error(error);
		// res.status(500).json({ error: "Internal Server Error" });
	} finally {
		res.redirect("/");
	}
};

const resetPassword = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const { emailAddress } = req.body;

		responseBody.responseMessage = "Invalid username or password";

		if (!emailAddress) {
			return res.status(400).json(responseBody);
		}

		const authEndPoint = process.env.AUTH_END_POINT + "/users/resetPassword/" + emailAddress;

		const apiResponse = await fetch(authEndPoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: emailAddress }),
		});

		if (apiResponse.ok) {
			const responseData = await apiResponse.json();
			res.status(apiResponse.status).json(responseData);
		} else {
			const errorResponseData = await apiResponse.json();
			res.status(apiResponse.status).json(errorResponseData);
		}
	} catch (error) {
		responseBody.responseMessage = "Something went wrong";
		res.status(500).json(responseBody);
	}
};

const updatePassword = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const active_userId = req.cookies.active_userId;
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		if (newPassword !== confirmNewPassword) {
			responseBody.responseMessage = "Password mismatch";
			return res.status(400).json(responseBody);
		}

		const isValidPassword = validateInputPassword(newPassword);
		if (!isValidPassword) {
			responseBody.responseMessage =
				"New Passwords must have at least 8 characters and contain at least one of the following: uppercase letters, lowercase letters, numbers";
			return res.status(400).json(responseBody);
		}

		const authEndPoint = process.env.AUTH_END_POINT + "/users/updatePassword";

		console.log("[Update Password]Sending POST request to: ", authEndPoint);

		const apiResponse = await fetch(authEndPoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: active_userId,
				oldPassword,
				newPassword,
				confirmNewPassword,
			}),
		});

		if (apiResponse.ok) {
			res.clearCookie("access_token");
			res.clearCookie("active_userId");
			res.redirect("/?error=200");
		} else {
			const errorResponseData = await apiResponse.json();
			if (apiResponse.status == 403) {
				res.clearCookie("access_token");
				res.clearCookie("active_userId");
				res.redirect("/?error=403");
			} else {
				res.status(apiResponse.status).json(errorResponseData);
			}
		}
	} catch (error) {
		responseBody.responseMessage = "Something went wrong";
		res.status(500).json(responseBody);
	}
};

const updateUser = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const currentUser = req.user;
		const { firstName, lastName, email, phone } = req.body;

		if (!firstName) {
			responseBody.responseMessage = "First Name is required";
			return res.status(400).json(responseBody);
		}

		if (!email) {
			responseBody.responseMessage = "Email is required";
			return res.status(400).json(responseBody);
		}

		let authEndPoint = process.env.AUTH_END_POINT + "/users";

		if (currentUser.id) {
			authEndPoint += `/${email}`;
		}

		console.log("[Update User Info] Sending PUT request to: ", authEndPoint);

		const apiResponse = await fetch(authEndPoint, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName,
				lastName,
				email,
				phone,
			}),
		});

		if (apiResponse.ok) {
			const responseData = await apiResponse.json();
			res.status(200).json(responseData);
		} else {
			const errorResponseData = await apiResponse.json();
			console.log(errorResponseData);
			res.status(apiResponse.status).json(errorResponseData);
		}
	} catch (error) {
		console.log(error);
		responseBody.responseMessage = "Something went wrong";
		res.status(500).json(responseBody);
	}
};

module.exports = { login, logout, resetPassword, updatePassword, updateUser };

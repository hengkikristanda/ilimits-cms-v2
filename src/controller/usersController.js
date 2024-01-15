const usersServices = require("../services/usersServices");

const register = async (req, res) => {
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
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await usersServices.findByUserId(username);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const validPassword = await usersServices.validate(password, user.encodedPassword);
		if (!validPassword) {
			return res.status(401).json({ message: "Invalid username or password" });
		}
		const token = await usersServices.generateToken(user);

		res.cookie("token", token, { httpOnly: true });

		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const logout = async (req, res) => {
	try {
		// Clear the HTTP-only cookie containing the token
		res.clearCookie("token");

		// Optionally, perform server-side actions like token invalidation or logging out

		res.status(200).json({ message: "Logout successful" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = { register, login, logout };

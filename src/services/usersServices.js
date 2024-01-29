const bcrypt = require("bcryptjs");
const Users = require("../model/Users");
const { generateTimestampBasedUUID } = require("../utils/uuid");
const jwt = require("jsonwebtoken");

const register = async (username, password) => {
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const id = generateTimestampBasedUUID();
		return await Users.create({ id, userId: username, encodedPassword: hashedPassword });
	} catch (error) {
		console.log(error);
		throw new Error("Error Creating New User");
	}
};

const findByUserId = async (userId) => {
	try {
		const user = await Users.findOne({
			where: {
				userId,
			},
		});

		return user;
	} catch (error) {
		console.log(error);
		throw new Error("Error Finding UserId");
	}
};

const validate = async (password, encodedPassword) => {
	try {
		return await bcrypt.compare(password, encodedPassword);
	} catch (error) {
		console.log(error);
		throw new Error("Invalid Password");
	}
};

const generateToken = async (user) => {
	try {
		return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "5s" });
	} catch (error) {
		console.log(error);
		throw new Error("Error generate token");
	}
};

const getUser = async (userId) => {
	let authEndPoint = process.env.AUTH_END_POINT + "user/";
	try {
		if (userId) {
			authEndPoint += userId;
			const apiResponse = await fetch(authEndPoint, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			return apiResponse.json();
		}
	} catch (error) {
		console.log(error);
	}
	return null;
};

module.exports = { register, findByUserId, validate, generateToken, getUser };

// const Promotion = require("../model/promotionModel");
const { generateTimestampBasedUUID } = require("../utils/uuid");

const create = async (promotionDTO) => {
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const id = generateTimestampBasedUUID();
		return await Users.create({ id, userId: username, encodedPassword: hashedPassword });
	} catch (error) {
		console.log(error);
		throw new Error("Error Creating New User");
	}
};

module.exports = { create };

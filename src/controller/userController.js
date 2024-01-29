const ResponseBody = require("../model/ResponseBody");
const userService = require("../services/usersServices");

const getCurrentUser = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const userId = req.user.userName;

		if (!userId) {
			responseBody.message = "User Id is Required";
			responseBody.code = 400;
			return res.status(400).json(responseBody);
		}

		const user = await userService.getUser(userId);
		if (!user || !user.success) {
			responseBody.responseMessage = "User Not Found";
			return res.status(400).json(responseBody);
		}

		responseBody.isSuccess = true;
		responseBody.responseMessage = "User Found";
		responseBody.code = 200;
		responseBody.objectData = user.response;

		return res.status(200).json(responseBody);
	} catch (error) {
		console.error(error);
		responseBody.responseMessage = error;
		responseBody.statusCode = 500;
		res.status(500).json(responseBody);
	}
};

module.exports = { getCurrentUser };

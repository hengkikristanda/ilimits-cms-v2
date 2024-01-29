const ResponseBody = require("../model/ResponseBody");
const subscriberService = require("../services/subscriberService");

const getAllSubscriber = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const startIndex = req.params.startIndex || 0;

		const subscriber = await subscriberService.getAllSubscriber(startIndex);
		if (!subscriber || !subscriber.success) {
			responseBody.responseMessage = "No Data Found";
			return res.status(400).json(responseBody);
		}

		responseBody.isSuccess = true;
		responseBody.responseMessage = "Success";
		responseBody.code = 200;
		responseBody.objectData = subscriber;
		return res.status(200).json(responseBody);
	} catch (error) {
		console.error(error);
		responseBody.responseMessage = error;
		responseBody.statusCode = 500;
		res.status(500).json(responseBody);
	}
};

module.exports = { getAllSubscriber };

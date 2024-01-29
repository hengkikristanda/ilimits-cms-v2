const Users = require("../model/Users");

const getAllSubscriber = async (startIndex) => {
	let clientEndPoint = process.env.CLIENT_END_POINT + "subscriber/";
	try {
		if (startIndex) {
			clientEndPoint += startIndex;
		}

		const apiResponse = await fetch(clientEndPoint, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return apiResponse.json();
	} catch (error) {
		console.log(error);
	}
	return null;
};

module.exports = { getAllSubscriber };

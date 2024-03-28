const getAllContent = async (startIndex, contentId) => {
	let clientEndPoint = process.env.CONTENT_END_POINT + "/promotions-cms";
	try {
		if (contentId) {
			clientEndPoint += contentId;
		}

		console.log("Sending request to: ", clientEndPoint);

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

const getContentById = async (contentId) => {
	let clientEndPoint = process.env.CONTENT_END_POINT + "/promotions/";
	try {
		if (contentId) {
			clientEndPoint += contentId;
		}

		console.log("Sending request to: ", clientEndPoint);

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

module.exports = { getAllContent, getContentById };

const getAllContent = async (startIndex, contentId) => {
	let clientEndPoint = process.env.CONTENT_END_POINT + "/promotion/";
	try {
		if (contentId) {
			clientEndPoint += contentId;
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

module.exports = { getAllContent };

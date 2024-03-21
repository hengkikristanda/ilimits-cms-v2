const fetchAll = async () => {
	let contentEndPoint = process.env.CONTENT_END_POINT + "docs/";

	try {
		const apiResponse = await fetch(contentEndPoint, {
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

const deleteById = async (documentId) => {
	let contentEndPoint = process.env.CONTENT_END_POINT + `docs/${documentId}`;

	try {
		const apiResponse = await fetch(contentEndPoint, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return apiResponse;
	} catch (error) {
		console.log(error);
	}
	return null;
};

module.exports = { fetchAll, deleteById };

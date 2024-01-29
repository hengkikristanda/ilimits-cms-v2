const ResponseBody = require("../model/ResponseBody");
const documentService = require("../services/documentService");

const getAllDocument = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const resultSet = await documentService.fetchAll();
		if (!resultSet) {
			responseBody.responseMessage = "No Data Found";
			return res.status(400).json(responseBody);
		}

		responseBody.isSuccess = true;
		responseBody.responseMessage = "Success";
		responseBody.code = 200;
		responseBody.objectData = resultSet;
		return res.status(200).json(responseBody);
	} catch (error) {
		console.error(error);
		responseBody.responseMessage = error;
		responseBody.statusCode = 500;
		res.status(500).json(responseBody);
	}
};

const deleteDocument = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		let documentId = req.params.documentId;

		if (!documentId) {
			responseBody.responseMessage = "Id is required";
			return res.status(400).json(responseBody);
		}

		documentService.deleteById(documentId);

		responseBody.isSuccess = true;
		responseBody.responseMessage = "Document Successfully Removed";
		responseBody.code = 200;
		return res.status(200).json(responseBody);
	} catch (error) {
		console.error(error);
		responseBody.responseMessage = error;
		responseBody.statusCode = 500;
		res.status(500).json(responseBody);
	}
};

module.exports = { getAllDocument, deleteDocument };

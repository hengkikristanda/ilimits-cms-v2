const ResponseBody = require("../model/ResponseBody");
const multer = require("multer");

const documentUploadErrorHandler = (upload) => (req, res, next) => {
	const responseBody = new ResponseBody();
	upload(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			// A Multer error occurred when uploading.
			if (err.code === "LIMIT_FILE_SIZE") {
				responseBody.responseMessage = "File size is too large. Limit is 5MB.";
				responseBody.statusCode = 400;
				return res.status(400).json(responseBody);
			}
			// Handle other Multer errors here if needed
		} else if (err) {
			// An unknown error occurred when uploading.
			responseBody.responseMessage = "Something went wrong.";
			responseBody.statusCode = 400;
			return res.status(500).json(responseBody);
		}
		// If no errors, move to the next middleware (in this case, uploadController.uploadFile)
		next();
	});
};

module.exports = documentUploadErrorHandler;

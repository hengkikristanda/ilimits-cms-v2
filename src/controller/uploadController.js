const ResponseBody = require("../model/ResponseBody");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const { PUBLIC_DOCS_BASEURL } = require("../utils/constants");

const uploadFile = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		let data = new FormData();

		req.files.map((file) => {
			data.append("files", fs.createReadStream(PUBLIC_DOCS_BASEURL + file.filename));
		});

		let clientEndPoint = process.env.CONTENT_END_POINT + "docs/uploads/";

		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: clientEndPoint,
			headers: {
				...data.getHeaders(),
			},
			data: data,
		};

		axios
			.request(config)
			.then((response) => {
				console.log(JSON.stringify(response.data));
			})
			.catch((error) => {
				console.log(error);
			});

		responseBody.isSuccess = true;
		responseBody.responseMessage = "Document uploaded successfully";
		responseBody.statusCode = 200;
		res.status(200).json(responseBody);
	} catch (error) {
		console.error("Upload failed:", error.message);
		responseBody.responseMessage = error;
		responseBody.statusCode = 500;
		res.status(500).json(responseBody);
	}
};

const attachedImage = async (req, res) => {
	if (req.file) {
		const fileUrl = `${req.protocol}://${req.get("host")}/assets/img/temp/${req.file.filename}`;
		res.json({ url: fileUrl });
	} else {
		return res.status(402).json({ message: "Failed to attach image" });
	}
};

module.exports = { uploadFile, attachedImage };

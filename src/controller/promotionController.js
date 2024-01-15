const path = require("path");
const axios = require("axios");
const fs = require("fs");
const mime = require("mimetype");
const { getFileExtensionFromMime } = require("../utils/commonUtils");
const { HTTP_STATUS_CODES } = require("../utils/constants");

const create = async (req, res) => {
	const { promotionTitle, promotionSubHeading, promotionFootNote, description } = req.body;
	const imagePath = req.file.path;

	try {
		const { blob, fileName, mimeType } = getImageData(imagePath);

		const response = await exportImage(blob, fileName, mimeType);

		if (response.status === HTTP_STATUS_CODES.OK) {
			console.log("Response from external API:", response.data);

			const promotionDTO = {
				
			}

		} else {
			throw new Error(response);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Invalid Request" });
	}
};

async function exportImage(blob, fileName, mimeType) {
	const formData = new FormData();
	formData.append("image", blob, { filename: fileName, contentType: mimeType });

	const externalApiUrl = "http://localhost:3200/api/upload";
	const response = await axios.post(externalApiUrl, formData);
	return response;
}

function getImageData(imagePath) {
	const imageBuffer = fs.readFileSync(imagePath);

	const mimeType = mime.lookup(imagePath, imageBuffer);

	const blob = new Blob([imageBuffer], { type: mimeType });

	let fileType = `.${getFileExtensionFromMime(mimeType)}`;

	const fileName = Date.now() + fileType;
	return { blob, fileName, mimeType };
}

module.exports = { create };

const FormData = require("form-data");
const cheerio = require("cheerio");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const mime = require("mimetype");
const ResponseBody = require("../model/ResponseBody");
const { getFileExtensionFromMime, replaceHtmlTagValue } = require("../utils/commonUtils");
const { HTTP_STATUS_CODES } = require("../utils/constants");
const { PUBLIC_TEMP_IMG_BASEURL } = require("../utils/constants");
const contentService = require("../services/contentService");

const handlePostImage = async (fileName, clientEndPoint) => {
	try {
		const formData = new FormData();
		formData.append("files", fs.createReadStream(PUBLIC_TEMP_IMG_BASEURL + fileName));

		let config = {
			method: "POST",
			url: clientEndPoint,
			data: formData,
			maxBodyLength: Infinity,
			headers: {
				...formData.getHeaders(), // Automatically sets the Content-Type to multipart/form-data with the correct boundary
			},
		};

		console.log("Sending POST Image to: ", clientEndPoint);

		const response = await axios.request(config);
		if (response.status === HTTP_STATUS_CODES.OK) {
			return response.data;
		}
	} catch (error) {
		console.log(error);
	}
	return null;
};

const create = async (req, res) => {
	const { title, subHeading, footNote, ctaButtonLabel, ctaButtonLink, submitType, myTextArea } =
		req.body;

	const clientEndPoint = process.env.CONTENT_END_POINT + "/promotion";

	try {
		let heroImageId;
		if (req.file) {
			console.log(req.file);
			// const uploadImageResponse = await handlePostImage(
			// 	req.file.filename,
			// 	process.env.CONTENT_END_POINT + "/image/uploads/"
			// );

			// const uploadImageToWebResponse = await handlePostImage(
			// 	req.file.filename,
			// 	process.env.WEB_END_POINT + "uploads/publicImages/"
			// );

			// heroImageId = uploadImageResponse && uploadImageResponse.data[0].id;
		}

		const $ = cheerio.load(myTextArea);

		$("img").each(function () {
			const oldSrc = $(this).attr("src");
			const newSrc = oldSrc.replace("../../assets/img/temp/", "/assets/img/temp/");
			$(this).attr("src", newSrc);
		});

		$("a").each(function () {
			const oldSrc = $(this).attr("href");
			const newSrc = oldSrc.replace("../../assets/docs/", "/assets/docs/");
			$(this).attr("href", newSrc);
		});

		const updatedHtml = $("body").html();

		const requestBody = {
			imageId: heroImageId,
			heading: title,
			subHeading,
			footNote,
			contentStatus: submitType,
			textContent: updatedHtml,
			ctaButtonLabel,
			ctaButtonLink,
			userId: req.user.id,
		};

		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: clientEndPoint,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
		};

		// const apiResponse = await fetch(clientEndPoint, config);

		return res.status(200).json({ message: "OK" });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: "ERROR" });
	}
};

/* const create = async (req, res) => {
	const { title, subHeading, footNote, ctaButtonLabel, ctaButtonLink, submitType, myTextArea } =
		req.body;

	const clientEndPoint = process.env.CONTENT_END_POINT + "/promotion";

	try {
		let heroImageId;
		if (req.file) {
			const uploadImageResponse = await handlePostImage(
				req.file.filename,
				process.env.CONTENT_END_POINT + "/image/uploads/"
			);

			const uploadImageToWebResponse = await handlePostImage(
				req.file.filename,
				process.env.WEB_END_POINT + "uploads/publicImages/"
			);

			heroImageId = uploadImageResponse && uploadImageResponse.data[0].id;
		}

		const $ = cheerio.load(myTextArea);

		$("img").each(function () {
			const oldSrc = $(this).attr("src");
			const newSrc = oldSrc.replace("../../assets/img/temp/", "/assets/img/temp/");
			$(this).attr("src", newSrc);
		});

		$("a").each(function () {
			const oldSrc = $(this).attr("href");
			const newSrc = oldSrc.replace("../../assets/docs/", "/assets/docs/");
			$(this).attr("href", newSrc);
		});

		const updatedHtml = $("body").html();

		const requestBody = {
			imageId: heroImageId,
			heading: title,
			subHeading,
			footNote,
			contentStatus: submitType,
			textContent: updatedHtml,
			ctaButtonLabel,
			ctaButtonLink,
			userId: req.user.id,
		};

		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: clientEndPoint,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
		};

		const apiResponse = await fetch(clientEndPoint, config);

		return res.status(200).json({ message: "OK" });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: "ERROR" });
	}
 */
/* const { promotionTitle, promotionSubHeading, promotionFootNote, description } = req.body;
	const imagePath = req.file.path;

	try {
		const { blob, fileName, mimeType } = getImageData(imagePath);

		const response = await exportImage(blob, fileName, mimeType);

		if (response.status === HTTP_STATUS_CODES.OK) {
			console.log("Response from external API:", response.data);

			const promotionDTO = {};
		} else {
			throw new Error(response);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Invalid Request" });
	} */
// };

const getAllContent = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const contentId = req.params.contentId;
		const startIndex = req.params.startIndex || 0;

		const response = await contentService.getAllContent(startIndex, contentId);
		if (!response || !response.success) {
			responseBody.responseMessage = "No Data Found";
			return res.status(400).json(responseBody);
		}

		responseBody.isSuccess = true;
		responseBody.responseMessage = "Success";
		responseBody.code = 200;
		responseBody.objectData = response;
		return res.status(200).json(responseBody);
	} catch (error) {
		console.error(error);
		responseBody.responseMessage = error;
		responseBody.statusCode = 500;
		res.status(500).json(responseBody);
	}
};

const deleteContent = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const contentId = req.params.contentId;

		if (contentId) {
			const clientEndPoint = process.env.CONTENT_END_POINT + "/promotion/" + contentId;

			let config = {
				method: "delete",
				url: clientEndPoint,
			};

			const apiResponse = await fetch(clientEndPoint, config);
			if (apiResponse.ok) {
				responseBody.isSuccess = true;
				responseBody.statusCode = 200;
				responseBody.responseMessage = "Promotion Successfully deleted";
				return res.status(200).json(responseBody);
			}

			const errorResponse = await apiResponse.json();
			if (errorResponse && !errorResponse.success) {
				throw new Error("Something went wrong");
			}
		}
	} catch (error) {
		console.error(error);
		responseBody.responseMessage = error;
		responseBody.statusCode = 500;
		res.status(500).json(responseBody);
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

module.exports = { create, getAllContent, deleteContent };

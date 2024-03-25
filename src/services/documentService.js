const fs = require("fs").promises; // Use the promise-based version of the fs module
const path = require("path");

async function readPdfFilenames() {
	try {
		const directoryPath = path.join(__dirname, "../../public", "assets", "docs");
		const files = await fs.readdir(directoryPath); // Read all files in the directory
		const pdfFiles = files.filter((file) => path.extname(file).toLowerCase() === ".pdf"); // Filter PDF files
		return pdfFiles; // Return the array of PDF filenames
	} catch (error) {
		console.error("Error reading the directory:", error);
		return []; // Return an empty array in case of an error
	}
}

const fetchAll = async () => {
	let contentEndPoint = process.env.CONTENT_END_POINT + "/docs/";

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
	let contentEndPoint = process.env.CONTENT_END_POINT + `/docs/${documentId}`;

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

module.exports = { fetchAll, deleteById, readPdfFilenames };

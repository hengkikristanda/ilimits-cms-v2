const fs = require("fs");
const path = require("path");

const mimeToExtension = {
	"image/jpeg": "jpg",
	"image/png": "png",
	"image/gif": "gif",
	// Add more MIME types and their corresponding file extensions as needed
};

function getFileExtensionFromMime(mimeType) {
	return mimeToExtension[mimeType] || "unknown"; // Return 'unknown' if the MIME type is not found in the mapping
}

const uploadFile = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: "No file uploaded" });
		}
		// const fileData = await readFile(req.file.path);
		// const connection = await pool.getConnection();

		const uploadLocation = `/uploads/${req.file.filename}`;
		console.log(req.file);
		console.log(uploadLocation);

		res.status(200).json({ location: uploadLocation });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
};

function validateInputPassword(input) {
	return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(input);
}

function calculateFolderSize(folderPath) {
	let totalSize = 0;
	const initialStorageGB = 1;

	function calculateFileSize(filePath) {
		const stats = fs.statSync(filePath);
		return stats.size;
	}

	function calculateFolderSizeRecursively(folderPath) {
		const files = fs.readdirSync(folderPath);

		for (const file of files) {
			const filePath = path.join(folderPath, file);
			if (fs.statSync(filePath).isDirectory()) {
				calculateFolderSizeRecursively(filePath);
			} else {
				totalSize += calculateFileSize(filePath);
			}
		}
	}

	calculateFolderSizeRecursively(folderPath);

	// Convert totalSize to gigabytes
	const totalSizeGB = totalSize / (1024 * 1024 * 1024);

	console.log(`Total size of ${folderPath}: ${totalSizeGB.toFixed(2)} GB`);

	// Calculate remaining storage
	const remainingStorageGB = initialStorageGB - totalSizeGB;
	console.log(`Remaining storage: ${remainingStorageGB.toFixed(15)} GB`);

	return remainingStorageGB.toFixed(15);
}

module.exports = {
	getFileExtensionFromMime,
	uploadFile,
	validateInputPassword,
	calculateFolderSize,
};

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

module.exports = {
	getFileExtensionFromMime,
	uploadFile,
};

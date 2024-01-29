const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();

const isAuthenticated = require("../middlewares/authMiddleware");
const userController = require("../controller/userController");
const subscriberController = require("../controller/subscriberController");
const uploadController = require("../controller/uploadController");
const documentController = require("../controller/documentController");

const diskStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/assets/docs/");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({
	storage: diskStorage,
	limits: {
		fileSize: 1024 * 1024 * 5, // 5 MB limit
	},
});
// USER
router.get("/user/currentUser", isAuthenticated, userController.getCurrentUser);

// SUBSCRIBER
router.get("/client/subscriber", isAuthenticated, subscriberController.getAllSubscriber);

// PUBLIC DOCUMENT
router.get("/publicDocs", isAuthenticated, documentController.getAllDocument);
router.delete("/publicDocs/:documentId", isAuthenticated, documentController.deleteDocument);

router.post(
	"/uploads/publicDocs",
	isAuthenticated,
	upload.array("files"),
	uploadController.uploadFile
);

module.exports = router;

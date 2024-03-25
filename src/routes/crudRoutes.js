const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();

const isAuthenticated = require("../middlewares/authMiddleware");
const documentUploadErrorHandler = require("../middlewares/multerErrorHandler");
const userController = require("../controller/userController");
const subscriberController = require("../controller/subscriberController");
const uploadController = require("../controller/uploadController");
const documentController = require("../controller/documentController");
const promotionController = require("../controller/promotionController");

const publicDocStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/assets/docs/");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "_" + file.originalname);
		// cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	},
});

const publicDocUploader = multer({
	storage: publicDocStorage,
	limits: {
		fileSize: 1024 * 1024 * 5, // 5 MB limit
	},
});

const attachedStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/assets/img/promotions/hero/");
	},
	filename: (req, file, cb) => {
		const fileName = Date.now() + "-" + file.originalname.replace(/ /g, "_");
		cb(null, fileName);
	},
});

const attachImageUploader = multer({
	storage: attachedStorage,
	limits: {
		fileSize: 1024 * 1024 * 5, // 5 MB limit
	},
});

// Promotion
router.post(
	"/promotions",
	isAuthenticated,
	attachImageUploader.single("heroImage"),
	promotionController.create
);

// USER
router.get("/user/currentUser", isAuthenticated, userController.getCurrentUser);

// SUBSCRIBER
router.get("/client/subscriber", isAuthenticated, subscriberController.getAllSubscriber);

// Promotion
router.get("/content/promotion/:contentId?", isAuthenticated, promotionController.getAllContent);
router.delete("/content/promotion/:contentId?", isAuthenticated, promotionController.deleteContent);

// PUBLIC DOCUMENT
router.get("/publicDocs", isAuthenticated, documentController.getAllDocument);
router.delete("/publicDocs/:documentId", isAuthenticated, documentController.deleteDocument);

router.post(
	"/uploads/publicDocs",
	isAuthenticated,
	documentUploadErrorHandler(publicDocUploader.array("files")),
	uploadController.uploadFile
);

router.post(
	"/uploads/attachedImage",
	isAuthenticated,
	attachImageUploader.single("attachImage"),
	uploadController.attachedImage
);

module.exports = router;

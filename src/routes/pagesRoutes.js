const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();

const isAuthenticated = require("../middlewares/authMiddleware");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/uploads/"); // Files will be uploaded to the 'uploads/' directory
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname); // Rename files if needed
	},
});

const upload = multer({ storage: storage });

const routeController = require("../controller/routeController");
const promotionController = require("../controller/promotionController");
const emailController = require("../controller/emailController");
const commonUtils = require("../utils/commonUtils");

// router.get("/:page?/:subPage?", routeController.get);

// router.post("/promotion", upload.single("image"), promotionController.create);

// router.post("/uploader", upload.single("file"), commonUtils.uploadFile);

// router.post("/send-email/:purpose", emailController.send);

router.get("/home", isAuthenticated, routeController.getHomePage);

router.get("/promotions", isAuthenticated, routeController.getPromotions);
router.get("/promotions/createPromotion", isAuthenticated, routeController.getCreatePromotion);

router.get("/publicDocs", isAuthenticated, routeController.getPublicDocs);
router.get("/publicDocs/uploads", isAuthenticated, routeController.getUploadPublicDocs);

router.get("/subscriber", isAuthenticated, routeController.getSubscriber);

router.get("/accountSettings", isAuthenticated, routeController.getAccountSettings);

router.get("/test", routeController.getTest);

module.exports = router;

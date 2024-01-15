const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();

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

router.get("/:page?/:subPage?", routeController.get);

router.post("/promotion", upload.single("image"), promotionController.create);

router.post("/uploader", upload.single("file"), commonUtils.uploadFile);

router.post("/send-email/:purpose", emailController.send);

module.exports = router;

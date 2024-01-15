const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();

const usersController = require("../controller/usersController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware.verifyToken);

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);

module.exports = router;

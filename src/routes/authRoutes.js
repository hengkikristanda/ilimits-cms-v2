const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();

const authController = require("../controller/authController");
const isAuthenticated = require("../middlewares/authMiddleware");

router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/requestResetPassword", authController.resetPassword);
router.post("/updatePassword", isAuthenticated, authController.updatePassword);
router.post("/updateUser", isAuthenticated, authController.updateUser);
// router.post("/register", usersController.register);
// router.post("/logout", usersController.logout);

module.exports = router;

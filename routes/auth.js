const express = require("express");
const router = express.Router();

// Import controllers
const authController = require("../controllers/auth");

// Auth Routes
router.post("/login", authController.login);
router.post("/register", authController.createUser);
router.post("/updateUser", authController.updateUser);
router.get("/getUserData", authController.getUserData);
router.post("/otp", authController.sendOTP);
router.post("/verify", authController.verifyOTP);


// Export Router
module.exports = router;
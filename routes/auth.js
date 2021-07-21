const express = require("express");
const router = express.Router();

// Import controllers
const authController = require("../controllers/auth");

// Auth Routes
router.post("/login", authController.login);
router.post("/registerUser", authController.createUser);
router.post("/updateUser", authController.updateUser);
router.get("/getUserData", authController.getUserData);
router.post("/otp", authController.sendOTP);


// Export Router
module.exports = router;
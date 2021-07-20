const express = require("express");
const router = express.Router();

// Import controllers
const authController = require("../controllers/auth");

// Auth Routes
router.post("/login", authController.login);
router.post("/register", authController.createUser);
router.post("/update", authController.updateUser);


// Export Router
module.exports = router;
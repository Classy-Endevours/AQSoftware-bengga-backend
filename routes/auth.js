const express = require("express");
const router = express.Router();

// Import controllers
const authController = require("../controllers/auth");

// Auth Routes
router.post("/login", authController.login);


// Export Router
module.exports = router;
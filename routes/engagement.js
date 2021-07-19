const express = require("express");
const router = express.Router();

// Import controllers
const engagementController = require("../controllers/engagement");

// Auth Routes
router.get("/getEngagement", engagementController.getEngagement);


// Export Router
module.exports = router;
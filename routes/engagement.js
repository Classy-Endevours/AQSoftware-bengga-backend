const express = require("express");
const router = express.Router();
const passport = require('passport');

// Import controllers
const engagementController = require("../controllers/engagement");

// Auth Routes
router.get(
    "/getEngagement",
    passport.authenticate("jwt", { session: false }),
    engagementController.getEngagement
);
router.get(
    "/getBanner",
    passport.authenticate("jwt", { session: false }),
    engagementController.getBanner
);

// Export Router
module.exports = router;

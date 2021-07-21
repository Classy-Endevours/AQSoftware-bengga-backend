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
router.post(
    "/createBanner",
    passport.authenticate("jwt", { session: false }),
    engagementController.createBanner
);

// Export Router
module.exports = router;

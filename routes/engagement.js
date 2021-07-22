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
router.get(
    "/getGames",
    passport.authenticate("jwt", { session: false }),
    engagementController.getGames
);
router.get(
    "/getTournaments",
    passport.authenticate("jwt", { session: false }),
    engagementController.getTournaments
);
router.get(
    "/getTournaments/fun_type_id/:fun_type_id",
    passport.authenticate("jwt", { session: false }),
    engagementController.getTournaments
);
router.get(
    "/getTournaments/search/:search",
    passport.authenticate("jwt", { session: false }),
    engagementController.getTournaments
);

router.post(
    "/createTournaments",
    passport.authenticate("jwt", { session: false }),
    engagementController.createTournaments
);

// Export Router
module.exports = router;

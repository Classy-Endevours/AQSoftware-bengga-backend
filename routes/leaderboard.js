const express = require("express");
const router = express.Router();
const passport = require('passport');

// Import controllers
const leaderboardController = require("../controllers/leaderboard");

// Auth Routes
router.get(
    "/leaderboard", 
    passport.authenticate('jwt', { session: false }),
    leaderboardController.leaderboard
);    

router.get(
    "/leaderboard/userData",
    passport.authenticate('jwt', { session: false }),
    leaderboardController.getUserData
)


// Export Router
module.exports = router;
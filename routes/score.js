const express = require("express");
const router = express.Router();
const passport = require('passport');

// Import controllers
const postScoreController = require("../controllers/score");

// Auth Routes
router.post(
    "/postscore", 
    passport.authenticate('jwt', { session: false }),
    postScoreController.score
);    


// Export Router
module.exports = router;
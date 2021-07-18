const express = require("express");
const router = express.Router();
const passport = require('passport');

// Import controllers
const schedulerController = require("../controllers/scheduler");

// Auth Routes
router.post(
    "/scheduler", 
    passport.authenticate('jwt', { session: false }),
    schedulerController.scheduler
);    

router.get(
    "/schedules", 
    passport.authenticate('jwt', { session: false }),
    schedulerController.getAllSchedules
);
// Export Router
module.exports = router;
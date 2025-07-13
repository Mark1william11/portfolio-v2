const express = require("express");
const { sendEmailController, getProjectsController } = require("../controllers/portfolioContoller");

//router object
const router = express.Router();

//routes
// GET || PORTFOLIO PROJECTS
router.get("/get-projects", getProjectsController);

// POST || CONTACT
router.post("/sendEmail", sendEmailController);

// /export
module.exports = router;
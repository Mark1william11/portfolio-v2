const express = require("express");
// Corrected path for the controller file
const { sendEmailController, getProjectsController } = require("../controllers/portfolioContoller");

const router = express.Router();
router.get("/get-projects", getProjectsController);
router.post("/sendEmail", sendEmailController);
module.exports = router;
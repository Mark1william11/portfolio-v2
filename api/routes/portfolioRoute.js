const express = require("express");
const { getProjectsController } = require("../controllers/portfolioContoller");

const router = express.Router();

// The only API route we need now is for fetching projects.
router.get("/get-projects", getProjectsController);

module.exports = router;
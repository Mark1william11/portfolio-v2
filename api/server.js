const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connected!'))
    .catch(err => console.log('DB Connection Error: ', err));

const app = express();

app.use(cors());
app.use(express.json());

// Corrected path for the routes file
app.use("/api/v1/portfolio", require("./routes/portfolioRoute"));

// For the live deployment, Vercel handles serving the static files.
// We only need this for local development, and the path must be corrected.
// The path now goes up one level `..` from `/api` to the project root.
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// We need to export the app for Vercel's serverless environment
module.exports = app;
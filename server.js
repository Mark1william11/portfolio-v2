const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require('mongoose');

// DOTENV CONFIG
dotenv.config();

// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connected!'))
    .catch(err => console.log('DB Connection Error: ', err));

// REST OBJECT
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// API ROUTES
// All your API endpoints will be handled here first.
app.use("/api/v1/portfolio", require("./routes/portfolioRoute"));

// STATIC FILES - Serve the React build files
// This tells Express to look in the 'client/build' folder for static assets
app.use(express.static(path.join(__dirname, "./client/build")));

// "CATCH-ALL" ROUTE FOR THE REACT APP
// For any request that doesn't match the API routes above,
// serve the main index.html file of the React app.
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


// PORT
const PORT = process.env.PORT || 8080;

// LISTEN
app.listen(PORT, () => {
  console.log(`Server Running On PORT ${PORT}`);
});
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require('mongoose');

//dotenv configuration
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connected!'))
    .catch(err => console.log('DB Connection Error: ', err));

//rest object
const app = express();

//middlewares
// We are adding specific options to CORS to allow our frontend origin
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

//routes
app.use("/api/v1/portfolio", require("./routes/portfolioRoute"));

// This part is for production build on Vercel, not for local dev.
// It's good to keep it.
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./client/build")));
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });
}

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server Running On PORT ${PORT} `);
});
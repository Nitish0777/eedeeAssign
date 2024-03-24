const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./app/routes/user_Route");
const connectDb = require("./app/models/db");

//initialize app
const app = express();

dotenv.config();

// Apply CORS middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;

app.use("/api", router);

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error in Listening app on port ${PORT}`, err);
    return;
  }
  console.log(`App is Listening on port ${PORT}`);
});

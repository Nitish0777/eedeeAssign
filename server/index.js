const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./app/routes/user_Route");

//initialize app
const app = express();

dotenv.config();

const PORT = process.env.PORT || 3001;

corsOptions = {
  origin: "http://localhost:7000",
  optionsSuccessStatus: 200,
};

cors(corsOptions);

app.use("/api", router);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error in Listening app on port ${PORT}`);
  }
  console.log(`App is Listening on port ${PORT}`);
});

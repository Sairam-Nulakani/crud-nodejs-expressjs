const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require(".");

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is running on port 8080");
});

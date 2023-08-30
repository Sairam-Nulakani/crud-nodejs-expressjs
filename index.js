const mongoose = require("mongoose");
const express = require("express");
const app = express();
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("Connected to db");
});

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log("Hello from Middleware");
  next();
});
app.use((req, res, next) => {
  req.requestedTime = new Date().toLocaleString();
  next();
});
/////ROUTE HANDLERS/////////////
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);
/////////SERVER/////////
module.exports = app;

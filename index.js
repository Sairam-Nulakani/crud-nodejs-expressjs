const express = require("express");
const app = express();
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

///////////MIDDLEWARES/////////////
app.use(morgan("dev"));
app.use(express.json());
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

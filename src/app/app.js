const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");

const authRouter = require("../routes/auth");
const analitycsRouter = require("../routes/analitycs");
const categoryRouter = require("../routes/category");
const orderRouter = require("../routes/order");
const positionRouter = require("../routes/position");

const app = express();

app.use(passport.initialize());
require("../middleware/passport")(passport);
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/analitycs", analitycsRouter);
app.use("/api/category", categoryRouter);
app.use("/api/order", orderRouter);
app.use("/api/position", positionRouter);

module.exports = app;

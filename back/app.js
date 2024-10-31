const express = require("express");
const authRouter = require("./routes/authRoutes");
const listingRouter = require("./routes/listingRoutes");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/listings", listingRouter);

module.exports = app;

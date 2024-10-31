const app = require("./app");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "../config.env" });

const port = process.env.PORT;

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then((con) => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

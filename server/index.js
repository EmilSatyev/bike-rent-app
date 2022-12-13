const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/api/test", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;

const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const {errorHandler,notFound} = require('./middleware/errorMiddleware')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/assets"));

// Middleware


app.get("/api/test", (req, res) => {
  res.send("Hello worlwd");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(port, () => {
      console.log(`App listening ${port}`);
    })
  )
  .catch((err) => console.log("DB error", err));

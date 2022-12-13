const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/api/test", (req, res) => {
  res.send("tests");
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;

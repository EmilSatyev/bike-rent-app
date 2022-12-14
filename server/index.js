const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/assets"));
app.use("/api/", require("./routes/bikes"));
app.use("/api/", require("./routes/orders"));
app.use("/api/", require("./routes/userRoutes"));

app.get("/api/test", (req, res) => {
  res.send("Hello");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server Running on port ${port}`));

mongoose
  .connect(process.env.DB_URI)
  .then(() =>
    app.listen(port, () => {
      console.log(`App listening ${port}`);
    })
  )
  .catch((err) => console.log("DB error", err));

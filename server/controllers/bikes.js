const City = require("../models/сity");

// Получить города
const getCities = async (req, res) => {
  /*try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось города",
    });
    console.warn(err);
  }*/
  res.send("Hello2");
};


module.exports = {
  getCities,
};

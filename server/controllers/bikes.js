const Bike = require("../models/bike");
const City = require("../models/сity");
const BikeType = require("../models/type");
const Brand = require("../models/brand");
const Size = require("../models/size");

// Получить все велосипеды
const getBikes = async (req, res) => {
  try {
    const search = req.query.search || "";

    let city = req.query.city || "moscow";
    const cities = await City.find();
    city = cities.find((c) => c.value === city).id;

    let type = req.query.type || "All";
    const types = await BikeType.find();
    if (type === "All") {
      type = types.map((t) => t.id);
    } else {
      const values = req.query.type.split(",");

      type = types.filter((t) => values.includes(t.value)).map((t) => t.id);
    }

    let size = req.query.size || "All";
    const sizes = await Size.find();
    if (size === "All") {
      size = sizes.map((s) => s.id);
    } else {
      const values = req.query.size.split(",");
      size = sizes.filter((s) => values.includes(s.value)).map((s) => s.id);
    }

    let brand = req.query.brand || "All";
    const brands = await Brand.find();
    if (brand === "All") {
      brand = brands.map((b) => b.id);
    } else {
      const values = req.query.brand.split(",");
      brand = brands.filter((b) => values.includes(b.value)).map((b) => b.id);
    }

    const bikes = await Bike.find({ name: { $regex: search, $options: "i" } })
      .populate("cityIds brandId sizesId typeId")
      .populate({path:"orderIds", populate:'cityId'})
      .where("cityIds").in(city)
      .where("typeId").in(type)
      .where("sizesId").in(size)
      .where("brandId").in(brand)
      .exec();

    res.status(200).json(bikes);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить список велосипедов",
    });
    console.warn(err);
  }
};

// Создать велосипед
const createBike = async (req, res) => {
  const errors = {};
  if (!req.body.name) {
    errors.name = { message: "Пожалуйста, укажите название" };
  }
  if (!req.body.price) {
    errors.price = { message: "Пожалуйста, укажите цену" };
  }
  if (!req.body.brandId) {
    errors.brandId = { message: "Пожалуйста, выберите производителя" };
  }
  if (!req.body.cityIds) {
    errors.cityIds = { message: "Пожалуйста, выберите город" };
  }
  if (!req.body.sizesId) {
    errors.sizesId = { message: "Пожалуйста, выберите размер" };
  }
  if (!req.body.typeId) {
    errors.typeId = { message: "Пожалуйста, выберите тип" };
  }
  if (!req.file) {
    errors.planeImage = { message: "Пожалуйста, добавьте фото велика" };
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).send(errors);
  }
  try {
    const { name, price, brandId, cityIds, sizesId, typeId } = req.body;

    const bike = await Bike.create({
      name,
      price,
      brandId,
      cityIds,
      sizesId,
      typeId,
      bikeImage: `http://localhost:${process.env.PORT}/static/${req.file.filename}`,
    });

    res.status(201).json(bike);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось добавить велосипед",
    });
    console.warn(err);
  }
};

// получить велик
const getSingleBike = async (req, res) => {
  try {
    const bike = await Bike.find({ _id: req.params.id });

    res.status(200).json(bike);
  } catch (err) {
    res.status(400).json({
      message: "Не удалось получить велик",
    });
    console.warn(err);
  }
};

// удалить велик
const removeBike = async (req, res) => {
  try {
    Bike.findOneAndDelete(
      {
        _id: req.params.id,
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: "Не удалось удалить велик",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Статья не найдена",
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить велики",
    });
  }
};

/* */
// Получить города
const getCities = async (req, res) => {
  try {
    const cities = await City.find();

    res.status(200).json(cities);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось города",
    });
    console.warn(err);
  }
};

// Получить типы
const getTypes = async (req, res) => {
  try {
    const types = await BikeType.find();

    res.status(200).json(types);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить типы велосипедов",
    });
    console.warn(err);
  }
};

// Получить производителей
const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();

    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить производителей",
    });
    console.warn(err);
  }
};

// Получить размеры
const getSizes = async (req, res) => {
  try {
    const sizes = await Size.find();

    res.status(200).json(sizes);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить размеры",
    });
    console.warn(err);
  }
};

module.exports = {
  getBikes,
  getSingleBike,
  getCities,
  getTypes,
  getBrands,
  getSizes,
  createBike,
  removeBike,
};

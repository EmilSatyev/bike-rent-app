import axios from "axios";

const getBikes = async (params) => {
  const { cities, types, sizes, brands, search } = params;

  const bikes = await axios.get(
    `api/bikes?city=${cities}&type=${types || ""}&size=${sizes || ""}&brand=${
      brands || ""
    }&search=${search || ""}`
  );
  return bikes.data;
};

const bikesService = {
  getBikes,
};

export default bikesService;

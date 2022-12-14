import axios from "axios";

const createOrder = async (params) => {
  const order = await axios.post("api/orders", params);
  return order.data;
};

const cancelOrder = async (orderId) => {
  const order = await axios.patch("api/orders/cancel", { orderId });
  return order.data;
};

const extendOrder = async (params) => {
  const order = await axios.patch("/api/orders/extend", params);
  return order.data;
};

const orderService = {
  createOrder,
  cancelOrder,
  extendOrder,
};

export default orderService;

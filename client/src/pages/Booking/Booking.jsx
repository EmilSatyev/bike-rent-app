import React from "react";
import Helmet from "../../components/Helmet/Helmet";
import Order from "../../components/Order/Order";
import PersonalInfo from "../../components/Order/PersonalInfo/PersonalInfo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearSelected } from "../../store/order/orderSlice";
import Success from "../../components/Order/Success/Success";

const Booking = () => {
  const { selectedBikes, status } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (status === "error") {
    dispatch(clearSelected());
    alert("Ошибка при добавлении заказа");
    return navigate("/");
  } else if (status === "success") {
    return <Success />;
  }

  return (
    <Helmet title="Оформление заказа">
      {selectedBikes.length ? (
        <>
          <Order />
          <PersonalInfo />
        </>
      ) : (
        <h1>ничего нет</h1>
      )}
    </Helmet>
  );
};

export default Booking;

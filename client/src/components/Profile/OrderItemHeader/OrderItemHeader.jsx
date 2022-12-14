import React from "react";
import styles from "./OrderItemHeader.module.scss";
import OrderStatus from "../../UI/OrderStatus/OrderStatus";
import { formatDate } from "../../../helpers/dateFunctions";

const OrderItemHeader = ({ _id, dateStart, totalPrice, isPayed, status }) => {
  const id = _id.replace(/\D/g, "").slice(-6);
  const date = formatDate(dateStart);

  return (
    <div className={styles.root}>
      <div>Заказ № {id}</div>
      <div>{date}</div>
      <div>{totalPrice} ₽</div>
      <div>{isPayed ? "Оплачен" : "Не оплачен"}</div>
      <OrderStatus status={status} />
    </div>
  );
};

export default OrderItemHeader;

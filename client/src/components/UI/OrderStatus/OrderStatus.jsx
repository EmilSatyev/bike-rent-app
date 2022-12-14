import React, { useRef } from "react";
import styles from "./OrderStatus.module.scss";
import cnBind from "classnames/bind";

const cx = cnBind.bind(styles);

const OrderStatus = ({ status }) => {
  const statusTextRef = useRef("");
  if (status === "processing") {
    statusTextRef.current = "в обработке";
  } else if (status === "delivering") {
    statusTextRef.current = "доставляется";
  } else if (status === "working") {
    statusTextRef.current = "в работе";
  } else if (status === "completed") {
    statusTextRef.current = "завершен";
  } else if (status === "canceled") {
    statusTextRef.current = "отменен";
  }

  return (
    <div className={cx(styles.root, styles[`root--${status}`])}>
      {statusTextRef.current}
    </div>
  );
};

export default OrderStatus;

import React from "react";
import styles from "./Order.module.scss";
import cnBind from "classnames/bind";
import OrderList from "./OrderList/OrderList";
import OrderHeader from "./OrderHeader/OrderHeader";

const cx = cnBind.bind(styles);

const Order = () => {

  return (
    <section className={styles.root}>
      <div className={cx("container")}>
        <OrderHeader title="Заявка на аренду велосипедов" />
        <OrderList />
      </div>
    </section>
  );
};

export default Order;

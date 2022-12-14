import React from "react";
import styles from "./OrderItem.module.scss";
import cnBind from "classnames/bind";

const cx = cnBind.bind(styles);

const OrderItem = ({ customClass, name, bikeImage, price, days }) => {
  return (
    <div className={cx(customClass, styles.root)}>
      <div className={styles.root__image}>
        <img src={bikeImage} alt={name} />
      </div>
      <div className={styles.root__name}>{name}</div>
      <div className={styles.root__price}>{days}</div>
      <div className={styles.root__price}>{price} ₽</div>
    </div>
  );
};

export default OrderItem;

import React from "react";
import styles from "./BookDrawer.module.scss";
import cnBind from "classnames/bind";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const cx = cnBind.bind(styles);

const BookDrawer = ({ isDrawerOpen }) => {
  const { selectedBikes } = useSelector((state) => state.orders);

  return (
    <div
      className={cx(styles.root, {
        bookDrawerOpen: selectedBikes.length && isDrawerOpen,
      })}
    >
      <div className={cx("container", styles.root__container)}>
        <span className={styles.root__info}>
          Количество велосипедов: <span>{selectedBikes.length}</span>
        </span>
        <Link to="booking" className={cx("btn", styles.root__btn)}>
          Забронировать
        </Link>
      </div>
    </div>
  );
};

export default BookDrawer;

import React, { useEffect } from "react";
import styles from "./Success.module.scss";
import cnBind from "classnames/bind";
import OrderHeader from "../OrderHeader/OrderHeader";
import OrderList from "../OrderList/OrderList";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../../../store/services/userService";

const cx = cnBind.bind(styles);

const Success = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <section className={styles.root}>
      <div className="container">
        <OrderHeader title="Ваш заказ успешно оформлен" />
        <OrderList />
        <div className={styles.root__btns}>
          <Link className={cx("btn")} to="/user-profile">
            В личный кабинет
          </Link>
          <Link className={cx("btn", "btn--outlined")} to="/">
            Назад на главную
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Success;

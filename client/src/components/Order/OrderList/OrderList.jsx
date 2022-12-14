import React from "react";
import styles from "./OrderList.module.scss";
import { useSelector } from "react-redux";
import OrderItem from "../OrderItem/OrderItem";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";

const OrderList = () => {
  const { selectedBikes, totalPrice, status, days } = useSelector(
    (state) => state.orders
  );

  return (
    <>
      <SimpleBar style={{ maxHeight: "1000px" }}>
        <div className={styles.root}>
          <div className={styles.root__flex}>
            <div></div>
            <div>Название велосипедов</div>
            <div>Количество дней</div>
            <div>Стоимость</div>
          </div>
          {selectedBikes.map((bike) => (
            <OrderItem
              key={bike._id}
              customClass={styles.root__flex}
              {...bike}
              days={days}
            />
          ))}
        </div>
      </SimpleBar>
      <div className={styles.root__footer}>
        {status !== "success" && (
          <Link to="/" className={styles.root__btn}>
            <svg
              width="228"
              height="56"
              viewBox="0 0 228 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.5637 3.48865C31.2545 2.12108 33.3633 1.375 35.5379 1.375H218C223.247 1.375 227.5 5.62829 227.5 10.875V45.875C227.5 51.1217 223.247 55.375 218 55.375H35.5379C33.3633 55.375 31.2545 54.6289 29.5637 53.2614L3.12087 31.8738C0.894086 30.0727 0.894083 26.6773 3.12087 24.8762L29.5637 3.48865Z"
                stroke="#297FFF"
              />
            </svg>

            <span>Назад к выбору велосипедов</span>
          </Link>
        )}

        <div className={styles.root__total}>
          <span>Итого</span>
          <span>{totalPrice} ₽</span>
        </div>
      </div>
    </>
  );
};
export default OrderList;

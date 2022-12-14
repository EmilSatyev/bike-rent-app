import React, { useState } from "react";
import styles from "./OrderItemBody.module.scss";
import cnBind from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder } from "../../../store/order/orderSlice";
import { setCancelStatus } from "../../../store/user/userSlice";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { SvgSelector } from "../../../helpers/svgSelector";
import { formatDate } from "../../../helpers/dateFunctions";

const cx = cnBind.bind(styles);

const OrderItemBody = ({
  _id,
  bikesId,
  totalPrice,
  days,
  dateStart,
  dateEnd,
  status,
}) => {
  const { isLoading, error } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!bikesId) {
    return <span>В заказе нет велосипедов. Ошибка</span>;
  }
  const startDate = formatDate(dateStart);
  const endDate = formatDate(dateEnd);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    await dispatch(cancelOrder(_id));
    if (error) {
      alert(error);
    } else {
      dispatch(setCancelStatus(_id));
    }
  };

  return (
    <>
      <Modal
        className="modal-custom"
        onCancel={handleCancel}
        open={isModalOpen}
        footer={null}
        closeIcon={<SvgSelector name="cross" />}
      >
        <p className="confirm-text">
          Вы уверены, что хотите отменить заказ? Это действие нельзя будет
          отменить.
        </p>
        <button className={cx("btn", "confirm-btn")} onClick={handleOk}>
          Отменить заказ
        </button>
        <button className={cx("btn", "btn--outlined")} onClick={handleCancel}>
          Оставить все как есть
        </button>
      </Modal>
      <div className={styles.root}>
        <div className={styles.root__table}>
          <div className={styles.root__row}>
            <div>Велосипеды</div>
            <div>Цена</div>
            <div>Количество дней</div>
            <div>Сумма</div>
          </div>
          {bikesId.length &&
            bikesId.map((bike) => (
              <div key={bike._id} className={styles.root__row}>
                <div>{bike.name}</div>
                <div>{bike.price}</div>
                <div>{days}</div>
                <div>{bike.price * days} ₽</div>
              </div>
            ))}
        </div>
        <div className={styles.root__total}>
          <div>Итого</div>
          <div>{totalPrice} ₽</div>
        </div>
        <div className={styles.root__bottom}>
          <div className={styles.root__info}>
            <p>
              Период аренды: {startDate} 12:00 – {endDate} 12:00
            </p>
            <p>Адрес доставки: Самовывоз</p>
          </div>
          {status !== "canceled" && status !== "completed" ? (
            <div className={styles.root__btns}>
              <button
                className={cx("btn", "btn--outlined", "btn--fixedWidth", {
                  "btn--disabled": isLoading,
                })}
                onClick={() => setIsModalOpen(true)}
              >
                Отменить заказ
              </button>
              <Link
                to={`/extend-order/${_id}`}
                className={cx("btn", "btn--fixedWidth")}
              >
                Продлить аренду
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default OrderItemBody;

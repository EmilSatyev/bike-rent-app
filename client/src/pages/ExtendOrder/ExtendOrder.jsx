import React, { useRef, useState } from "react";
import styles from "./ExtendOrder.module.scss";
import cnBind from "classnames/bind";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SvgSelector } from "../../helpers/svgSelector";
import { Button, ConfigProvider, DatePicker, Form } from "antd";
import locale from "antd/es/locale/ru_RU";
import moment from "moment/moment";
import { extendOrder } from "../../store/order/orderSlice";
import { getDaysBetweenDates } from "../../helpers/dateFunctions";
import { getUserDetails } from "../../store/services/userService";

const { RangePicker } = DatePicker;
const cx = cnBind.bind(styles);

const ExtendOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.users);
  const { error } = useSelector((state) => state.orders);
  const { id } = useParams();
  const order = userInfo.orderIds.find((order) => order._id === id);
  const extendDateRef = useRef(order.dateEnd);
  const newTotalDaysRef = useRef(0);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [addPrice, setAddPrice] = useState(0);

  const handleChange = (params) => {
    extendDateRef.current = params[1]._d.toISOString();
    setIsBtnDisabled(extendDateRef.current === order.dateEnd);

    newTotalDaysRef.current = getDaysBetweenDates(
      extendDateRef.current,
      order.dateStart
    );
    setAddPrice(
      ((newTotalDaysRef.current - order.days) * order.totalPrice) / order.days
    );
  };
  const onFinish = async () => {
    const params = {
      id,
      extendDate: extendDateRef.current,
      days: newTotalDaysRef.current,
      totalPrice: newTotalDaysRef.current * (order.totalPrice / order.days),
    };
    await dispatch(extendOrder(params));
    if (error) {
      alert(error);
    } else {
      await dispatch(getUserDetails());
      navigate("/user-profile", { state: { tabId: 1, orderId: id } });
    }
  };
  const getBikeNextOrderDate = () => {
    const nextOrdersTimestamps = order.bikesId.reduce(
      (arr, next) =>
        arr.concat(
          next.orderIds.reduce((arr, next) => {
            if (
              order.dateEnd < next.dateStart &&
              order.cityId === next.cityId &&
              next.status !== "canceled" &&
              next.status !== "completed"
            ) {
              return arr.concat(new Date(next.dateStart).getTime());
            }
            return arr;
          }, [])
        ),
      []
    );
    return nextOrdersTimestamps.length
      ? Math.min(...nextOrdersTimestamps)
      : Infinity;
  };
  const disabledDate = (current) => {
    return (
      (current && current < moment(order.dateEnd).startOf("day")) ||
      current > moment(getBikeNextOrderDate()).startOf("day")
    );
  };

  return (
    <section className={styles.root}>
      <div className={cx("container")}>
        <h1 className={cx("title", "title--h1", styles.root__title)}>
          Продление аренды
        </h1>
        <Form
          name="extend-order"
          fields={[
            {
              name: ["date"],
              value: [moment(order.dateStart), moment(extendDateRef.current)],
            },
          ]}
          onFinish={onFinish}
          className={styles.root__form}
        >
          <ConfigProvider locale={locale}>
            <Form.Item
              name="date"
              className="label-custom datepicker-custom"
              label="Дата аренды"
            >
              <RangePicker
                allowClear={false}
                separator={<SvgSelector name="separator" />}
                suffixIcon={false}
                className="picker-custom"
                format={"DD.MM.YY"}
                disabled={[true, false]}
                onChange={handleChange}
                disabledDate={disabledDate}
              />
            </Form.Item>
          </ConfigProvider>
          <div className={styles.root__addPayment}>
            <p className={styles.root__label}>Сумма доплаты:</p>
            <p className={styles.root__price}>{addPrice} ₽</p>
          </div>
          <Button
            className={cx("btn", { "btn--disabled": isBtnDisabled })}
            htmlType="submit"
          >
            Продлить
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default ExtendOrder;

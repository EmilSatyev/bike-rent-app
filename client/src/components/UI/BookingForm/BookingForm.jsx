import React, { useEffect } from "react";
import styles from "./BookingForm.module.scss";
import DateRange from "../DateRange/DateRange";
import cnBind from "classnames/bind";
import SelectSmth from "../SelectSmth/SelectSmth";
import { Form, Button } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getBikes } from "../../../store/bikes/bikeSlice";
import { clearSelected } from "../../../store/order/orderSlice";

const cx = cnBind.bind(styles);

const BookingForm = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const { isShow } = useSelector((state) => state.bikes);

  const onFinish = () => {
    dispatch(clearSelected());
    dispatch(getBikes(filters));
  };
  useEffect(() => {
    if (isShow) {
      dispatch(getBikes(filters));
    }
  }, [filters, dispatch, isShow]);

  return (
    <Form
      name="hero"
      fields={[
        {
          name: ["date"],
          value: [moment(filters.dateStart), moment(filters.dateEnd)],
        },
      ]}
      onFinish={onFinish}
      className={styles.root}
    >
      <DateRange />
      <SelectSmth name="cities" />
      <Button className={cx("btn")} htmlType="submit">
        Найти
      </Button>
    </Form>
  );
};

export default BookingForm;

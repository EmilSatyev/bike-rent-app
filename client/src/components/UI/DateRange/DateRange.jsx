import { DatePicker, ConfigProvider, Form } from "antd";
import React from "react";
import moment from "moment";
import "moment/locale/ru";
import locale from "antd/es/locale/ru_RU";
import "./DateRange.scss";
import { SvgSelector } from "../../../helpers/svgSelector";
import { setType } from "../../../store/filter/filterSlice";
import { useDispatch } from "react-redux";
import { clearSelected } from "../../../store/order/orderSlice";

const { RangePicker } = DatePicker;

const DateRange = () => {
  const dispatch = useDispatch();
  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  const handleChange = async (params) => {
    dispatch(clearSelected());

    const fields = {
      dateStart: params[0]._d.getTime(),
      dateEnd: params[1]._d.getTime(),
    };
    dispatch(setType({ name: "dateStart", value: fields.dateStart }));
    dispatch(setType({ name: "dateEnd", value: fields.dateEnd }));
    // await axios.post("api/orders", fields);
  };

  return (
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
          disabledDate={disabledDate}
          format={"DD.MM.YY"}
          onChange={handleChange}
        />
      </Form.Item>
    </ConfigProvider>
  );
};

export default DateRange;

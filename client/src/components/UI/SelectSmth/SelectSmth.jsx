import React, { useEffect, useRef, useState } from "react";
import { Select, Form } from "antd";
import "./SelectBikeType.scss";
import { SvgSelector } from "../../../helpers/svgSelector";
import axios from "axios";
import { setType } from "../../../store/filter/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearSelected } from "../../../store/order/orderSlice";

const SelectSmth = ({ name }) => {
  const form = Form.useFormInstance();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const selectRefObj = useRef();

  if (name === "cities") {
    selectRefObj.current = {
      label: "Город доставки",
      defaultValue: filters.cities || "moscow",
    };
  } else if (name === "types") {
    selectRefObj.current = {
      label: "Тип велосипеда",
    };
  } else if (name === "sizes") {
    selectRefObj.current = {
      label: "Размер велосипеда",
    };
  } else if (name === "brands") {
    selectRefObj.current = {
      label: "Производитель",
    };
  }

  const [selectData, setSelectData] = useState(selectRefObj.current);

  useEffect(() => {
    axios
      .get(`api/${name}`)
      .then(({ data }) => {
        setSelectData({
          ...selectData,
          name: name,
          options: data,
        });
        form.setFieldValue(name, selectData.defaultValue);
      })
      .catch((err) => console.log("ошибка при получении списка фильтров", err));
  }, [setSelectData]);

  const handleChange = (value) => {
    if (name === "cities") {
      dispatch(clearSelected());
    }
    const obj = { name, value };
    dispatch(setType(obj));
  };

  return (
    <Form.Item
      className="label-custom"
      name={selectData.name}
      label={selectData.label}
    >
      <Select
        placeholder="Все"
        allowClear={name !== "cities"}
        name={selectData.name}
        suffixIcon={<SvgSelector name="chevron" />}
        className="custom-select"
        onChange={handleChange}
        options={selectData.options}
      />
    </Form.Item>
  );
};

export default SelectSmth;

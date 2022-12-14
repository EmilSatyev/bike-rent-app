import React from "react";
import styles from "./Filter.module.scss";
import cnBind from "classnames/bind";
import SelectSmth from "../SelectSmth/SelectSmth";
import { Form } from "antd";
import SearchInput from "../SearchInput/SearchInput";

const cx = cnBind.bind(styles);

const Filter = ({ customClass }) => {
  return (
    <Form className={cx(styles.root, customClass)}>
      <SelectSmth name="types" />
      <SelectSmth name="sizes" />
      <SelectSmth name="brands" />
      <SearchInput />
    </Form>
  );
};

export default Filter;

import React from "react";
import "./SearchInput.scss";
import { Input } from "antd";
import { SvgSelector } from "../../../helpers/svgSelector";
import { setType } from "../../../store/filter/filterSlice";
import { useDispatch } from "react-redux";

const { Search } = Input;

const SearchInput = () => {
  const dispatch = useDispatch();

  const onSearch = (value) => {
    const obj = { name: "search", value };
    dispatch(setType(obj));
  };

  return (
    <Search
      className="search-custom"
      placeholder="Найти велосипед..."
      onSearch={onSearch}
      enterButton={<SvgSelector name="search" />}
    />
  );
};

export default SearchInput;

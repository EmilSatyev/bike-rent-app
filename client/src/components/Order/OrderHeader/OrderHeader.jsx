import React, { useEffect, useState } from "react";
import styles from "./OrderHeader.module.scss";
import cnBind from "classnames/bind";
import { useSelector } from "react-redux";
import axios from "axios";
import { formatDate } from "../../../helpers/dateFunctions";

const cx = cnBind.bind(styles);

const OrderHeader = ({ title }) => {
  const { dateStart, dateEnd, cities } = useSelector((state) => state.filters);

  const startDate = formatDate(dateStart);
  const endDate = formatDate(dateEnd);
  const [cityLabel, setCityLabel] = useState("");

  useEffect(() => {
    axios
      .get(`api/cities`)
      .then(({ data }) => {
        setCityLabel(data.find((c) => c.value === cities).label);
      })
      .catch((err) => console.log("ошибка при получении списка городов", err));
  }, [cities, setCityLabel]);

  return (
    <>
      <h1 className={cx("title", "title--h1", styles.root__title)}>{title}</h1>
      <div className={styles.root__header}>
        <div>
          <span>Дата начала</span>
          <span>{startDate}</span>
        </div>
        <div>
          <span>Дата конца</span>
          <span>{endDate}</span>
        </div>
        <div>
          <span>Доставка</span>
          <span>{cityLabel}</span>
        </div>
      </div>
    </>
  );
};

export default OrderHeader;

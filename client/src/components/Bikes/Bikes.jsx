import React from "react";
import styles from "./Bikes.module.scss";
import cnBind from "classnames/bind";
import BikeCard from "../UI/BikeCard/BikeCard";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";

const cx = cnBind.bind(styles);

const Bikes = () => {
  const { bikes, isLoading } = useSelector((state) => state.bikes);

  return (
    <div className={styles.root}>
      {isLoading ? (
        [...Array(4)].map((_,i) => (
          <Skeleton.Input key={i} active block className={cx("skeleton-custom")} />
        ))
      ) : bikes.length ? (
        bikes.map((bike) => <BikeCard key={bike._id} data={bike} />)
      ) : (
        <h1>Ничего нет</h1>
      )}
    </div>
  );
};

export default Bikes;

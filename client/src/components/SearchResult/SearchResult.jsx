import React from "react";
import styles from "./SearchResult.module.scss";
import cnBind from "classnames/bind";
import { useSelector } from "react-redux";
import Filter from "../UI/Filter/Filter";
import SizesTable from "../UI/SizesTable/SizesTable";
import Bikes from "../Bikes/Bikes";

const cx = cnBind.bind(styles);

const SearchResult = () => {
  const { isShow } = useSelector((state) => state.bikes);

  return (
    <section className={styles.root}>
      {isShow && (
        <div className={cx(styles.root__container, "appendix", "container")}>
          <Filter customClass={styles.root__filter} />
          <SizesTable />
          <Bikes />
        </div>
      )}
    </section>
  );
};

export default SearchResult;

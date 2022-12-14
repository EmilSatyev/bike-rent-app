import React from "react";
import styles from "./ModalBike.module.scss";
import cnBind from "classnames/bind";
import Slider from "../../Slider/Slider";

const cx = cnBind.bind(styles);

const ModalBike = ({ name, sizesId, typeId, bikeImage }) => {
  return (
    <div className={styles.root}>
      <div className={styles.root__left}>
        <Slider bikeImage={bikeImage} />
      </div>
      <div>
        <h2 className={cx(styles.root__title, "title", "title--h2")}>{name}</h2>
        <table className={styles.root__table}>
          <tbody>
            <tr>
              <th>Размер</th>
              <td>{sizesId.label}</td>
            </tr>
            <tr>
              <th>Тип</th>
              <td>{typeId.label}</td>
            </tr>
            <tr>
              <th>Материал рамы</th>
              <td>Сталь</td>
            </tr>
            <tr>
              <th>Вес велосипеда</th>
              <td>15.9 kg / 33 lb</td>
            </tr>
            <tr>
              <th>Диаметр колес</th>
              <td>28”</td>
            </tr>
            <tr>
              <th>Кол-во скоростей</th>
              <td>7</td>
            </tr>
            <tr>
              <th>Амортизация</th>
              <td>Отсутствует</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModalBike;

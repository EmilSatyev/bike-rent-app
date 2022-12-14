import React from "react";
import styles from "./Hero.module.scss";
import cnBind from "classnames/bind";
import { SvgSelector } from "../../helpers/svgSelector";
import BookingForm from "../UI/BookingForm/BookingForm";

const cx = cnBind.bind(styles);

const Hero = () => {
  return (
    <section className={styles.root}>
      <div className={cx("container",styles.root__container)}>
        <h1 className={cx("title", "title--h1", styles.root__title)}>
          Аренда велосипедов c&nbsp;доставкой
        </h1>
        <ul className={styles.root__list}>
          <li className={styles.root__item}>
            <SvgSelector name="hero-bg" />
            <div className={styles.root__info}>
              <span className={styles.root__name}>Шлем</span>
              <span className={styles.root__free}>Бесплатно</span>
            </div>
          </li>
          <li className={styles.root__item}>
            <SvgSelector name="hero-bg" />
            <div className={styles.root__info}>
              <span className={styles.root__name}>Фонарик</span>
              <span className={styles.root__free}>Бесплатно</span>
            </div>
          </li>
          <li className={styles.root__item}>
            <SvgSelector name="hero-bg" />
            <div className={styles.root__info}>
              <span className={styles.root__name}>Замок</span>
              <span className={styles.root__free}>Бесплатно</span>
            </div>
          </li>
        </ul>
        <BookingForm />
      </div>
    </section>
  );
};

export default Hero;

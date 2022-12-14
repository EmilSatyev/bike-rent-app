import React, { useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import BookDrawer from "../UI/BookDrawer/BookDrawer";
import cnBind from "classnames/bind";
import { SvgSelector } from "../../helpers/svgSelector";

const cx = cnBind.bind(styles);

const Footer = () => {
  const location = useLocation();
  const { selectedBikes } = useSelector((state) => state.orders);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useEffect(() => {
    if (
      (location.pathname === "/" || location.pathname === "/home") &&
      selectedBikes.length
    ) {
      setIsDrawerOpen(true);
    } else {
      setIsDrawerOpen(false);
    }
  }, [selectedBikes, location]);

  return (
    <>
      <footer className={cx(styles.root, { moveFooter: isDrawerOpen })}>
        <div className={cx(styles.root__container, "container")}>
          <div className={styles.root__top}>
            <h4 className={cx("title", styles.root__title)}>
              Аренда велосипедов
            </h4>
            <ul className={styles.root__list}>
              <li className={styles.root__item}>
                <Link to="about">О нас</Link>
              </li>
              <li className={styles.root__item}>
                <Link to="rent">Аренда</Link>
              </li>
              <li className={styles.root__item}>
                <Link to="where">Где кататься</Link>
              </li>
              <li className={styles.root__item}>
                <Link to="contacts">Контакты</Link>
              </li>
            </ul>
          </div>
          <div className={styles.root__bottom}>
            <span className={styles.root__copyright}>© BikePark, 2022</span>
            <a href="/">Политика конфиденциальности</a>
            <ul className={styles.root__social}>
              <li>
                <a href="https://facebook.com">
                  <SvgSelector name="fb" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com">
                  <SvgSelector name="insta" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <BookDrawer isDrawerOpen={isDrawerOpen} />
    </>
  );
};

export default Footer;

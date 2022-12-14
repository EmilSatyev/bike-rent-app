import React  from "react";
import styles from "./Nav.module.scss";
import cnBind from "classnames/bind";
import { NavLink } from "react-router-dom";

const cx = cnBind.bind(styles);

const pages = [
  {
    id: 1,
    title: "О нас",
    url: "about",
  },
  {
    id: 2,
    title: "Аренда",
    url: "rent",
  },
  {
    id: 3,
    title: "Где кататься",
    url: "where",
  },
  {
    id: 4,
    title: "Контакты",
    url: "contacts",
  },
];

const Nav = ({ customClass }) => {
  return (
    <nav className={cx(styles.root, customClass)}>
      <ul className={styles.root__list}>
        {pages.map((page) => (
          <li className={cx(styles.root__item)} key={page.id}>
            <NavLink to={page.url}>{page.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;

import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import cnBind from "classnames/bind";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import UserBtn from "../UI/UserBtn/UserBtn";
import { SvgSelector } from "../../helpers/svgSelector";
import { Drawer } from "antd";
import { useLocation } from "react-router-dom";

const cx = cnBind.bind(styles);

const Header = () => {
  const [open, setOpen] = useState(false);
  let location = useLocation();

  const showDrawer = () => {
    setOpen(!open);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className={styles.root}>
      <div className={cx("container", styles.root__container)}>
        <div className={styles.root__logoNavWrap}>
          <Logo customClass={styles.root__logo} />
          <Nav customClass={styles.root__nav} />
        </div>
        <a className={styles.root__phone} href="tel:88005553535">
          8 (800) 555-35-35
        </a>
        <UserBtn customClass={styles.root__user} />
        <Drawer
          height={false}
          className="custom-drawer"
          placement="top"
          closable={false}
          onClose={onClose}
          open={open}
        >
          <Nav customClass={styles.root__drawerNav} />
          <UserBtn mode="drawer" />
        </Drawer>
        <button onClick={showDrawer} className={styles.root__burger}>
          {open ? <SvgSelector name="cross" /> : <SvgSelector name="burger" />}
        </button>
      </div>
    </header>
  );
};

export default Header;

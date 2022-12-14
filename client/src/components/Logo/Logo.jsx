import React from 'react';
import styles from './Logo.module.scss'
import logo from '../../assets/images/logo.svg'
import cnBind from "classnames/bind";
import {Link} from "react-router-dom";

const cx = cnBind.bind(styles);

const Logo = ({customClass}) => {
  return (
    <Link to="/" className={cx(styles.root, customClass)}>
      <img src={logo} alt='Logo'/>
      <span>BikePark</span>
    </Link>
  );
};

export default Logo;

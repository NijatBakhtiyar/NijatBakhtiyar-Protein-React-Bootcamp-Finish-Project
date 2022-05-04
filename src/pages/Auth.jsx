import React from "react";
import { Link } from "react-router-dom";

import LoginImg from "../images/Png/Login.png";
import Logo from "../images/Png/Logo.png";
import styles from "./Auth.module.scss";

function Auth({ children }) {
  return (
    <div className={styles.auth}>
      <div className={styles.left}>
        <img src={LoginImg} alt="login" />
      </div>
      <div className={styles.right}>
        <Link to='/' className={styles.logo}>
          <img src={Logo} alt="logo" />
        </Link>
        {children}
      </div>
    </div>
  );
}

export default Auth;

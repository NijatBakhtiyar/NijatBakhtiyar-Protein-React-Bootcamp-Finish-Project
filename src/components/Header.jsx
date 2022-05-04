import React from "react";
import { Link } from "react-router-dom";

import { useUser } from "../context/UserContext";
import Logo from "../images/Png/Logo.png";
import AddIcon from "../images/Svg/AddIcon";
import LoginIcon from "../images/Svg/LoginIcon";
import styles from "./Header.module.scss";

function Header() {
  const { user, isLoading } = useUser();

  return (
    <div className={styles.header}>
      <div className="container-md">
        <div className={styles.row}>
          <Link to="/" className={styles.left}>
            <img src={Logo} alt="logo" />
          </Link>
          <div className={styles.right}>


            {isLoading ? "" : (user ?
              <>
                <Link to="/add" className={styles.addIcon}>
                  <AddIcon />
                  <span>Ürün Ekle</span>
                </Link>
                <Link to="/account">
                  <LoginIcon />
                  <span>Hesabım</span>
                </Link>
              </> : <Link to="/login">
                <LoginIcon />
                <span>Giriş Yap</span>
              </Link>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

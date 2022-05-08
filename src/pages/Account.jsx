import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import GivenOffers from "../components/GivenOffers";
import ReceivedOffers from "../components/ReceivedOffers";
import UserLayout from "../components/UserLayout";
import { useUser } from "../context/UserContext";
import UserIcon from "../images/Svg/UserIcon";
import styles from "./Account.module.scss";

function Account() {
  const [active, setActive] = useState("getoffer");
  const { user } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  return (
    <UserLayout>
      <div className={styles.account}>
        <div className={styles.user}>
          <div className={styles.userInfo}>
            <UserIcon />
            <p>{user?.username}</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
              queryClient.invalidateQueries(["me"]);
            }}
          >
            Logout
          </button>
        </div>
        <div className={styles.offers}>
          <div className={styles.nav}>
            <button
              className={active === "getoffer" ? styles.active : ""}
              onClick={() => setActive("getoffer")}
            >
              Teklif Aldıklarım
            </button>
            <button
              className={active === "giveoffer" ? styles.active : ""}
              onClick={() => setActive("giveoffer")}
            >
              Teklif Verdiklerim
            </button>
          </div>
          <div className={styles.products}>
            {active === "getoffer" ? (
              <>
                <ReceivedOffers />
              </>
            ) : (
              <GivenOffers />
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default Account;

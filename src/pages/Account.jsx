import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import GetOffer from "../components/GetOffer";
import GiveOffer from "../components/GiveOffer";
import UserLayout from "../components/UserLayout";
import { useUser } from "../context/UserContext";
import { Service } from "../data/service";
import UserIcon from "../images/Svg/UserIcon";
import styles from "./Account.module.scss";

function Account() {
  const offerQuery = useQuery(["getOffers"], Service.getOffers);
  const { user, refetch } = useUser();
  const navigate = useNavigate();
  const receivedOffers = offerQuery.data?.filter(
    (offer) => offer.product?.users_permissions_user === user?.id
  );
  const givenOffers = offerQuery.data?.filter(
    (offer) => offer.users_permissions_user?.id === user?.id
  );

  const [active, setActive] = useState("getoffer");

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
              refetch();
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
                <GetOffer receivedOffers={receivedOffers} />
              </>
            ) : (
              <GiveOffer givenOffers={givenOffers} />
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default Account;

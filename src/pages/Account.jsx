import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import GivenOffers from "../components/GivenOffers";
import ReceivedOffers from "../components/ReceivedOffers";
import UserLayout from "../components/UserLayout";
import { useUser } from "../context/UserContext";
import { Service } from "../data/service";
import UserIcon from "../images/Svg/UserIcon";
import styles from "./Account.module.scss";

function Account() {

  // const receivedOffersQuery = useQuery(["getReceivedOffers"], Service.getReceivedOffers);
  const { user } = useUser();
  const navigate = useNavigate();

  // const offerQuery = useQuery(["getOffers"], Service.getOffers);
  const queryClient = useQueryClient();

  const receivedOffersQuery = useQuery(["getReceivedOffers"], Service.getReceivedOffers);

  const givenOffersQuery = useQuery(["getGivenOffers"], Service.getGivenOffers);


  const [active, setActive] = useState("getoffer");

  // console.log(receivedOffersQuery);

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
                <ReceivedOffers receivedOffersQuery={receivedOffersQuery} />
              </>
            ) : (
              <GivenOffers givenOffersQuery={givenOffersQuery} />
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default Account;

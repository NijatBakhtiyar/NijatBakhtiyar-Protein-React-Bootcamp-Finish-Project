import React from "react";
import { ToastContainer } from "react-toastify";

import { API } from "../data/service";
import styles from "../pages/Account.module.scss";
import BuyProductModal from "./BuyProductModal";

function GetOffer({ receivedOffers }) {
  return (
    <>
      {receivedOffers?.length ? (
        receivedOffers?.map((offer) => {
          return (
            <div className={styles.card} key={offer.id}>
              <div className={styles.left}>
                <img
                  src={`${API}${offer.product?.image.url}`}
                  alt={offer.product?.name}
                />
              </div>
              <div className={styles.right}>
                <div className={styles.info}>
                  <p>{offer.product?.name}</p>
                  <span>
                    Alınan Teklif:{" "}
                    <span className={styles.price}>{offer.offerPrice} TL</span>
                  </span>
                </div>
                <div className={styles.btns}>
                  {offer.product?.isSold ? (
                    <p className={styles.accept}>Onaylandı</p>
                  ) : (
                    <BuyProductModal product={offer.product} />
                  )}
                </div>
              </div>
              <ToastContainer
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                autoClose={false}
              />
            </div>
          );
        })
      ) : (
        <p className={styles.notFound}>Teklif Yoktur</p>
      )}
    </>
  );
}

export default GetOffer;

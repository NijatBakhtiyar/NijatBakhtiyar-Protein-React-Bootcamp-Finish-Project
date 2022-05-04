import React from "react";
import { ToastContainer } from "react-toastify";

import { API } from "../data/service";
import NoImage from "../images/Png/NoImage.jpg";
import styles from "../pages/Account.module.scss";
import BuyProductModal from "./BuyProductModal";

function GiveOffer({ givenOffers }) {
  return (
    <>
      {givenOffers?.map((offer) => {
        return (
          <div className={styles.card} key={offer.id}>
            <div className={styles.left}>
              <img
                src={offer.product?.image?.url ? `${API}${offer.product.image.url}` : NoImage}
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
              autoClose={2000}
            />
          </div>
        );
      })}
    </>
  );
}

export default GiveOffer;

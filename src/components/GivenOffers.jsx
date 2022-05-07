import React from "react";
import { ToastContainer } from "react-toastify";

import SkeletonLoader from "../constants/SkeletonLoader";
import { API } from "../data/service";
import NoImage from "../images/Png/NoImage.jpg";
import styles from "../pages/Account.module.scss";
import BuyProductModal from "./BuyProductModal";

function GivenOffers({ givenOffersQuery }) {
  return (
    <>
      {givenOffersQuery.isLoading ? <SkeletonLoader style="detail" /> : givenOffersQuery.data?.map((offer) => (
        <div className={styles.card} key={offer.id}>
          <ToastContainer
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            autoClose={2000}
          />
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
            {/* <div className={styles.btns}>
          {
            submitOffer === "accept" ?
              <>
                <BuyProductModal setBought={setBought} />
                <p className={styles.accept}>Onaylandı</p>
              </> :
              submitOffer === "reject" ?
                <p className={styles.reject}>Reddedildi</p> :
                <p className={styles.bought}>Satın Alındı</p>
          }
        </div> */}
              {/* {offer.product?.isSold ? (
                <p className={styles.accept}>Onaylandı</p>
              ) : (
                <BuyProductModal product={offer.product} />
              )} */}
            </div>
          </div>

        </div>
      )
      )}
    </>
  );
}

export default GivenOffers;

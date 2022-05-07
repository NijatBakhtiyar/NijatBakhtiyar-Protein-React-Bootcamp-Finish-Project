import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ToastContainer } from "react-toastify";

import SkeletonLoader from "../constants/SkeletonLoader";
import { API, Service } from "../data/service";
import LoadingIcon from "../images/Svg/LoadingIcon";
import styles from "../pages/Account.module.scss";
import { formatPrice } from "../utils/formatPrice";

function ReceivedOffers({ receivedOffersQuery }) {
  const [active, setActive] = useState("");
  const offeredItems = receivedOffersQuery.data?.filter(offer => offer.offers.length);
  const queryClient = useQueryClient();
  const updateOfferMutation = useMutation(Service.updateOffers, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getReceivedOffers"]);
    },
  });

  function acceptOffer(id) {
    updateOfferMutation.mutate({ id, offer: true });
    setActive("onayla")
  }

  function rejectOffer(id) {
    updateOfferMutation.mutate({ id, offer: false });
    setActive("reddet")
  }

  return (
    receivedOffersQuery.isLoading ? <SkeletonLoader style="detail" /> :
      <>
        {offeredItems?.length ? (
          offeredItems?.map((offer) => {
            return <div className={styles.card} key={offer.id}>
              <div className={styles.left}>
                <img
                  src={`${API}${offer.image?.url}`}
                  alt={offer.name}
                />
              </div>
              <div className={styles.right}>
                <div className={styles.info}>
                  <p>{offer.name}</p>
                  <span>
                    Alınan Teklif:{" "}
                    <span className={styles.price}>{formatPrice(offer.offers[0]?.offerPrice)} TL</span>
                  </span>
                </div>
                <div className={styles.btns}>
                  {offer.offers[0]?.isStatus === null ?
                    <>
                      <button className={styles.acceptBtn} onClick={() => acceptOffer(offer.offers[0]?.id)}> {updateOfferMutation.isLoading && active === "onayla" ? <LoadingIcon /> : "Onayla"}</button>
                      <button className={styles.rejectBtn} onClick={() => rejectOffer(offer.offers[0]?.id)}>{updateOfferMutation.isLoading && active === "reddet" ? <LoadingIcon /> : "Reddet"}</button>
                    </>
                    : offer.offers[0]?.isStatus == true ?
                      <p className={styles.accept}>Onaylandı</p>
                      :
                      <p className={styles.reject}>Reddedildi</p>
                  }


                  {/* {offer.product?.isSold ? (
                  <p className={styles.accept}>Onaylandı</p>
                ) : (
                  <BuyProductModal product={offer.product} />
                )} */}
                </div>
              </div>
              <ToastContainer
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                autoClose={false}
              />
            </div>
          }
          )
        ) : (
          <p className={styles.notFound}>Teklif Yoktur</p>
        )}
      </>
  );
}

export default ReceivedOffers;

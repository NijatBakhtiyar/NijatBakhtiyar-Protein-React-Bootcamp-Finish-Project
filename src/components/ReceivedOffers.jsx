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

  console.log("aldiklarim", offeredItems)

  function acceptOffer(id) {
    updateOfferMutation.mutate({ id, offer: true });
    setActive(`onayla${id}`)
  }

  function rejectOffer(id) {
    updateOfferMutation.mutate({ id, offer: false });
    setActive(`reddet${id}`)
  }

  return (
    receivedOffersQuery.isLoading ? <SkeletonLoader style="detail" /> :
      <>
        {offeredItems?.length ? (
          offeredItems?.map((offer) => (
            <div key={offer.id}>
              {offer.offers?.map(item => {
                return <div className={styles.card} key={item.id}>
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
                        <span className={styles.price}>{formatPrice(item?.offerPrice)} TL</span>
                      </span>
                    </div>
                    <div className={styles.btns}>
                      {item?.isStatus === null ?
                        <>
                          <button className={styles.acceptBtn} onClick={() => acceptOffer(item?.id)}> {updateOfferMutation.isLoading && active === `onayla${item.id}` ? <LoadingIcon /> : "Onayla"}</button>
                          <button className={styles.rejectBtn} onClick={() => rejectOffer(item?.id)}>{updateOfferMutation.isLoading && active === `reddet${item.id}` ? <LoadingIcon /> : "Reddet"}</button>
                        </>
                        : item?.isStatus == true ?
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
              })}
            </div>
          )
          )
        ) : (
          <p className={styles.notFound}>Teklif Yoktur</p>
        )
        }
      </>
  );
}

export default ReceivedOffers;

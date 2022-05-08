import React from "react";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import BuyProductModal from "../components/BuyProductModal";
import GiveOfferModal from "../components/GiveOfferModal";
import UserLayout from "../components/UserLayout";
import SkeletonLoader from "../constants/SkeletonLoader";
import { useUser } from "../context/UserContext";
import { API, Service } from "../data/service";
import NoImage from '../images/Png/NoImage.jpg'
import LoadingIcon from "../images/Svg/LoadingIcon";
import { formatPrice } from "../utils/formatPrice";
import styles from "./ProductDetail.module.scss";

function ProductDetail() {
  const { id } = useParams();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const productQuery = useQuery(["getProduct", id], () =>
    Service.getProduct(id)
  );

  const givenOffer = productQuery.data?.offers?.findLast(
    (offer) => offer.users_permissions_user == user?.id
  );

  const deleteOfferMutation = useMutation(Service.deleteOffer, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getProduct", id]);
    },
  });

  return (
    <UserLayout>
      <ToastContainer
        hideProgressBar
        newestOnTop={false}
        autoClose={2000}
      />
      {productQuery.isLoading ? <SkeletonLoader count={1} style={"detail"} /> :
        <div className={styles.productDetail}>
          <div className={styles.left}>
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(${productQuery?.data?.image ? (API + productQuery.data?.image?.url) : NoImage})`,
              }}
            ></div>
            {/* <img src={Image1} alt="" /> */}
          </div>
          <div className={styles.right}>
            <p className={styles.title}>{productQuery.data?.name}</p>
            <div className={styles.detail}>
              <div>
                {" "}
                <p>
                  <b>Marka:</b> <span>{productQuery.data?.brand}</span>
                </p>
                <p>
                  <b>Renk:</b> <span>{productQuery.data?.color}</span>
                </p>
                <p>
                  <b>Kullanım Durumu:</b> <span>{productQuery.data?.status}</span>
                </p>
              </div>
              <div className={styles.price}>
                <span>{formatPrice(productQuery.data?.price)}  TL</span>
                {givenOffer && !deleteOfferMutation.isSuccess && (
                  <span className={styles.givenOffer}>
                    Verilen Teklif: <span>{formatPrice(givenOffer.offerPrice)} TL</span>
                  </span>
                )}
              </div>
            </div>
            <div className={styles.btns}>
              {
                productQuery.isLoading ? <Skeleton height={50} /> : (productQuery.data?.isSold ? (
                  <p>Bu Ürün Satışta Değil</p>
                ) : (
                  <>
                    <BuyProductModal
                      product={productQuery.data}
                      onSuccess={() => queryClient.invalidateQueries(["getProduct", productQuery.data?.id?.toString()])} />
                    {
                      productQuery.data?.isOfferable && !givenOffer ?
                        <GiveOfferModal product={productQuery.data} /> :
                        <button onClick={() => deleteOfferMutation.mutate(givenOffer.id)}>
                          {deleteOfferMutation.isLoading ? <LoadingIcon params={{ color: "#000" }} /> : "Teklifi Geri Çevir"}
                        </button>
                    }
                  </>
                ))
              }
            </div>
            <div className={styles.about}>
              <p>Açıklama</p>
              <span>{productQuery.data?.description}</span>
            </div>
          </div>
        </div>
      }
    </UserLayout>
  );
}

export default ProductDetail;

import React from "react";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";

import { AsyncList } from "../components/AsyncList";
import { CategoryNav } from "../components/CategoryNav";
import UserLayout from "../components/UserLayout";
import SkeletonLoader from "../constants/SkeletonLoader";
import { API, Service } from "../data/service";
import HomeBanner from "../images/Png/HomeBanner.png";
import NoImage from "../images/Png/NoImage.jpg";
import { formatPrice } from "../utils/formatPrice";
import styles from "./Home.module.scss";

function Home() {
  const [searchParams] = useSearchParams();

  const activeCategory = searchParams.get("category");

  const productsQuery = useQuery(["getAllProducts", activeCategory], () =>
    Service.getAllProducts({ categoryName: activeCategory })
  );

  console.log(productsQuery);

  return (
    <UserLayout>
      <div className={styles.home}>
        <div className={styles.banner}>
          <img src={HomeBanner} alt="home-banner" />
        </div>

        <CategoryNav />

        <AsyncList
          query={productsQuery}
          renderLoading={() => <SkeletonLoader count={4} />}
          renderError={() => <p>Something went wrong!</p>}
          renderEmpty={() => <p>No products found!</p>}
          renderList={(products) => (
            <div className={styles.products}>
              {products.map((product) => {
                return (
                  <Link
                    to={`/product/${product.id}`}
                    className={styles.card}
                    key={product.id}
                  >
                    <div className={styles.image}>
                      <img
                        src={
                          product.image ? `${API}${product.image.url}` : NoImage
                        }
                        alt={product.name}
                      />
                    </div>
                    <p>
                      <span className={styles.brand}>{product.brand}</span>
                      <span>
                        <span className={styles.color}>Renk: </span>
                        <span className={styles.colorType}>
                          {product.color}
                        </span>
                      </span>
                    </p>
                    <span className={styles.price}>{`${formatPrice(
                      product.price
                    )} TL`}</span>
                  </Link>
                );
              })}
            </div>
          )}
        />
      </div>
    </UserLayout>
  );
}

export default Home;

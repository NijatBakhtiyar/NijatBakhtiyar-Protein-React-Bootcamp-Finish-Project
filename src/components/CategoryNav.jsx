import React from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useCategories } from "../data/service";
import styles from "./CategoryNav.module.scss";

export function CategoryNav() {
  const [searchParams] = useSearchParams();

  const activeCategory = searchParams.get("category");

  const categoryQuery = useCategories();
  return (
    <div className={styles.productNavs}>
      <Link
        to="/"
        className={
          !activeCategory
            ? `${styles.categoryButton} ${styles.active}`
            : styles.categoryButton
        }
        // className={active === "hepsi" ? styles.active : ""}
      >
        Hepsi
      </Link>
      {categoryQuery.data?.map((category) => {
        return (
          <Link
            to={`/?category=${category.name}`}
            key={category.id}
            className={
              activeCategory === category.name
                ? `${styles.categoryButton} ${styles.active}`
                : styles.categoryButton
            }
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  );
}

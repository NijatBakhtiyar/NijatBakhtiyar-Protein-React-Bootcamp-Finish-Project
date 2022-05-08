import { Formik } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import CustomSelect from "../components/CustomSelect";
import UserLayout from "../components/UserLayout";
import { AddProductSchema } from "../constants/AddProductSchema";
import ImageUploader from "../constants/ImageUploader";
import inputStyle from "../constants/SwitchCheckBox.module.scss";
import { useUser } from "../context/UserContext";
import { Service, useCategories } from "../data/service";
import LoadingIcon from "../images/Svg/LoadingIcon";
import styles from "./AddProduct.module.scss";

function AddProduct() {
  const navigate = useNavigate();
  const { user } = useUser();
  const productFormMutation = useMutation(Service.addProduct, {
    onSuccess: (data) => {
      navigate(`/product/${data.id}`);
    },
  });

  const categoryQuery = useCategories();
  const brandQuery = useQuery(["getBrands"], Service.getBrands);
  const colorQuery = useQuery(["getColors"], Service.getColors);
  const statusQuery = useQuery(["getStatus"], Service.getStatus);
  const [isOfferable, setIsOfferable] = useState(false);

  let offerChange = (e) => {
    setIsOfferable(e.target.checked);
  };

  return (
    <UserLayout>
      <div className={styles.addProduct}>
        <Formik
          initialValues={{
            name: "",
            description: "",
          }}
          onSubmit={(values) => {
            productFormMutation.mutate({ ...values, userId: user?.id });
          }}
          validationSchema={AddProductSchema}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldValue,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.left}>
                    <h1>Ürün Detayları</h1>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">Ürün Adı</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Örnek: Iphone 12 Pro Max"
                        value={values.name}
                        onChange={handleChange}
                      />
                      <span className={styles.errorMessage}>
                        {touched.name && errors.name}
                      </span>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="description">Açıklama</label>
                      <textarea
                        cols="30"
                        rows="4"
                        name="description"
                        id="description"
                        placeholder="Ürün açıklaması girin"
                        value={values.description}
                        onChange={handleChange}
                      />
                      <span className={styles.errorMessage}>
                        {touched.description && errors.description}
                      </span>
                    </div>

                    <div className={styles.formSelect}>
                      <div className={styles.formGroup}>
                        <label htmlFor="category">Kategori</label>
                        <CustomSelect
                          defaultValue="Kategori Seç"
                          setSelectValue={(value) =>
                            setFieldValue("category", value)
                          }
                          selectValue={values.category}
                          options={categoryQuery.data?.map((category) => {
                            return { value: category.id, label: category.name };
                          })}
                        />
                        <span className={styles.errorMessage}>
                          {!values.category &&
                            Object.keys(touched).length > 0 &&
                            "Bu alan zorunlu"}
                        </span>
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="brand">Marka</label>
                        <CustomSelect
                          defaultValue="Marka Seç"
                          setSelectValue={(value) =>
                            setFieldValue("brand", value)
                          }
                          selectValue={values.brand}
                          options={brandQuery.data?.map((brand) => {
                            return { value: brand.name, label: brand.name };
                          })}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="color">Renk</label>
                        <CustomSelect
                          defaultValue="Renk Seç"
                          setSelectValue={(value) =>
                            setFieldValue("color", value)
                          }
                          selectValue={values.color}
                          options={colorQuery.data?.map((color) => {
                            return { value: color.name, label: color.name };
                          })}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="status">Kullanım Durumu</label>
                        <CustomSelect
                          defaultValue="Kullanım Durumu Seç"
                          setSelectValue={(value) =>
                            setFieldValue("status", value)
                          }
                          selectValue={values.status}
                          options={statusQuery.data?.map((status) => {
                            return { value: status.name, label: status.name };
                          })}
                        />
                        <span className={styles.errorMessage}>
                          {!values.status &&
                            Object.keys(touched).length > 0 &&
                            "Bu alan zorunlu"}
                        </span>
                      </div>
                    </div>

                    <div
                      className={
                        errors.price && isOfferable
                          ? `${styles.formGroup} ${styles.error} ${styles.price}`
                          : `${styles.formGroup} ${styles.price}`
                      }
                    >
                      <label htmlFor="price">Fiyat</label>
                      <input
                        type="text"
                        name="price"
                        id="price"
                        placeholder="Bir fiyat girin"
                        value={values.price || ""}
                        onChange={handleChange}
                        disabled={isOfferable ? false : true}
                      />
                      <span className={styles.currency}>TL</span>
                      <span className={styles.errorMessage}>
                        {errors.price}
                      </span>
                    </div>

                    <div className={`${styles.formGroup} ${styles.checkPrice}`}>
                      <label htmlFor="checkPrice">
                        Fiyat ve teklif opsiyonu
                      </label>
                      <label className={inputStyle.switch}>
                        <input
                          type="checkbox"
                          id="checkPrice"
                          name="checkPrice"
                          value={isOfferable}
                          onChange={offerChange}
                        />
                        <span
                          className={`${inputStyle.slider} ${inputStyle.round}`}
                        ></span>
                      </label>
                    </div>

                  </div>
                  <div className={styles.line}></div>
                  <div className={styles.right}>
                    <h1>Ürün Görseli</h1>
                    <div className={styles.dropBox}>
                      <ImageUploader
                        onChange={(file) => {
                          setFieldValue("image", file)
                        }}
                      />
                    </div>
                    <span className={styles.errorMessage}>
                      {!values.image &&
                        Object.keys(touched).length > 0 &&
                        "Bu alan zorunlu"}
                    </span>
                  </div>
                </div>
                <div className={styles.submitBnt}>
                  <button type="submit">
                    {productFormMutation.isLoading ? <LoadingIcon /> : "Kaydet"}
                  </button>
                </div>


              </form>
            );
          }}
        </Formik>
      </div>
    </UserLayout >
  );
}

export default AddProduct;

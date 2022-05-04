import { Formik } from "formik";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { AuthSchema } from "../constants/AuthSchema";
import { Service } from "../data/service";
import LoadingIcon from "../images/Svg/LoadingIcon";
import Auth from "./Auth";
import styles from "./Auth.module.scss";

function Register() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const registerMutation = useMutation(Service.register, {
    onSuccess: () => {
      queryClient.invalidateQueries(["me"]);
      navigate("/");
    },
    onError: () => {
      toast.error("Girdiğiniz hesab mövcut.")
    }
  });

  return (
    <Auth>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(form) => {
          registerMutation.mutate(form);
        }}
        validationSchema={AuthSchema}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <>
            <ToastContainer
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              autoClose={2000}
            />
            <form onSubmit={handleSubmit}>
              <h1>Üye Ol</h1>
              <p>Fırsatlardan yararlanmak için üye ol!</p>
              <div
                className={
                  touched.email && errors.email
                    ? `${styles.formGroup} ${styles.formError}`
                    : styles.formGroup
                }
              >
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Email@example.com"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div
                className={
                  touched.password && errors.password
                    ? `${styles.formGroup} ${styles.formError}`
                    : styles.formGroup
                }
              >
                <label htmlFor="password">Şifre</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">
                {registerMutation.isLoading ? <LoadingIcon /> : "Üye Ol"}
              </button>
              <p className={styles.loginText}>
                Hesabın var mı? <Link to="/login">Giriş Yap</Link>
              </p>
            </form>
          </>
        )}
      </Formik>
    </Auth>
  );
}
export default Register;

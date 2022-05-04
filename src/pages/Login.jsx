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

function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loginMutation = useMutation(Service.login, {
    onSuccess: () => {
      queryClient.invalidateQueries(["me"]);
      navigate("/");
    },
    onError: () => {
      toast.error("Emailinizi veya şifreniz hatalı.")
    }
  });

  return (
    <Auth>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(form, { resetForm }) => {
          loginMutation.mutate(form);
          resetForm()
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
              <div>
                <h1>Giriş Yap</h1>
                <p>Fırsatlardan yararlanmak için üye ol!</p>
              </div>
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
                {/* <span className={styles.errorMessage}>{touched.email && errors.email}</span> */}
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
                {/* <span className={styles.formError}>{touched.password && errors.password}</span> */}
                <p className={styles.forgotPassword}>Şifreni Unuttum</p>
              </div>
              <button type="submit">
                {loginMutation.isLoading ? <LoadingIcon /> : "Giriş"}
              </button>
              <p className={styles.loginText}>
                Hesabın yok mu? <Link to="/register">Üye Ol</Link>
              </p>
            </form>
          </>
        )}
      </Formik>
    </Auth>
  );
}

export default Login;

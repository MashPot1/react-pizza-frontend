import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../redux/slices/authSlice";
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    
    if ("token" in data.payload) {
      return window.localStorage.setItem("token", data.payload.token);
    }
    if (!data.payload) {
      return alert("Не удалось авторизоваться!");
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className={styles.root}>
        <h2 className={styles.title}>Вход в аккаунт</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              className={styles.formInput}
              type="email"
              helpertext={errors.email?.message}
              {...register("email")}
            />
            <label className={styles.formLabel}>Email</label>
          </div>

          <div>
            <input
              className={styles.formInput}
              type="password"
              helpertext={errors.password?.message}
              {...register("password", { required: "Укажите пароль" })}
            />
            <label className={styles.formLabel}>Пароль</label>
          </div>

          <div className={styles.buttons}>
            <button type="submit" className="button">
              Войти
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
